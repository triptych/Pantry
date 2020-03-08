// External Libs
import redis = require('redis')
import { promisify } from 'util'

// External Files
import logService = require('./logger')

// Logger setup
const logger = new logService('Data Store')

class DataStore {
  public static async get(uuid: string): Promise<any> {
    try {
      const _client = redis.creatClient()
      const _get = promisify(_client.get).bind(_client)
      const _payload = await _get(uuid)
      _client.quit()

      return _payload
    } catch (error) {
      logger.error(`getting from cache failed: ${error.message}`)
      throw new Error('Pantry is having critical issues')
    }
  }

  public static async set(uuid: string, payload: string, lifespan: number): Promise<void> {
    try {
      const _client = redis.createClient()
      const _set = promisify(_client.set).bind(_client)
      await _set(uuid, payload, 'EX', lifespan)
      _client.quit()
    } catch (error) {
      logger.error(`setting to cache failed: ${error.message}`)
      throw new Error('Pantry is having critical issues')
    }
  }
}

export = DataStore
