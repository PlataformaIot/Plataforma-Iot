import datetime
import json
import requests
from fastapi import APIRouter, Request, Response
from requests.exceptions import HTTPError
from typing import Optional
from .db import *
from .credentials import everynet_login

router = APIRouter ()

@router.post ('/devices')
async def new_device (request: Request, new_type: bool = False):
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
    'device': device ['dev_addr'],
    'type': dev_type ['dev_type']
  }

  try:
    collection_devices = db.get_collection ('devices')
    collection_devices.insert_one (new_dev)

    if new_type:
      collection_types = db.get_collection ('tipos')
      collection_types.insert_one (dev_type)
  except Exception as err:
    return {'DATABASE ERROR': f'{err}'}

  return Response ('New device registered successfully.', 200)

@router.get ('/devices')
async def get_devices (dev_addr: Optional [str] = None, dev_type: Optional [str] = None):
  collection = MongodbConnector ().get_collection ('devices')

  if dev_addr:
    response = collection.find_one ({'device': dev_addr})
    return response

  elif dev_type:
    response = list (collection.find ({'type': dev_type}))
    return response

  else:
    response = list (collection.find ())
    return response

@router.get ('/data')
async def get_data (dev_addr: Optional [str] = None, dev_type: Optional [str] = None, limit: Optional [int] = None):
  collection = MongodbConnector ().get_collection ('dados')

  if dev_addr:
    if limit:
      response = list (collection.find ({'device': dev_addr}, {'_id': False}, limit = limit).sort ('ts', -1))
    else:
      response = list (collection.find ({'device': dev_addr}, {'_id': False}).sort ('ts', -1))

  if dev_type:
    collection_devices = MongodbConnector ().get_collection ('devices')

    list_of_devices = []
    for x in collection_devices.find ({'type': dev_type}, {'_id': False, 'type': False}):
      list_of_devices.append (x ['device'])

    if limit:
      response = list (collection.find ({'device': {'$in': list_of_devices}}, {'_id': False}, limit = limit).sort ('ts', -1))
    else:
      response = list (collection.find ({'device': {'$in': list_of_devices}}, {'_id': False}).sort ('ts', -1))

  else:
    if limit:
      response = list (collection.find (projection = {'_id': False}, limit = limit).sort ('ts', -1))
    else:
      response = list (collection.find (projection = {'_id': False}).sort ('ts', -1))

  return response