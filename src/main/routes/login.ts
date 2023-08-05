import { adaptExpressRoute as adapt } from '@/main/adapters'
import { type Router } from 'express'
import { makeFacebookLoginController } from '@/main/factories/application/controllers'

export default (router: Router): void => {
  router.post('/login/facebook', adapt(makeFacebookLoginController()))
}
