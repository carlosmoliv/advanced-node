import { LoadUserAccountRepository, SaveFaceboookAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

export class PgUserAccountRepository implements LoadUserAccountRepository {
  async load(params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })

    return (
      pgUser && {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined,
      }
    )
  }

  async saveWithFacebook(params: SaveFaceboookAccountRepository.Params): Promise<void> {
    const pgUserRepo = getRepository(PgUser)

    if (params.id === undefined) {
      await pgUserRepo.save({
        name: params.name,
        email: params.email,
        facebookId: params.facebookId,
      })
    } else {
      await pgUserRepo.update(
        { id: parseInt(params.id) },
        {
          name: params.name,
          facebookId: params.facebookId,
        }
      )
    }
  }
}
