export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result =
    | undefined
    | {
        id: string
        name?: string
      }
}

export interface SaveFaceboookAccountRepository {
  saveWithFacebook: (params: SaveFaceboookAccountRepository.Params) => Promise<void>
}

export namespace SaveFaceboookAccountRepository {
  export type Params = {
    id?: string
    email: string
    name: string
    facebookId: string
  }
}
