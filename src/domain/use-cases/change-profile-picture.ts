import {
  type UUIDGenerator,
  type UploadFile
} from '@/domain/contracts/gateways'
import {
  type LoadUserProfile,
  type SaveUserPicture
} from '@/domain/contracts/repos'
import { UserProfile } from '@/domain/entities'

type Setup = (
  fileStorage: UploadFile,
  crypto: UUIDGenerator,
  userProfileRepo: SaveUserPicture & LoadUserProfile
) => ChangeProfilePicture
type Input = { id: string; file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup =
  (fileStorage, crypto, userProfileRepo) =>
  async ({ id, file }) => {
    const data: { pictureUrl?: string; name?: string } = {}

    if (file !== undefined) {
      data.pictureUrl = await fileStorage.upload({
        key: crypto.uuid({ key: id }),
        file
      })
    } else {
      data.name = (await userProfileRepo.load({ id })).name
    }
    const userProfile = new UserProfile(id)
    userProfile.setPicture(data)
    await userProfileRepo.savePicture(userProfile)
  }
