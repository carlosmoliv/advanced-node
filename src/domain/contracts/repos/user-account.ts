export interface LoadUserAccount {
  load: (params: LoadUserAccount.Params) => Promise<LoadUserAccount.Result>
}

export namespace LoadUserAccount {
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

export interface SaveFaceboookAccount {
  saveWithFacebook: (
    params: SaveFaceboookAccount.Params
  ) => Promise<SaveFaceboookAccount.Result>
}

export namespace SaveFaceboookAccount {
  export type Params = {
    id?: string
    email: string
    name: string
    facebookId: string
  }

  export type Result = {
    id: string
  }
}
