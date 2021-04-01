from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from modules.router import router
from modules.db import MongodbConnector
from credentials import mongodb_address, database
import uvicorn

app = FastAPI ()

app.add_middleware (CORSMiddleware, allow_origins = ['*'], allow_credentials = True, allow_methods = ['*'], allow_headers = ['*'])
app.include_router (router)

address = mongodb_address
database = database
connector = MongodbConnector ().connect (address, database)

@app.get ('/')
async def root ():
  return {
    'year': 2021,
    'location': 'IBTI'
  }

if __name__ == '__main__':
  uvicorn.run ('server:app', host = '0.0.0.0', port = 8000, reload = True)