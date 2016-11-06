import { Player } from '.'

let player

beforeEach(async () => {
  player = await Player.create({ display_name: 'test', leagues: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = player.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(player.id)
    expect(view.display_name).toBe(player.display_name)
    expect(view.leagues).toBe(player.leagues)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = player.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(player.id)
    expect(view.display_name).toBe(player.display_name)
    expect(view.leagues).toBe(player.leagues)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
