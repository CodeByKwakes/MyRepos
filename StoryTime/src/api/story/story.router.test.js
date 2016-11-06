import test from 'ava'
import request from 'supertest-as-promised'
import mockgoose from 'mockgoose'
import express from '../../config/express'
import mongoose from '../../config/mongoose'
import routes, { Story } from '.'

const app = () => express(routes)

test.before(async (t) => {
  await mockgoose(mongoose)
  await mongoose.connect('')
})

test.beforeEach(async (t) => {
  const story = await Story.create({})
  t.context = { ...t.context, story }
})

test.afterEach.always(async (t) => {
  await Story.remove()
})

test.serial('POST /stories 201', async (t) => {
  const { status, body } = await request(app())
    .post('/')
    .send({ creator: 'test', title: 'test', fans: 'test' })
  t.true(status === 201)
  t.true(typeof body === 'object')
  t.true(body.creator === 'test')
  t.true(body.title === 'test')
  t.true(body.fans === 'test')
})

test.serial('GET /stories 200', async (t) => {
  const { status, body } = await request(app())
    .get('/')
  t.true(status === 200)
  t.true(Array.isArray(body))
})

test.serial('GET /stories/:id 200', async (t) => {
  const { story } = t.context
  const { status, body } = await request(app())
    .get(`/${story.id}`)
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === story.id)
})

test.serial('GET /stories/:id 404', async (t) => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  t.true(status === 404)
})

test.serial('PUT /stories/:id 200', async (t) => {
  const { story } = t.context
  const { status, body } = await request(app())
    .put(`/${story.id}`)
    .send({ creator: 'test', title: 'test', fans: 'test' })
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === story.id)
  t.true(body.creator === 'test')
  t.true(body.title === 'test')
  t.true(body.fans === 'test')
})

test.serial('PUT /stories/:id 404', async (t) => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ creator: 'test', title: 'test', fans: 'test' })
  t.true(status === 404)
})

test.serial('DELETE /stories/:id 204', async (t) => {
  const { story } = t.context
  const { status } = await request(app())
    .delete(`/${story.id}`)
  t.true(status === 204)
})

test.serial('DELETE /stories/:id 404', async (t) => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  t.true(status === 404)
})
