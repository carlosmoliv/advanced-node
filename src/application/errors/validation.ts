export class RequiredFieldError extends Error {
  constructor (fieldName?: string) {
    const message = fieldName === undefined
      ? 'Required field'
      : `The field ${fieldName} is required.`
    super(message)
    this.name = 'RequiredFieldError'
  }
}

export class InvalidMimeTypeError extends Error {
  constructor (allowed: string[]) {
    super(`Unsupported file type. Only ${allowed.join(', ')} formats are allowed.`)
    this.name = 'InvalidMimeTypeError'
  }
}

export class MaxFileSizeError extends Error {
  constructor (sizeInMb: number) {
    super(`File size must be equal or less than ${sizeInMb} MB`)
    this.name = 'MaxFileSizeError'
  }
}
