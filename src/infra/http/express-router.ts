import { type Controller } from '@/application/controllers'

import { type Response, type Request } from 'express'

export const adaptExpressRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const { data, statusCode } = await controller.handle({ ...req.body })

    const json =
      statusCode >= 200 && statusCode <= 299 ? data : { error: data.message }

    res.status(statusCode).json(json)
  }
}
