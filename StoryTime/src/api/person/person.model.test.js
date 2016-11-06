import test from 'ava'
import mockgoose from 'mockgoose'
import mongoose from '../../config/mongoose'
import { schema } from '.'

test.beforeEach(async (t) => {
  const mongo = new mongoose.Mongoose()
  await mockgoose(mongo)
  await mongo.connect('')
  const Person = mongo.model('Person', schema)
  const person = await Person.create({ name: 'test', age: 'test', stories: 'test' })

  t.context = { ...t.context, Person, person }
})

test.cb.after.always((t) => {
  mockgoose.reset(t.end)
})

test('view', (t) => {
  const { person } = t.context
  const view = person.view()
  t.true(typeof view === 'object')
  t.true(view.id === person.id)
  t.true(view.name === person.name)
  t.true(view.age === person.age)
  t.true(view.stories === person.stories)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})

test('full view', (t) => {
  const { person } = t.context
  const view = person.view(true)
  t.true(typeof view === 'object')
  t.true(view.id === person.id)
  t.true(view.name === person.name)
  t.true(view.age === person.age)
  t.true(view.stories === person.stories)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})
