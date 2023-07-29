import { type Middleware } from '@/application/middlewares'

import { type Request, type NextFunction, type Response } from 'express'

export const adaptExpressMiddleware =
  (middleware: Middleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { statusCode, data } = await middleware.handle({ ...req.headers })

    if (statusCode === 200) {
      const entries = Object.entries(data).filter((entry) => entry[1])
      req.locals = { ...req.locals, ...Object.fromEntries(entries) }

      next()
    }

    return res.status(statusCode).json(data)
  }
