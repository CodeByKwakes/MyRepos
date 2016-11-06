import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './player.controller'
import { schema } from './player.model'
export Player, { schema } from './player.model'

const router = new Router()
const { display_name, leagues } = schema.tree

/**
 * @api {post} /players Create player
 * @apiName CreatePlayer
 * @apiGroup Player
 * @apiParam display_name Player's display_name.
 * @apiParam leagues Player's leagues.
 * @apiSuccess {Object} player Player's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Player not found.
 */
router.post('/',
  body({ display_name, leagues }),
  create)

/**
 * @api {get} /players Retrieve players
 * @apiName RetrievePlayers
 * @apiGroup Player
 * @apiUse listParams
 * @apiSuccess {Object[]} players List of players.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /players/:id Retrieve player
 * @apiName RetrievePlayer
 * @apiGroup Player
 * @apiSuccess {Object} player Player's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Player not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /players/:id Update player
 * @apiName UpdatePlayer
 * @apiGroup Player
 * @apiParam display_name Player's display_name.
 * @apiParam leagues Player's leagues.
 * @apiSuccess {Object} player Player's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Player not found.
 */
router.put('/:id',
  body({ display_name, leagues }),
  update)

/**
 * @api {delete} /players/:id Delete player
 * @apiName DeletePlayer
 * @apiGroup Player
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Player not found.
 */
router.delete('/:id',
  destroy)

export default router
