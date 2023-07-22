import { type Controller } from '@/application/controllers'

import { type Response, type Request } from 'express'

export const adaptExpressRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle({ ...req.body })

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(200).json(httpResponse.data)
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.data.message })
    }
  }
}
