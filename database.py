from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()

database_url = os.getenv("DATABASE_URL", "mysql+pymysql://root:password@localhost:3306/notesapi")
engine = create_engine(database_url)
session = sessionmaker(autocommit=False, autoflush=False, bind=engine)