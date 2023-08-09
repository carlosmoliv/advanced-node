import { env } from '@/main/config/env'
import { AwsS3FileStorage } from '@/infra/gateways/aws-s3-file-storage'

export const makeS3FileStorage = (): AwsS3FileStorage => {
  return new AwsS3FileStorage(
    env.s3.accessKey,
    env.s3.secretKey,
    env.s3.bucket
  )
}
