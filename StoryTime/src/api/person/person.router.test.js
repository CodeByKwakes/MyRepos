import test from 'ava'
import request from 'supertest-as-promised'
import mockgoose from 'mockgoose'
import express from '../../config/express'
import mongoose from '../../config/mongoose'
import routes, { Person } from '.'

const app = () => express(routes)

test.before(async (t) => {
  await mockgoose(mongoose)
  await mongoose.connect('')
})

test.beforeEach(async (t) => {
  const person = await Person.create({})
  t.context = { ...t.context, person }
})

test.afterEach.always(async (t) => {
  await Person.remove()
})

test.serial('POST /people 201', async (t) => {
  const { status, body } = await request(app())
    .post('/')
    .send({ name: 'test', age: 'test', stories: 'test' })
  t.true(status === 201)
  t.true(typeof body === 'object')
  t.true(body.name === 'test')
  t.true(body.age === 'test')
  t.true(body.stories === 'test')
})

test.serial('GET /people 200', async (t) => {
  const { status, body } = await request(app())
    .get('/')
  t.true(status === 200)
  t.true(Array.isArray(body))
})

test.serial('GET /people/:id 200', async (t) => {
  const { person } = t.context
  const { status, body } = await request(app())
    .get(`/${person.id}`)
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === person.id)
})

test.serial('GET /people/:id 404', async (t) => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  t.true(status === 404)
})

test.serial('PUT /people/:id 200', async (t) => {
  const { person } = t.context
  const { status, body } = await request(app())
    .put(`/${person.id}`)
    .send({ name: 'test', age: 'test', stories: 'test' })
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === person.id)
  t.true(body.name === 'test')
  t.true(body.age === 'test')
  t.true(body.stories === 'test')
})

test.serial('PUT /people/:id 404', async (t) => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ name: 'test', age: 'test', stories: 'test' })
  t.true(status === 404)
})

test.serial('DELETE /people/:id 204', async (t) => {
  const { person } = t.context
  const { status } = await request(app())
    .delete(`/${person.id}`)
  t.true(status === 204)
})

test.serial('DELETE /people/:id 404', async (t) => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  t.true(status === 404)
})
