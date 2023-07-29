import { AuthenticationMiddleware } from '@/application/middlewares'
import { makeJwtTokenHandler } from '@/main/crypto'

export const makeAuthenicationMiddleware = (): AuthenticationMiddleware => {
  const jwt = makeJwtTokenHandler()
  return new AuthenticationMiddleware(jwt.validateToken.bind(jwt))
}
