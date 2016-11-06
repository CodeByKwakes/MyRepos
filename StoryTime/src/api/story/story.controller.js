import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Story } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Story.create(body)
    .then((story) => story.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Story.find(query, select, cursor)
    .then((stories) => stories.map((story) => story.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Story.findById(params.id)
    .then(notFound(res))
    .then((story) => story ? story.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Story.findById(params.id)
    .then(notFound(res))
    .then((story) => story ? _.merge(story, body).save() : null)
    .then((story) => story ? story.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Story.findById(params.id)
    .then(notFound(res))
    .then((story) => story ? story.remove() : null)
    .then(success(res, 204))
    .catch(next)
