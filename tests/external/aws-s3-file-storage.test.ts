import { AwsS3FileStorage } from '@/infra/gateways/aws-s3-file-storage'
import { env } from '@/main/config/env'

import axios from 'axios'

describe('AWS S3 Integration Tests', () => {
  let sut: AwsS3FileStorage

  beforeEach(async () => {
    sut = new AwsS3FileStorage(
      env.s3.accessKey,
      env.s3.secretKey,
      env.s3.bucket
    )
  })

  it('should upload and delete image from aws s3', async () => {
    const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjmPzd+z8ABssC1f3LWlYAAAAASUVORK5CYII='
    const file = Buffer.from(onePixelImage, 'base64')
    const fileName = 'any_file_name.png'

    const pictureUrl = await sut.upload({ fileName, file })

    expect((await axios.get(pictureUrl)).status).toBe(200)

    await sut.delete({ fileName })

    await expect(axios.get(pictureUrl)).rejects.toThrow()
  })
})
