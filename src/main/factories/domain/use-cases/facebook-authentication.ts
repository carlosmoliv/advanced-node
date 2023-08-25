import { makeFacebookApi, makeJwtTokenHandler } from '@/main/factories/infra/gateways'
import { makePgUserAccountRepo } from '@/main/factories/infra/repos/postgres'
import { type FacebookAuthentication, setupFacebookAuthentication } from '@/domain/use-cases'

export const makeFacebookAuthentication = (): FacebookAuthentication => {
  return setupFacebookAuthentication(
    makeFacebookApi(),
    makePgUserAccountRepo(),
    makeJwtTokenHandler()
  )
}
