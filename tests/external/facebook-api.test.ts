import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('FacebookApi Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(async () => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId,
      env.facebookApi.clientSecret
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const fbUser = await sut.loadUser({
      token: env.facebookApi.user.token
    })

    expect(fbUser).toEqual({
      facebookId: env.facebookApi.user.facebookUserId,
      name: env.facebookApi.user.name,
      email: env.facebookApi.user.email
    })
  })

  it('should return undefined if token is valid', async () => {
    const fbUser = await sut.loadUser({
      token: 'invalid_token'
    })

    expect(fbUser).toBeUndefined()
  })
})
