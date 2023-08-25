import { makeChangeProfilePicture } from '@/main/factories/domain/use-cases'
import { SavePictureController, type Controller } from '@/application/controllers'
import { makePgTransactionController } from '../decorators'

export const makeSavePictureController = (): Controller => {
  const controller = new SavePictureController(makeChangeProfilePicture())
  return makePgTransactionController(controller)
}
