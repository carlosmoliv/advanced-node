import { type MockProxy, mock } from 'jest-mock-extended'

class DbTransactionDecorator {
  constructor (private readonly db: DbTransaction) {}

  async perform (httpRequest: any): Promise<any> {
    await this.db.openTransaction()
  }
}

interface DbTransaction {
  openTransaction: () => Promise<void>
}

describe('DbTransactionDecorator', () => {
  let db: MockProxy<DbTransaction>
  let sut: DbTransactionDecorator

  beforeAll(() => {
    db = mock<DbTransaction>()
  })

  beforeEach(() => {
    sut = new DbTransactionDecorator(db)
  })

  it('should open transaction', async () => {
    await sut.perform({ any: 'any' })

    expect(db.openTransaction).toHaveBeenCalledWith()
    expect(db.openTransaction).toHaveBeenCalledTimes(1)
  })
})
