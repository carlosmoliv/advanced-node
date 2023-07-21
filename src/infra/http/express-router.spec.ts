import { type Response, type Request } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { type Controller } from '@/application/controllers'
import { mock } from 'jest-mock-extended'

class ExpressRouter {
  constructor(private readonly controller: Controller) {}

  async adapt(req: Request, res: Response): Promise<void> {
    await this.controller.handle({ ...req.body })
  }
}
describe('ExpressRouter', () => {
  it('should call handle with correct request', async () => {
    // Arrange
    const req = getMockReq({ body: { any: 'any' } })
    const { res } = getMockRes()
    const controller = mock<Controller>()
    const sut = new ExpressRouter(controller)

    // Act
    await sut.adapt(req, res)

    // Assert
    expect(controller.handle).toHaveBeenCalledWith({ any: 'any' })
  })

  it('should call handle with empty request', async () => {
    // Arrange
    const req = getMockReq()
    const { res } = getMockRes()
    const controller = mock<Controller>()
    const sut = new ExpressRouter(controller)

    // Act
    await sut.adapt(req, res)

    // Assert
    expect(controller.handle).toHaveBeenCalledWith({})
  })
})
