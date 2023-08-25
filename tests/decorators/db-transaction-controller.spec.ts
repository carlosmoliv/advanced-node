import { type Controller } from '@/application/controllers'

import { type MockProxy, mock } from 'jest-mock-extended'

class DbTransactionDecorator {
  constructor (
    private readonly decoratee: Controller,
    private readonly db: DbTransaction
  ) {}

  async perform (httpRequest: any): Promise<any> {
    await this.db.openTransaction()
    await this.decoratee.perform(httpRequest)
    await this.db.commit()
    await this.db.closeTransaction()
  }
}

interface DbTransaction {
  openTransaction: () => Promise<void>
  closeTransaction: () => Promise<void>
  commit: () => Promise<void>
}

describe('DbTransactionDecorator', () => {
  let db: MockProxy<DbTransaction>
  let decoratee: MockProxy<Controller>
  let sut: DbTransactionDecorator

  beforeAll(() => {
    decoratee = mock()
    db = mock()
  })

  beforeEach(() => {
    sut = new DbTransactionDecorator(decoratee, db)
  })

  it('should open transaction', async () => {
    await sut.perform({ any: 'any' })

    expect(db.openTransaction).toHaveBeenCalledWith()
    expect(db.openTransaction).toHaveBeenCalledTimes(1)
  })

  it('should execute decoratee', async () => {
    await sut.perform({ any: 'any' })

    expect(decoratee.perform).toHaveBeenCalledWith({ any: 'any' })
    expect(decoratee.perform).toHaveBeenCalledTimes(1)
  })

  it('should call commit and closeTransaction on success', async () => {
    await sut.perform({ any: 'any' })

    expect(db.commit).toHaveBeenCalledWith()
    expect(db.commit).toHaveBeenCalledTimes(1)
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })
})
