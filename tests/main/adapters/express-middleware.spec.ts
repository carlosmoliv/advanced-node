import { type HttpResponse } from '@/application/helpers'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { mock } from 'jest-mock-extended'
import { type Request, type Response, type NextFunction } from 'express'

const adaptExpressMiddleware =
  (middleware: Middleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await middleware.handle({ ...req.headers })
  }

interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}

describe('ExpressMiddleware', () => {
  it('should call handle with correct request', async () => {
    const req = getMockReq({ headers: { any: 'any' } })
    const res = getMockRes().res
    const next = getMockRes().next
    const middleware = mock<Middleware>()
    const sut = adaptExpressMiddleware(middleware)

    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with correct request', async () => {
    const req = getMockReq({})
    const res = getMockRes().res
    const next = getMockRes().next
    const middleware = mock<Middleware>()
    const sut = adaptExpressMiddleware(middleware)

    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({})
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })
})
