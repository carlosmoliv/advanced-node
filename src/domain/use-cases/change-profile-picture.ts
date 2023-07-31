import {
  type UUIDGenerator,
  type UploadFile
} from '@/domain/contracts/gateways'

type Setup = (
  fileStorage: UploadFile,
  crypto: UUIDGenerator
) => ChangeProfilePicture
type Input = { id: string; file: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup =
  (fileStorage, crypto) =>
  async ({ id, file }) => {
    await fileStorage.upload({ key: crypto.uuid({ key: id }), file })
  }
