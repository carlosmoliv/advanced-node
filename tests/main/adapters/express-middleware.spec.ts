import { type HttpResponse } from '@/application/helpers'

import { getMockReq, getMockRes } from '@jest-mock/express'
import { type ParsedQs } from 'qs'
import { type MockProxy, mock } from 'jest-mock-extended'
import { type ParamsDictionary } from 'express-serve-static-core'
import { type Request, type Response, type NextFunction } from 'express'

const adaptExpressMiddleware =
  (middleware: Middleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { statusCode, data } = await middleware.handle({ ...req.headers })
    return res.status(statusCode).json(data)
  }

interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}

describe('ExpressMiddleware', () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let middleware: MockProxy<Middleware>
  let sut: (
    req: Request<ParamsDictionary, any, any, ParsedQs>,
    res: Response,
    next: NextFunction
  ) => Promise<Response<any, Record<string, any>>>

  beforeAll(() => {
    req = getMockReq({ headers: { any: 'any' } })
    res = getMockRes().res
    next = getMockRes().next
    middleware = mock<Middleware>()
    middleware.handle.mockResolvedValue({
      statusCode: 500,
      data: { error: 'any_error' }
    })
  })

  beforeEach(() => {
    sut = adaptExpressMiddleware(middleware)
  })

  it('should call handle with correct request', async () => {
    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({ any: 'any' })
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })

  it('should call handle with correct request', async () => {
    req = getMockReq({})

    await sut(req, res, next)

    expect(middleware.handle).toHaveBeenCalledWith({})
    expect(middleware.handle).toHaveBeenCalledTimes(1)
  })

  it('should respond with correct error and status code', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})