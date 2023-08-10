import { makeChangeProfilePicture } from '@/main/factories/domain/use-cases'
import { SavePictureController } from '@/application/controllers/save-picture'

export const makeSavePictureController = (): SavePictureController => {
  return new SavePictureController(makeChangeProfilePicture())
}
