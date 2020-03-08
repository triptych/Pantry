class DataStore {
  public static async get() {
    const _account = {
      name: 'name',
      description: 'description',
      contactEmail: 'contactEmail',
      blocks: [],
      maxNumberOfBlocks: 50,
      uuid: '12312312312312312'
    }
    return (JSON.stringify(_account))
  }

  public static set() {
    return
  }
}

export = DataStore
