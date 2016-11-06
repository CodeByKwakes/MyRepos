import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { League } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  League.create(body)
    .then((league) => league.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  League.find(query, select, cursor)
    .populate('created_by players')
    .then((leagues) => leagues.map((league) => league.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  League.findById(params.id)
    .populate('created_by players')
    .then(notFound(res))
    .then((league) => league ? league.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  League.findById(params.id)
    .populate('created_by players')
    .then(notFound(res))
    .then((league) => league ? _.merge(league, body).save() : null)
    .then((league) => league ? league.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  League.findById(params.id)
    .then(notFound(res))
    .then((league) => league ? league.remove() : null)
    .then(success(res, 204))
    .catch(next)
