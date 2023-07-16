import { RequiredFieldError } from '@/application/errors'

export class RequiredStringValidator {
  constructor(private readonly fieldValue: string, private readonly fieldName: string) {}

  validate(): Error | undefined {
    if (this.fieldValue === '' || this.fieldValue === null || this.fieldValue === undefined) {
      return new RequiredFieldError(this.fieldName)
    }
  }
}
