import { makePgUserProfileRepo } from '@/main/factories/infra/repos'
import { makeS3FileStorage, makeUniqueId } from '@/main/factories/infra/gateways'
import { type ChangeProfilePicture, setupChangeProfilePicture } from '@/domain/use-cases'

export const makeChangeProfilePicture = (): ChangeProfilePicture => {
  return setupChangeProfilePicture(
    makeS3FileStorage(),
    makeUniqueId(),
    makePgUserProfileRepo()
  )
}
