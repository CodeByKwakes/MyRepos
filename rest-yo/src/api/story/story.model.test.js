import { Story } from '.'

let story

beforeEach(async () => {
  story = await Story.create({ title: 'test', year: 'test', author: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = story.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(story.id)
    expect(view.title).toBe(story.title)
    expect(view.year).toBe(story.year)
    expect(view.author).toBe(story.author)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = story.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(story.id)
    expect(view.title).toBe(story.title)
    expect(view.year).toBe(story.year)
    expect(view.author).toBe(story.author)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
