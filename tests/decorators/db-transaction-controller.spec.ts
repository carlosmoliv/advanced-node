import { mock } from 'jest-mock-extended'

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
  it('should open transaction', async () => {
    const db = mock<DbTransaction>()
    const sut = new DbTransactionDecorator(db)

    await sut.perform({ any: 'any' })

    expect(db.openTransaction).toHaveBeenCalledWith()
    expect(db.openTransaction).toHaveBeenCalledTimes(1)
  })
})
