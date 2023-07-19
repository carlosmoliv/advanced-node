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
  }
}
