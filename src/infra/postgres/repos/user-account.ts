import { LoadUserAccountRepository, SaveFaceboookAccountRepository } from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFaceboookAccountRepository.Params

export class PgUserAccountRepository implements LoadUserAccountRepository {
  private readonly pgUserRepo = getRepository(PgUser)

  async load(params: LoadParams): Promise<LoadResult> {
    const pgUser = await this.pgUserRepo.findOne({ email: params.email })

    return (
      pgUser && {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined,
      }
    )
  }

  async saveWithFacebook(params: SaveParams): Promise<void> {
    if (params.id === undefined) {
      await this.pgUserRepo.save({
        name: params.name,
        email: params.email,
        facebookId: params.facebookId,
      })
    } else {
      await this.pgUserRepo.update(
        { id: parseInt(params.id) },
        {
          name: params.name,
          facebookId: params.facebookId,
        }
      )
    }
  }
}
