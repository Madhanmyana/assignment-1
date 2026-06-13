from passlib.context import CryptContext
from jose import jwt,JWTError
from datetime import datetime,timedelta
import os


SECRET_KEY = os.getenv("secret_key")
ALGORITHM = "HS256"


pwd_context = CryptContext(schemes=["bcrypt"],deprecated="auto")

def hash_password(password:str):
    return pwd_context.hash(password)

def verify_password(plain_password:str,hashed_password:str):
    return pwd_context.verify(plain_password,hashed_password)

def create_access_token(data:dict):
    payload = data.copy()
    payload.update({"exp": datetime.utcnow() + timedelta(minutes=30)})
    token = jwt.encode(payload,SECRET_KEY,algorithms=ALGORITHM)
    return token


def verify_token(token: str):
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        email = payload.get("sub")

        if email is None:
            return None
        return email

    except JWTError:
        return None
