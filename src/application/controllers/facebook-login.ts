import { badRequest, unauthorized, type HttpResponse, serverError, ok } from '@/application/helpers'
import { type FacebookAuthentication } from '@/domain/features'
import { RequiredFieldError } from '@/application/errors'
import { AccessToken } from '@/domain/models'

type HttpRequest = {
  token: string | null | undefined
}

type Model =
  | Error
  | {
      accessToken: string
    }

export class FacebookLoginController {
  constructor(private readonly facebookAuth: FacebookAuthentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }

      const accessToken = await this.facebookAuth.perform({ token: httpRequest.token })

      if (accessToken instanceof AccessToken) {
        return ok({
          accessToken: accessToken.value,
        })
      }

      return unauthorized()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
