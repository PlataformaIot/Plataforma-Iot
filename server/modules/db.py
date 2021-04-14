from pymongo import MongoClient
from py_singleton import singleton

@singleton
class MongodbConnector ():
  def __init__ (self):
    self.client = None
    self.db = None

  def connect (self, address, database):
    try:
      self.client = MongoClient (address)
      self.db = self.client [database]
      print ('CONNECTED TO MONGODB')
      
    except Exception as err:
      print (f'ERROR CONNECTING TO MONGODB:\n{err}')

  def get_collection (self, name):
    return self.db [name]