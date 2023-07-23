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
  async load({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })

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
    const pgUserRepo = getRepository(PgUser)
    let resultId: string

    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ name, email, facebookId })
      resultId = pgUser.id.toString()
    } else {
      resultId = id
      await pgUserRepo.update({ id: parseInt(id) }, { name, facebookId })
    }

    return { id: resultId }
  }
}
