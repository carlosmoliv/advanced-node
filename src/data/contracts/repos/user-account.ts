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

export interface CreateFaceboookAccountRepository {
  createFromFacebook: (params: CreateFaceboookAccountRepository.Params) => Promise<void>
}

export namespace CreateFaceboookAccountRepository {
  export type Params = {
    email: string
    name: string
    facebookId: string
  }
}

export interface UpdateFaceboookAccountRepository {
  updateWithFacebook: (params: UpdateFaceboookAccountRepository.Params) => Promise<void>
}

export namespace UpdateFaceboookAccountRepository {
  export type Params = {
    id: string
    name: string
    facebookId: string
  }
}
