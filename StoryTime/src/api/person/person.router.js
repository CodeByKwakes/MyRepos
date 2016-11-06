import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './person.controller'
import { schema } from './person.model'
export Person, { schema } from './person.model'

const router = new Router()
const { name, age, stories } = schema.tree

/**
 * @api {post} /people Create person
 * @apiName CreatePerson
 * @apiGroup Person
 * @apiParam name Person's name.
 * @apiParam age Person's age.
 * @apiParam stories Person's stories.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 */
router.post('/',
  body({ name, age, stories }),
  create)

/**
 * @api {get} /people Retrieve people
 * @apiName RetrievePeople
 * @apiGroup Person
 * @apiUse listParams
 * @apiSuccess {Object[]} people List of people.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /people/:id Retrieve person
 * @apiName RetrievePerson
 * @apiGroup Person
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /people/:id Update person
 * @apiName UpdatePerson
 * @apiGroup Person
 * @apiParam name Person's name.
 * @apiParam age Person's age.
 * @apiParam stories Person's stories.
 * @apiSuccess {Object} person Person's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Person not found.
 */
router.put('/:id',
  body({ name, age, stories }),
  update)

/**
 * @api {delete} /people/:id Delete person
 * @apiName DeletePerson
 * @apiGroup Person
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Person not found.
 */
router.delete('/:id',
  destroy)

export default router
