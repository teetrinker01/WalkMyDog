const UserModel = require('../models/users.model')
const DogModel = require('../models/dogs.model')
const RequestModel = require('../models/request.model')
const RatingModel = require('../models/rating.model')
// comprobar si creamos controller de requests
const { handleError } = require('../utils')

module.exports = {
  getMe,
  putMe,
  deleteMe,
  getMyDog,
  getAllRequests,
  putRequestById,
  getRequestById,
  deleteRequestById
}

function getMe (req, res) {
  UserModel.findById(res.locals.user._id)
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

function putMe (req, res) {
  UserModel.findByIdAndUpdate(res.locals.user._id, req.body, {
    new: true,
    select: 'name email',
    runValidators: true
  })
    .then((response) => {
      var result = {
        token: '',
        name: '',
        email: ''
      }
      res.json(response)
    })
    .catch((err) => handleError(err, res))
}

function deleteMe (req, res) {
  UserModel.remove({ _id: res.locals.user._id })
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

function getMyDog (req, res) {
  UserModel.findById(res.locals.user._id)
    .populate('dog')
    .then((response) => res.json(response.dog))
    .catch((err) => handleError(err, res))
}

function getAllRequests (req, res) {
  UserModel.findById(res.locals.user._id)
    .populate('request')
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

function putRequestById (req, res) {
  RequestModel.findByIdAndUpdate(req.params.requestId, req.body, {
    new: true,
    runValidators: true
  })
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

function getRequestById (req, res) {
  RequestModel.findById(req.params.requestId)
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}

function deleteRequestById (req, res) {
  RequestModel.remove({ _id: req.params.requestId })
    .then((response) => res.json(response))
    .catch((err) => handleError(err, res))
}
