import { UserProfile } from '@/domain/entities'

describe('UserProfile', () => {
  let sut: UserProfile

  beforeEach(() => {
    sut = new UserProfile('any_id')
  })

  it('should create with empty initials when pictureUrl is provided', async () => {
    sut.setPicture({ pictureUrl: 'any_url', name: 'any_name' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined
    })
  })

  it('should create with empty initials when pictureUrl is provided', async () => {
    sut.setPicture({ pictureUrl: 'any_url' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: 'any_url',
      initials: undefined
    })
  })

  it('should create initials using the first letter of the first and last names', async () => {
    sut.setPicture({ name: 'carlos vinicus m. oliveira' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'CO'
    })
  })

  it('should create initials using the first two letters of the first name', async () => {
    sut.setPicture({ name: 'carlos' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'CA'
    })
  })

  it('should create initials using the first letter', async () => {
    sut.setPicture({ name: 'c' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: 'C'
    })
  })

  it('should with empty initials when name and piuctureUrl are not provided', async () => {
    sut.setPicture({})

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: undefined
    })
  })

  it('should with empty initials when name and piuctureUrl are not provided', async () => {
    sut.setPicture({ name: '' })

    expect(sut).toEqual({
      id: 'any_id',
      pictureUrl: undefined,
      initials: undefined
    })
  })
})
