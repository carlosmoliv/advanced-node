import { AuthenticationError } from '@/domain/entities/errors'
import { type LoadFacebookUserApi } from '@/domain/contracts/apis'
import {
  type LoadUserAccountRepository,
  type SaveFaceboookAccountRepository
} from '@/domain/contracts/repos'
import { AccessToken, FacebookAccount } from '@/domain/entities'
import { type TokenGenerator } from '@/domain/contracts/crypto'

type Setup = (
  facebookApi: LoadFacebookUserApi,
  userAccountRepo: LoadUserAccountRepository & SaveFaceboookAccountRepository,
  crypto: TokenGenerator
) => FacebookAuthentication

export type FacebookAuthentication = (params: {
  token: string
}) => Promise<{ accessToken: string }>

export const setupFacebookAuthentication: Setup =
  (facebookApi, userAccountRepo, crypto) => async (params) => {
    const fbData = await facebookApi.loadUser(params)

    if (fbData !== undefined) {
      const accountData = await userAccountRepo.load({
        email: fbData.email
      })
      const fbAccount = new FacebookAccount(fbData, accountData)

      const { id } = await userAccountRepo.saveWithFacebook(fbAccount)
      const accessToken = await crypto.generateToken({
        key: id,
        expirationInMs: AccessToken.expirationInMs
      })

      return { accessToken }
    }

    throw new AuthenticationError()
  }
