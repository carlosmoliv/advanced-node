import { type Controller } from '@/application/controllers'

import { type Response, type Request } from 'express'

export const adaptExpressRoute =
  (controller: Controller) => async (req: Request, res: Response) => {
    const { data, statusCode } = await controller.handle({ ...req.body, ...req.locals })
    const json = [200, 204].includes(statusCode) ? data : { error: data.message }
    res.status(statusCode).json(json)
  }
