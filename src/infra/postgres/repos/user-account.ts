import {
  type LoadUserAccountRepository,
  type SaveFaceboookAccountRepository
} from '@/data/contracts/repos'
import { PgUser } from '@/infra/postgres/entities'

import { getRepository } from 'typeorm'

type LoadParams = LoadUserAccountRepository.Params
type LoadResult = LoadUserAccountRepository.Result
type SaveParams = SaveFaceboookAccountRepository.Params
type SaveResult = SaveFaceboookAccountRepository.Result

export class PgUserAccountRepository
  implements LoadUserAccountRepository, SaveFaceboookAccountRepository
{
  private readonly pgUserRepo = getRepository(PgUser)

  async load({ email }: LoadParams): Promise<LoadResult> {
    const pgUser = await this.pgUserRepo.findOne({ email })

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
  }

  async saveWithFacebook({
    email,
    facebookId,
    name,
    id
  }: SaveParams): Promise<SaveResult> {
    let resultId: string

    if (id === undefined) {
      const pgUser = await this.pgUserRepo.save({ name, email, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id

      await this.pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }

    return { id: resultId }
  }
}
