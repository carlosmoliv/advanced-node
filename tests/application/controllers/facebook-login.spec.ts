import { type MockProxy, mock } from 'jest-mock-extended'
import { type FacebookAuthentication } from '@/domain/features'
import { AuthenticationError } from '@/domain/errors'
import { AccessToken } from '@/domain/models'
import { FacebookLoginController } from '@/application/controllers'
import { ServerError, UnauthorizedError } from '@/application/errors'
import { RequiredStringValidator } from '@/application/validation'

jest.mock('@/application/validation/required-string')

describe('FacebookLoginController', () => {
  let sut: FacebookLoginController
  let facebookAuth: MockProxy<FacebookAuthentication>
  let token: string

  beforeAll(() => {
    token = 'any_token'
    facebookAuth = mock()
    facebookAuth.perform.mockResolvedValue(new AccessToken('any_value'))
  })

  beforeEach(() => {
    sut = new FacebookLoginController(facebookAuth)
  })

  it('shoud return 400 if validation fails', async () => {
    const error = new Error('validation_error')
    const requiredStringValidatorSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error),
    }))

    jest.mocked(RequiredStringValidator).mockImplementationOnce(requiredStringValidatorSpy)

    const httpResponse = await sut.handle({ token })

    expect(requiredStringValidatorSpy).toHaveBeenCalledWith('any_token', 'token')
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error,
    })
  })

  it('shoud call FacebookAuthentication with correct params', async () => {
    await sut.handle({ token })

    expect(facebookAuth.perform).toHaveBeenCalledWith({ token })
    expect(facebookAuth.perform).toHaveBeenCalledTimes(1)
  })

  it('shoud call 401 if authentication fails', async () => {
    facebookAuth.perform.mockResolvedValueOnce(new AuthenticationError())
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 401,
      data: new UnauthorizedError(),
    })
  })

  it('shoud return 200 if authentication succeeds', async () => {
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        accessToken: 'any_value',
      },
    })
  })

  it('shoud return 500 if authentication throws', async () => {
    const error = new Error('infra_error')

    facebookAuth.perform.mockRejectedValue(new Error('infra_error'))
    const httpResponse = await sut.handle({ token })

    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(error),
    })
  })
})