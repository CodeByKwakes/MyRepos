import request from 'supertest-as-promised'
import express from '../../config/express'
import routes, { Player } from '.'

const app = () => express(routes)

let player

beforeEach(async () => {
  player = await Player.create({})
})

test('POST /players 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ display_name: 'test', leagues: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.display_name).toEqual('test')
  expect(body.leagues).toEqual('test')
})

test('GET /players 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /players/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${player.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(player.id)
})

test('GET /players/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /players/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${player.id}`)
    .send({ display_name: 'test', leagues: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(player.id)
  expect(body.display_name).toEqual('test')
  expect(body.leagues).toEqual('test')
})

test('PUT /players/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ display_name: 'test', leagues: 'test' })
  expect(status).toBe(404)
})

test('DELETE /players/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${player.id}`)
  expect(status).toBe(204)
})

test('DELETE /players/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
