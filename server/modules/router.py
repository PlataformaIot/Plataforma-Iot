import datetime
import json
import requests
import time
from fastapi import APIRouter, Request, Response
from requests.exceptions import HTTPError
from typing import Optional
from db import *
from credentials import everynet_login

router = APIRouter ()

@router.post ('/devices')
async def new_device (request: Request):
  try:
    body = await request.json ()
    device = json.dumps (body [0])
    dev_type = json.dumps (body [1])
  except:
    return Response ('Failed to parse request body.', 204)

  try:
    login = requests.post ('https://ns.atc.everynet.io/api/v1.0/auth',
      data = everynet_login,
      headers = {'accept': 'application/json', 'Content-Type': 'application/json'})
  except HTTPError as http_err:
    return {'LOGIN ERROR': f'{http_err}'}

  try:
    token = login.json () ['access_token']

    response = requests.post ('https://ns.atc.everynet.io/api/v1.0/devices',
      params = {'access_token': f'{token}'},
      headers = {'accept': 'application/json', 'Content-Type': 'application/json'},
      data = device)

  except HTTPError as http_err:
    return {'HTTP ERROR': f'{http_err}'}
  except TypeError as type_err:
    return {'TYPE ERROR': f'{type_err}'}
  except Exception as err:
    return {'ERROR': f'{err}'}

  new_dev = {
    'device': body [0] ['dev_addr'],
    'type': body [1] ['dev_type']
  }

  try:
    collection_devices = db.get_collection ('devices')
    redundant_device = collection.find_one ({'device': new_dev ['device']}, {'device': True, '_id': False})

    if not redundant_device:
      collection_devices.insert_one (new_dev)
      return Response ('New device registered successfully.', 201)
    else:
      return Response ('Device already registered.', 400)

  except:
    return Response ('Failed to insert new device onto database.', 500)

@router.get ('/devices')
async def get_devices (dev_addr: Optional [str] = None, dev_type: Optional [str] = None):
  collection = MongodbConnector ().get_collection ('devices')

  if dev_addr:
    response = collection.find_one ({'device': dev_addr}, {'_id': False})
    return response

  elif dev_type:
    response = list (collection.find ({'type': dev_type}, {'_id': False}))
    return response

  else:
    response = list (collection.find (projection = {'_id': False}))
    return response

@router.post ('/types')
async def new_type (request: Request):
  try:
    body = await request.json ()
  except:
    return Response ('Failed to parse request body.', 204)

  try:
    collection = MongodbConnector ().get_collection ('tipos')
    redundant_type = collection.find_one ({'name': body ['name']}, {'name': True, '_id': False})

    if not redundant_type:
      collection.insert_one (body)
      return Response ('New device type registered successfully.', 201)
    else:
      return Response ('Device type already registered.', 400)

  except:
    return Response ('Failed to insert new type onto database.', 500)

@router.get ('/types')
async def get_types ():
  collection = MongodbConnector ().get_collection ('tipos')
  list_of_types = []

  query = list (collection.find (projection = {'name': True, '_id': False}))
  for i in query:
    list_of_types.append (i ['name'])

  return list_of_types

@router.get ('/data')
async def get_data (dev_addr: Optional [str] = None, dev_type: Optional [str] = None, date: Optional [str] = None, from_date: Optional [str] = None, limit: Optional [int] = None):
  collection = MongodbConnector ().get_collection ('dados')

  if dev_addr:
    if date:
      date_max = f'{int (date [:2]) + 1}{date [2:]}'
      date = time.mktime (datetime.datetime.strptime (date, '%d/%m/%Y').timetuple ())
      date_max = time.mktime (datetime.datetime.strptime (date_max, '%d/%m/%Y').timetuple ())
      response = list (collection.find ({'device': dev_addr, 'ts': {'$gte': date, '$lt': date_max}}, {'_id': False}).sort ('ts', -1))
    elif from_date:
      from_date = time.mktime (datetime.datetime.strptime (from_date, '%d/%m/%Y').timetuple ())
      response = list (collection.find ({'device': dev_addr, 'ts': {'$gte': from_date}}, {'_id': False}).sort ('ts', -1))
    elif limit:
      response = list (collection.find ({'device': dev_addr}, {'_id': False}, limit = limit).sort ('ts', -1))
    else:
      response = list (collection.find ({'device': dev_addr}, {'_id': False}).sort ('ts', -1))

  elif dev_type:
    collection_devices = MongodbConnector ().get_collection ('devices')

    list_of_devices = []
    for x in collection_devices.find ({'type': dev_type}, {'_id': False, 'type': False}):
      list_of_devices.append (x ['device'])

    if date:
      date_max = f'{int (date [:2]) + 1}{date [2:]}'
      date = time.mktime (datetime.datetime.strptime (date, '%d/%m/%Y').timetuple ())
      date_max = time.mktime (datetime.datetime.strptime (date_max, '%d/%m/%Y').timetuple ())
      response = list (collection.find ({'device': {'$in': list_of_devices}, 'ts': {'$gte': date, '$lt': date_max}}, {'_id': False}).sort ('ts', -1))
    elif from_date:
      from_date = time.mktime (datetime.datetime.strptime (from_date, '%d/%m/%Y').timetuple ())
      response = list (collection.find ({'device': {'in': list_of_devices}, 'ts': {'$gte': from_date}}, {'_id': False}).sort ('ts', -1))
    elif limit:
      response = list (collection.find ({'device': {'$in': list_of_devices}}, {'_id': False}, limit = limit).sort ('ts', -1))
    else:
      response = list (collection.find ({'device': {'$in': list_of_devices}}, {'_id': False}).sort ('ts', -1))

  else:
    if date:
      date_max = f'{int (date [:2]) + 1}{date [2:]}'
      date = time.mktime (datetime.datetime.strptime (date, '%d/%m/%Y').timetuple ())
      date_max = time.mktime (datetime.datetime.strptime (date_max, '%d/%m/%Y').timetuple ())
      response = list (collection.find ({'ts': {'$gte': date, '$lt': date_max}}, {'_id': False}).sort ('ts', -1))
    elif from_date:
      from_date = time.mktime (datetime.datetime.strptime (from_date, '%d/%m/%Y').timetuple ())
      response = list (collection.find ({'ts': {'$gte': from_date}}, {'_id': False}).sort ('ts', -1))
    elif limit:
      response = list (collection.find (projection = {'_id': False}, limit = limit).sort ('ts', -1))
    else:
      response = list (collection.find (projection = {'_id': False}).sort ('ts', -1))

  return response