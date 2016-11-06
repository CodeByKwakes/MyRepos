import test from 'ava'
import mockgoose from 'mockgoose'
import mongoose from '../../config/mongoose'
import { schema } from '.'

test.beforeEach(async (t) => {
  const mongo = new mongoose.Mongoose()
  await mockgoose(mongo)
  await mongo.connect('')
  const Story = mongo.model('Story', schema)
  const story = await Story.create({ creator: 'test', title: 'test', fans: 'test' })

  t.context = { ...t.context, Story, story }
})

test.cb.after.always((t) => {
  mockgoose.reset(t.end)
})

test('view', (t) => {
  const { story } = t.context
  const view = story.view()
  t.true(typeof view === 'object')
  t.true(view.id === story.id)
  t.true(view.creator === story.creator)
  t.true(view.title === story.title)
  t.true(view.fans === story.fans)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})

test('full view', (t) => {
  const { story } = t.context
  const view = story.view(true)
  t.true(typeof view === 'object')
  t.true(view.id === story.id)
  t.true(view.creator === story.creator)
  t.true(view.title === story.title)
  t.true(view.fans === story.fans)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})
