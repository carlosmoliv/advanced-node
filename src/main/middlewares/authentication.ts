import { adaptExpressMiddleware } from '@/main/adapters'
import { makeAuthenicationMiddleware } from '@/main/factories/application/middleware'

export const auth = adaptExpressMiddleware(makeAuthenicationMiddleware())
