import request from 'supertest-as-promised'
import express from '../../config/express'
import routes, { Story } from '.'

const app = () => express(routes)

let story

beforeEach(async () => {
  story = await Story.create({})
})

test('POST /stories 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ title: 'test', year: 'test', author: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.author).toEqual('test')
})

test('GET /stories 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /stories/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${story.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(story.id)
})

test('GET /stories/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /stories/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${story.id}`)
    .send({ title: 'test', year: 'test', author: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(story.id)
  expect(body.title).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.author).toEqual('test')
})

test('PUT /stories/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ title: 'test', year: 'test', author: 'test' })
  expect(status).toBe(404)
})

test('DELETE /stories/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${story.id}`)
  expect(status).toBe(204)
})

test('DELETE /stories/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
