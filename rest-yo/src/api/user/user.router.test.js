import request from 'supertest-as-promised'
import express from '../../config/express'
import routes, { User } from '.'

const app = () => express(routes)

let user

beforeEach(async () => {
  user = await User.create({})
})

test('POST /users 201', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ name: 'test', gender: 'test', age: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.gender).toEqual('test')
  expect(body.age).toEqual('test')
})

test('GET /users 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /users/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${user.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(user.id)
})

test('GET /users/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /users/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`/${user.id}`)
    .send({ name: 'test', gender: 'test', age: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(user.id)
  expect(body.name).toEqual('test')
  expect(body.gender).toEqual('test')
  expect(body.age).toEqual('test')
})

test('PUT /users/:id 404', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ name: 'test', gender: 'test', age: 'test' })
  expect(status).toBe(404)
})

test('DELETE /users/:id 204', async () => {
  const { status } = await request(app())
    .delete(`/${user.id}`)
  expect(status).toBe(204)
})

test('DELETE /users/:id 404', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
  expect(status).toBe(404)
})
