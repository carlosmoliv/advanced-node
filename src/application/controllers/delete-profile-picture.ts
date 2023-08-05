import { Controller } from '@/application/controllers'
import { notContent, type HttpResponse } from '@/application/helpers'
import { type ChangeProfilePicture } from '@/domain/use-cases'

type HttpRequest = { userId: string }

export class DeletePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async perform ({ userId }: HttpRequest): Promise<HttpResponse> {
    await this.changeProfilePicture({ id: userId })
    return notContent()
  }
}
