const mock = jest.fn().mockImplementation(() => {
  return {
    info: () => { return },
    warn: () => { return },
    error: () => { return },
  }
})

export = mock
