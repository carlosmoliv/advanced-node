import { config } from 'aws-sdk'

jest.mock('aws-sdk')

class AwsS3FileStorage {
  constructor (
    private readonly accessKey: string,
    private readonly secret: string
  ) {
    config.update({
      credentials: {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secret
      }
    })
  }
}

describe('AwsS3FileStorage', () => {
  it('should call upload with correct input', async () => {
    const accessKey = 'any_access_key'
    const secret = 'any_secret'

    const sut = new AwsS3FileStorage(accessKey, secret)

    expect(sut).toBeDefined()
    expect(config.update).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
    expect(config.update).toHaveBeenCalledTimes(1)
  })
})
