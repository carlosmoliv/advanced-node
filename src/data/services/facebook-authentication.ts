import { AuthenticationError } from '@/domain/errors'
import { FacebookAuthentication } from '@/domain/features'
import { LoadFacebookUserApi } from '@/data/contracts/apis'
import {
  CreateFaceboookAccountRepository,
  LoadUserAccountRepository,
  UpdateFaceboookAccountRepository,
} from '../contracts/repos'

export class FacebookAuthenticationService {
  constructor(
    private readonly facebookApi: LoadFacebookUserApi,
    private readonly userAccountRepo: LoadUserAccountRepository &
      CreateFaceboookAccountRepository &
      UpdateFaceboookAccountRepository
  ) {}

  async perform(params: FacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)

    if (fbData !== undefined) {
      const accountData = await this.userAccountRepo.load({ email: fbData.email })

      if (accountData !== undefined) {
        await this.userAccountRepo.updateWithFacebook({
          id: accountData.id,
          name: accountData.name ?? fbData.name,
          facebookId: fbData.facebookId,
        })
      } else {
        await this.userAccountRepo.createFromFacebook(fbData)
      }
    }

    return new AuthenticationError()
  }
}
