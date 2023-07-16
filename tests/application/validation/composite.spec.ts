import { mock } from 'jest-mock-extended'

interface Validator {
  validate: () => Error | undefined
}

class ValidationComposite {
  constructor(private readonly validators: Validator[]) {}

  validate(): undefined {
    return undefined
  }
}

describe('ValidationComposite', () => {
  it('should return undefined if all Validators return undefined', () => {
    // Arrange
    const validator1 = mock<Validator>()
    validator1.validate.mockReturnValueOnce(undefined)

    const validator2 = mock<Validator>()
    validator2.validate.mockReturnValueOnce(undefined)

    const validators = [validator1, validator2]

    const sut = new ValidationComposite(validators)

    // Act
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
    const error = sut.validate()

    // Assert
    expect(error).toBeUndefined()
  })
})
