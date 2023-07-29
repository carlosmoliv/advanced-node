import { AuthenticationMiddleware } from '@/application/middlewares'
import { setupAuthorize } from '@/domain/use-cases'
import { makeJwtTokenHandler } from '@/main/crypto'

export const makeAuthenicationMiddleware = (): AuthenticationMiddleware => {
  const authorize = setupAuthorize(makeJwtTokenHandler())
  return new AuthenticationMiddleware(authorize)
}
