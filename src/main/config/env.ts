export const env = {
  facebookApi: {
    clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? '',
    user: {
      name: process.env.FACEBOOK_USER_NAME ?? '',
      email: process.env.FACEBOOK_USER_EMAIL ?? '',
      facebookUserId: process.env.FACEBOOK_USER_ID ?? '',
      token: process.env.FACEBOOK_USER_TOKEN ?? ''
    }
  },
  port: process.env.APP_PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'shhhhhh',
  database: {
    host: process.env.DB_HOST ?? '',
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USERNAME ?? '',
    password: process.env.DB_PASSWORD ?? '',
    name: process.env.DB_NAME ?? ''
  },
  s3: {
    bucket: process.env.AWS_S3_BUCKET ?? '',
    accessKey: process.env.AWS_S3_ACCESS_KEY ?? '',
    secretKey: process.env.AWS_S3_SECRET_KEY ?? '',
    region: process.env.AWS_S3_REGION ?? ''
  }
}
