from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os

database_url=database_url = "mysql+pymysql://root:password@localhost:3306/assignment-1"
engine=create_engine(database_url)
session=sessionmaker(autocommit=False,autoflush=False,bind=engine)