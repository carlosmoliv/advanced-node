import { type HttpResponse } from '@/application/helpers'
import { type FacebookAuthentication } from '@/domain/features'
import { ServerError } from '@/application/errors'
import { AccessToken } from '@/domain/models'

export class FacebookLoginController {
  constructor(private readonly facebookAuth: FacebookAuthentication) {}

  async handle(httpRequest: any): Promise<HttpResponse> {
    try {
      if (httpRequest.token === '' || httpRequest.token === null || httpRequest.token === undefined) {
        return {
          statusCode: 400,
          data: new Error('The field token is required'),
        }
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
