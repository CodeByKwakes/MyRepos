import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './league.controller'
import { schema } from './league.model'
export League, { schema } from './league.model'

const router = new Router()
const { display_name, created_by, players } = schema.tree

/**
 * @api {post} /leagues Create league
 * @apiName CreateLeague
 * @apiGroup League
 * @apiParam display_name League's display_name.
 * @apiParam created_by League's created_by.
 * @apiParam players League's players.
 * @apiSuccess {Object} league League's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 League not found.
 */
router.post('/',
  body({ display_name, created_by, players }),
  create)

/**
 * @api {get} /leagues Retrieve leagues
 * @apiName RetrieveLeagues
 * @apiGroup League
 * @apiUse listParams
 * @apiSuccess {Object[]} leagues List of leagues.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /leagues/:id Retrieve league
 * @apiName RetrieveLeague
 * @apiGroup League
 * @apiSuccess {Object} league League's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 League not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /leagues/:id Update league
 * @apiName UpdateLeague
 * @apiGroup League
 * @apiParam display_name League's display_name.
 * @apiParam created_by League's created_by.
 * @apiParam players League's players.
 * @apiSuccess {Object} league League's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 League not found.
 */
router.put('/:id',
  body({ display_name, created_by, players }),
  update)

/**
 * @api {delete} /leagues/:id Delete league
 * @apiName DeleteLeague
 * @apiGroup League
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 League not found.
 */
router.delete('/:id',
  destroy)

export default router
