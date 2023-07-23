import { AuthenticationError } from '@/domain/entities/errors'
import { type FacebookAuthentication } from '@/domain/features'
import { type LoadFacebookUserApi } from '@/domain/contracts/apis'
import {
  type LoadUserAccountRepository,
  type SaveFaceboookAccountRepository
} from '@/domain/contracts/repos'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { type TokenGenerator } from '@/domain/contracts/crypto'

export class FacebookAuthenticationUseCase implements FacebookAuthentication {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository &
      SaveFaceboookAccountRepository,
    private readonly crypto: TokenGenerator
  ) {}

  async perform(
    params: FacebookAuthentication.Params
  ): Promise<FacebookAuthentication.Result> {
    const fbData = await this.facebookApi.loadUser(params)

    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({
        email: fbData.email
      })
      const fbAccount = new FacebookAccount(fbData, accountData)

      const { id } = await this.userAccountRepo.saveWithFacebook(fbAccount)
      const token = await this.crypto.generateToken({
        key: id,
        expirationInMs: AccessToken.expirationInMs
      })

      return new AccessToken(token)
    }

    return new AuthenticationError()
  }
}
