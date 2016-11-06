import request from 'supertest-as-promised'
import express from '../../config/express'
import routes, { League } from '.'

const app = () => express(routes)

let league

beforeEach(async () => {
  league = await League.create({})
})

test('POST /leagues 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ display_name: 'test', created_by: 'test', players: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.display_name).toEqual('test')
  expect(body.created_by).toEqual('test')
  expect(body.players).toEqual('test')
})

test('GET /leagues 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /leagues/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${league.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(league.id)
})

test('GET /leagues/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /leagues/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${league.id}`)
    .send({ display_name: 'test', created_by: 'test', players: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(league.id)
  expect(body.display_name).toEqual('test')
  expect(body.created_by).toEqual('test')
  expect(body.players).toEqual('test')
})

test('PUT /leagues/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ display_name: 'test', created_by: 'test', players: 'test' })
  expect(status).toBe(404)
})

test('DELETE /leagues/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${league.id}`)
  expect(status).toBe(204)
})

test('DELETE /leagues/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
