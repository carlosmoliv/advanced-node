import { type Controller } from '@/application/controllers'

import { type Response, type Request } from 'express'

export class ExpressRouter {
  constructor(private readonly controller: Controller) {}

  async adapt(req: Request, res: Response): Promise<void> {
    const httpResponse = await this.controller.handle({ ...req.body })
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299)
      res.status(200).json(httpResponse.data)
    else
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.data.message })
  }
}
