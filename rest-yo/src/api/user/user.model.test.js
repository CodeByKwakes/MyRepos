import { User } from '.'

let user

beforeEach(async () => {
  user = await User.create({ name: 'test', gender: 'test', age: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = user.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user.id)
    expect(view.name).toBe(user.name)
    expect(view.gender).toBe(user.gender)
    expect(view.age).toBe(user.age)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = user.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(user.id)
    expect(view.name).toBe(user.name)
    expect(view.gender).toBe(user.gender)
    expect(view.age).toBe(user.age)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
