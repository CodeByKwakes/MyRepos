import test from 'ava'
import request from 'supertest-as-promised'
import mockgoose from 'mockgoose'
import express from '../../config/express'
import mongoose from '../../config/mongoose'
import routes, { Article } from '.'

const app = () => express(routes)

test.before(async (t) => {
  await mockgoose(mongoose)
  await mongoose.connect('')
})

test.beforeEach(async (t) => {
  const article = await Article.create({})
  t.context = { ...t.context, article }
})

test.afterEach.always(async (t) => {
  await Article.remove()
})

test.serial('POST /articles 201', async (t) => {
  const { status, body } = await request(app())
    .post('/')
    .send({ author: 'test', title: 'test', content: 'test' })
  t.true(status === 201)
  t.true(typeof body === 'object')
  t.true(body.author === 'test')
  t.true(body.title === 'test')
  t.true(body.content === 'test')
})

test.serial('GET /articles 200', async (t) => {
  const { status, body } = await request(app())
    .get('/')
  t.true(status === 200)
  t.true(Array.isArray(body))
})

test.serial('GET /articles/:id 200', async (t) => {
  const { article } = t.context
  const { status, body } = await request(app())
    .get(`/${article.id}`)
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === article.id)
})

test.serial('GET /articles/:id 404', async (t) => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  t.true(status === 404)
})

test.serial('PUT /articles/:id 200', async (t) => {
  const { article } = t.context
  const { status, body } = await request(app())
    .put(`/${article.id}`)
    .send({ author: 'test', title: 'test', content: 'test' })
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === article.id)
  t.true(body.author === 'test')
  t.true(body.title === 'test')
  t.true(body.content === 'test')
})

test.serial('PUT /articles/:id 404', async (t) => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ author: 'test', title: 'test', content: 'test' })
  t.true(status === 404)
})

test.serial('DELETE /articles/:id 204', async (t) => {
  const { article } = t.context
  const { status } = await request(app())
    .delete(`/${article.id}`)
  t.true(status === 204)
})

test.serial('DELETE /articles/:id 404', async (t) => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  t.true(status === 404)
})
