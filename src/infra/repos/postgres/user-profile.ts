import { PgUser } from '@/infra/repos/postgres/entities'
import { type SaveUserPicture } from '@/domain/contracts/repos'

import { getRepository } from 'typeorm'

export class PgUserProfileRepository implements SaveUserPicture {
  async savePicture ({ id, pictureUrl, initials }: SaveUserPicture.Input): Promise<void> {
    const pgUserRepo = getRepository(PgUser)
    await pgUserRepo.update({ id: Number(id) }, { pictureUrl, initials })
  }
}
