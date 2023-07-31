import {
  type UUIDGenerator,
  type UploadFile
} from '@/domain/contracts/gateways'
import {
  type LoadUserProfile,
  type SaveUserPicture
} from '@/domain/contracts/repos'

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
    let pictureUrl: string | undefined
    let initials: string | undefined

    if (file !== undefined) {
      pictureUrl = await fileStorage.upload({
        key: crypto.uuid({ key: id }),
        file
      })
    } else {
      const { name } = await userProfileRepo.load({ id })

      if (name !== undefined) {
        const firstLetters = name.match(/\b(.)/g) ?? []

        if (firstLetters.length > 1) {
          initials = (
            (firstLetters.shift() ?? '') + (firstLetters.pop() ?? '')
          ).toUpperCase()
        } else {
          initials = name.slice(0, 2).toUpperCase()
        }
      }
    }

    await userProfileRepo.savePicture({ pictureUrl, initials })
  }
