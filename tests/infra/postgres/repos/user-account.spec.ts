import { PgUser } from '@/infra/postgres/entities'
import { PgUserAccountRepository } from '@/infra/postgres/repos/user-account'

import { IBackup, IMemoryDb, newDb } from 'pg-mem'
import { Repository, getConnection, getRepository } from 'typeorm'

const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? ['src/infra/postgres/entities/index.ts'],
  })

  await connection.synchronize()

  return db
}

describe('PgUseraAccountRepository', () => {
  describe('load()', () => {
    let sut: PgUserAccountRepository
    let pgUserRepo: Repository<PgUser>
    let backup: IBackup

    beforeAll(async () => {
      const db = await makeFakeDb([PgUser])
      backup = db.backup()
      pgUserRepo = getRepository(PgUser)
    })

    beforeEach(() => {
      backup.restore()
      sut = new PgUserAccountRepository()
    })

    afterAll(async () => {
      await getConnection().close()
    })

    it('should return an account if email exists', async () => {
      await pgUserRepo.save({ email: 'any_email' })

      const account = await sut.load({ email: 'any_email' })

      expect(account).toEqual({ id: '1' })
    })

    it('should return an undefined if email does not exists', async () => {
      const sut = new PgUserAccountRepository()

      const account = await sut.load({ email: 'any_email' })

      expect(account).toBeUndefined()
    })
  })
})