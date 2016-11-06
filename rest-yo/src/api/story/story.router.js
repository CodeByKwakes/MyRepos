import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './story.controller'
import { schema } from './story.model'
export Story, { schema } from './story.model'

const router = new Router()
const { title, year, author } = schema.tree

/**
 * @api {post} /stories Create story
 * @apiName CreateStory
 * @apiGroup Story
 * @apiParam title Story's title.
 * @apiParam year Story's year.
 * @apiParam author Story's author.
 * @apiSuccess {Object} story Story's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Story not found.
 */
router.post('/',
  body({ title, year, author }),
  create)

/**
 * @api {get} /stories Retrieve stories
 * @apiName RetrieveStories
 * @apiGroup Story
 * @apiUse listParams
 * @apiSuccess {Object[]} stories List of stories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /stories/:id Retrieve story
 * @apiName RetrieveStory
 * @apiGroup Story
 * @apiSuccess {Object} story Story's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Story not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /stories/:id Update story
 * @apiName UpdateStory
 * @apiGroup Story
 * @apiParam title Story's title.
 * @apiParam year Story's year.
 * @apiParam author Story's author.
 * @apiSuccess {Object} story Story's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Story not found.
 */
router.put('/:id',
  body({ title, year, author }),
  update)

/**
 * @api {delete} /stories/:id Delete story
 * @apiName DeleteStory
 * @apiGroup Story
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Story not found.
 */
router.delete('/:id',
  destroy)

export default router
