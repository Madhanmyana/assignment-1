from fastapi import FastAPI,Depends,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models import Notes,Users,UserRegister
import database_models
from database import session,engine
from sqlalchemy.orm import Session
from auth import hash_password,verify_password,create_access_token,verify_token

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
    )

database_models.Base.metadata.create_all(bind=engine)

security = HTTPBearer()



def get_db():

    db=session()

    try:
        yield db

    finally:
        db.close()


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security),db: Session = Depends(get_db)):
    token = credentials.credentials
    email = verify_token(token)

    if email is None:raise HTTPException(status_code=401,detail="Invalid token")

    user = db.query(database_models.User).filter(database_models.User.email == email).first()

    if user is None:
        raise HTTPException(status_code=401,detail="User not found")
    return user


# UserRegister
@app.post("/register/")
def register(user:UserRegister,db:Session=Depends(get_db)):
    existing_user=(db.query(database_models.User).filter(database_models.User.email==user.email).first())
    if existing_user:
        raise HTTPException(status_code=400,detail="email alredy exist")
    else:
        hashed_password=hash_password(user.password)
        new_user=database_models.User(username=user.username,email=user.email,hashed_password=hashed_password)
        db.add(new_user)
        db.commit()
        return {'message':'user registeration successful'}

# user login
@app.post("/login/")
def login(user:Users,db:Session=Depends(get_db)):
    existing_user=(db.query(database_models.User).filter(database_models.User.email==user.email).first())
    if not existing_user:
        raise HTTPException(status_code=400,detail="email not exist")
    else:
        is_valid = verify_password(user.password,existing_user.hashed_password)
        if not is_valid:
            raise HTTPException(status_code=401,detail="invalid credentials")
        token = create_access_token({"sub": existing_user.email})
        print(token)
        print(len(token))
        return {'access_token':token,'token_type':'bearer'}

@app.get("/")
def home():
    return "notes api is running"

@app.post("/notes/")
def create_note(note:Notes,current_user = Depends(get_current_user),db:Session=Depends(get_db)):
    new_note = database_models.Notes(title=note.title,content=note.content,user_id=current_user.id)
    db.add(new_note)
    db.commit()
    return "note created sucessfully"

@app.get("/notes/")
def get_all_notes(current_user = Depends(get_current_user),db:Session=Depends(get_db)):
    return db.query(database_models.Notes).filter(database_models.Notes.user_id == current_user.id).all()

@app.get("/notes/{id}")
def get_note_by_id(id:int,current_user = Depends(get_current_user),db:Session=Depends(get_db)):
    db_note = db.query(database_models.Notes).filter(database_models.Notes.id == id,database_models.Notes.user_id == current_user.id).first()
    if db_note:
        return db_note

    raise HTTPException(status_code=404,detail="Note not found")


@app.put("/notes/{id}")
def edit_note_by_id(id:int,note:Notes,current_user = Depends(get_current_user),db:Session=Depends(get_db)):
    db_note=db.query(database_models.Notes).filter(database_models.Notes.id==id,database_models.Notes.user_id == current_user.id).first()
    if db_note:
        db_note.title=note.title
        db_note.content=note.content
        db.commit()
        return {"message":"Note updated successfully"}
    
    raise HTTPException(status_code=404,detail='Note not found')

@app.delete("/notes/{id}")
def delete_note_by_id(id:int,current_user = Depends(get_current_user),db:Session=Depends(get_db)):
    db_note=db.query(database_models.Notes).filter(database_models.Notes.id==id,database_models.Notes.user_id == current_user.id).first()
    if db_note:
        db.delete(db_note)
        db.commit()
        return {"message": "Note deleted successfully"}

    raise HTTPException(status_code=404,detail="Note not found")


@app.get("/me")
def get_me(current_user = Depends(get_current_user)):
    return {"id": current_user.id,"username": current_user.username,"email": current_user.email,"role": current_user.role}