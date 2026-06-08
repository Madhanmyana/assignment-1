from pydantic import BaseModel,Field,EmailStr
from typing import Optional
from datetime import datetime

class Notes(BaseModel):
    id:Optional[int]=None
    title:str=Field(...,min_length=3)
    content:str=Field(...,min_length=10)
    created_at:datetime=Field(default_factory=datetime.now)

class UserRegister(BaseModel):
    username:str=Field(...,min_length=5)
    email:EmailStr
    password:str

class Users(BaseModel):
    email:EmailStr
    password:str
