import {
  type UUIDGenerator,
  type UploadFile
} from '@/domain/contracts/gateways'
import { type SaveUserPicture } from '@/domain/contracts/repos'

type Setup = (
  fileStorage: UploadFile,
  crypto: UUIDGenerator,
  userProfileRepo: SaveUserPicture
) => ChangeProfilePicture
type Input = { id: string; file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup =
  (fileStorage, crypto, userProfileRepo) =>
  async ({ id, file }) => {
    let pictureUrl: string | undefined

    if (file !== undefined) {
      pictureUrl = await fileStorage.upload({
        key: crypto.uuid({ key: id }),
        file
      })
    }

    await userProfileRepo.savePicture({ pictureUrl })
  }
