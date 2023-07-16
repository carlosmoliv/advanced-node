import { badRequest, unauthorized, type HttpResponse, serverError, ok } from '@/application/helpers'
import { type FacebookAuthentication } from '@/domain/features'
import { AccessToken } from '@/domain/models'
import { RequiredStringValidator } from '@/application/validation'

type HttpRequest = {
  token: string
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
      const error = this.validate(httpRequest)

      if (error !== undefined) {
        return badRequest(error)
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

  private validate(httpRequest: HttpRequest): Error | undefined {
    const validator = new RequiredStringValidator(httpRequest.token, 'token')
    return validator.validate()
  }
}
