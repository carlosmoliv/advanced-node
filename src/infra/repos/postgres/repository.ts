import { PgConnection } from '@/infra/repos/postgres/helpers'
import { type Repository, type ObjectType } from 'typeorm'

export abstract class PgRepository {
  constructor (private readonly connection: PgConnection = PgConnection.getInstance()) {}
  // @ts-expect-error - TypeORM types are not compatible with Flow
  getRepository<Entity> (entity: ObjectType<Entity>): Repository<Entity> {
    return this.connection.getRepository(entity)
  }
}
