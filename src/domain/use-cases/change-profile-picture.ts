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
type Output = { pictureUrl?: string; inititals?: string }
export type ChangeProfilePicture = (input: Input) => Promise<Output>

export const setupChangeProfilePicture: Setup =
  (fileStorage, crypto, userProfileRepo) =>
  async ({ id, file }) => {
    const key = crypto.uuid({ key: id })
    const data = {
      pictureUrl:
        file !== undefined
          ? await fileStorage.upload({
              key,
              file
            })
          : undefined,
      name:
        file === undefined
          ? (await userProfileRepo.load({ id })).name
          : undefined
    }
    const userProfile = new UserProfile(id)
    userProfile.setPicture(data)
    await userProfileRepo.savePicture(userProfile)
    return userProfile
  }
