import { Controller } from '@/application/controllers'
import { ok, type HttpResponse } from '@/application/helpers'
import { ValidationBuilder as Builder, type Validator } from '@/application/validation'
import { type ChangeProfilePicture } from '@/domain/use-cases'

type HttpRequest = { file?: { buffer: Buffer, mimeType: string }, userId: string }
type Model = { initials?: string, pictureUrl?: string }

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  override async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const { initials, pictureUrl } = await this.changeProfilePicture({ id: userId, file })
    return ok({ initials, pictureUrl })
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    if (file === undefined) return []
    return [
      ...Builder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpg'], maxSizeInMb: 5 })
        .build()
    ]
  }
}
