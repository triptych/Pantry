// External Files
import Account = require('../../src/models/account')
jest.mock('../../src/services/dataStore')

// Interfaces
import { IAccountBase } from '../../src/interfaces/account'

describe('When creating an account', () => {
  it ('returns the account uuid', async () => {
    const _params: IAccountBase = {
      name: 'New Account',
      description: 'Account made while testing',
      contactEmail: 'derp@flerp.com',
    }
    const _account = new Account(_params)
    const _uuid: string = await _account.store()

    expect(_uuid).toBeDefined()
  })
})

describe('When fetching an account', () => {
  it ('returns the account', async () => {
    const _account = await Account.get('derp')
    const _accountDetails = _account.sanitize()

    const { name, description } = _accountDetails
    expect(name).toBeDefined()
    expect(description).toBeDefined()
  })
})
