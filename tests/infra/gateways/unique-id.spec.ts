import { UniqueId } from '@/infra/gateways'

describe('UniqueId', () => {
  it('should vall uuid.v4', () => {
    const sut = new UniqueId(new Date(2021, 9, 3, 10, 10, 10))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20211003101010')
  })

  it('should vall uuid.v4', () => {
    const sut = new UniqueId(new Date(1993, 5, 21, 2, 8, 30))

    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_19930621020830')
  })
})
