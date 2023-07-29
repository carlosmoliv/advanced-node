import { adaptExpressMiddleware } from '@/main/adapters'
import { makeAuthenicationMiddleware } from '@/main/factories/middleware'

export const auth = adaptExpressMiddleware(makeAuthenicationMiddleware())
