import { ok, type HttpResponse } from '@/application/helpers'
import { type ChangeProfilePicture } from '@/domain/use-cases'
import { Controller } from '@/application/controllers'
import { ValidationBuilder as Builder, type Validator } from '@/application/validation'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = Error | { initials?: string, pictureUrl?: string }

export class SavePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  override async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.changeProfilePicture({ id: userId, file: file.buffer })
    return ok(data)
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpg'], maxSizeInMb: 5 })
        .build()
    ]
  }
}
