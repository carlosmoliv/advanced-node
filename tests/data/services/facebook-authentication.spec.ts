import { FacebookAuthentication } from '@/domain/features'

class FacebookAuthenticationService {
  constructor(private readonly loadFacebookUserByTokenApi: LoadFacebookUserByTokenApi) {}

  async perform(params: FacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserByTokenApi.loadUserByToken(params.token)
  }
}

interface LoadFacebookUserByTokenApi {
  loadUserByToken: (token: string) => Promise<void>
}

class LoadFacebookUserByTokenApiSpy implements LoadFacebookUserByTokenApi {
  token?: string

  async loadUserByToken(token: string): Promise<void> {
    this.token = token
  }
}

describe('FacebookAuthenticationService', () => {
  it('should call loadFacebookUserApi with correct params', async () => {
    const loadFacebookUserByTokenApi = new LoadFacebookUserByTokenApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserByTokenApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserByTokenApi.token).toBe('any_token')
  })
})
