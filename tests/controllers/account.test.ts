// External Files
import AccountController = require('../../src/controllers/account')
import dataStore = require('../../src/services/dataStore')

jest.mock('../../src/services/dataStore')
const mockedDataStore = dataStore as jest.Mocked<typeof dataStore>

// Interfaces
import { IAccountBase, IAccountPrivate } from '../../src/interfaces/account'

describe('When creating an account', () => {
  it ('returns the account uuid', async () => {
    const _params: IAccountBase = {
      name: 'New Account',
      description: 'Account made while testing',
      contactEmail: 'derp@flerp.com',
    }

    const _uuid: string = await AccountController.create(_params)
    expect(_uuid).toBeDefined()
  })

  it ('throws an error if validations fail', async () => {
    try {
      const _params: any = {
        description: 'Account made while testing',
        contactEmail: 'derp@flerp.com',
      }

      await AccountController.create(_params)
    } catch (error) {
      expect(error.message).toMatch(/Validation failed:/)
    }
  })
})

describe('When retrieving an account', () => {
  const _existingAccount: IAccountPrivate = {
    name: 'Existing Account',
    description: 'Account made while testing',
    contactEmail: 'derp@flerp.com',
    blocks: [],
    maxNumberOfBlocks: 50,
    notifications: true,
    uuid: '6dc70531-d0bf-4b3a-8265-b20f8a69e180',
  }

  it ('returns the correct account attributes', async () => {
    mockedDataStore.get.mockReturnValueOnce(Promise.resolve(JSON.stringify(_existingAccount)))

    const _accountBase: IAccountBase = await AccountController.get(_existingAccount.uuid)
    expect(_accountBase).toBeDefined()
  })

  it ('throws an error if account does not exist', async () => {
    try {
      mockedDataStore.get.mockReturnValueOnce(Promise.resolve(null))

      await AccountController.get(_existingAccount.uuid)
    } catch (error) {
      expect(error.message).toMatch(`pantry with id: ${_existingAccount.uuid} not found`)
    }
  })
})
