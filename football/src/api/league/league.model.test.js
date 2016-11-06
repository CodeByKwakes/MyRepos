import { League } from '.'

let league

beforeEach(async () => {
  league = await League.create({ display_name: 'test', created_by: 'test', players: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = league.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(league.id)
    expect(view.display_name).toBe(league.display_name)
    expect(view.created_by).toBe(league.created_by)
    expect(view.players).toBe(league.players)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = league.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(league.id)
    expect(view.display_name).toBe(league.display_name)
    expect(view.created_by).toBe(league.created_by)
    expect(view.players).toBe(league.players)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
