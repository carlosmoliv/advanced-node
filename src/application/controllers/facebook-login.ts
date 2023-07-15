import { badRequest, unauthorized, type HttpResponse } from '@/application/helpers'
import { type FacebookAuthentication } from '@/domain/features'
import { RequiredFieldError, ServerError } from '@/application/errors'
import { AccessToken } from '@/domain/models'

export class FacebookLoginController {
  constructor(private readonly facebookAuth: FacebookAuthentication) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return badRequest(new RequiredFieldError('token'))
      }

      const accessToken = await this.facebookAuth.perform({ token: httpRequest.token })

      if (accessToken instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: accessToken.value,
          },
        }
      }

      return unauthorized()
    } catch {
      return {
        statusCode: 500,
        data: new ServerError(),
      }
    }
  }
}
