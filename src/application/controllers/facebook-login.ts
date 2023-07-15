import { badRequest, type HttpResponse } from '@/application/helpers'
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

      const result = await this.facebookAuth.perform({ token: httpRequest.token })

      if (result instanceof AccessToken) {
        return {
          statusCode: 200,
          data: {
            accessToken: result.value,
          },
        }
      }

      return {
        statusCode: 401,
        data: result,
      }
    } catch {
      return {
        statusCode: 500,
        data: new ServerError(),
      }
    }
  }
}
