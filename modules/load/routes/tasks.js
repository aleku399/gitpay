const express = require('express')
const router = express.Router()
const authenticationHelpers = require('../../authenticationHelpers')
const controllers = require('../controllers/task')
const secure = require('./secure')

router.get('/fetch/:id', controllers.fetchTask)
router.get('/:id/sync/:field', controllers.syncTask)
router.get('/list', controllers.listTasks)

router.use(secure)
router.post('/create', controllers.createTask)
router.put('/update', controllers.updateTask)
router.post('/payments', controllers.paymentTask)

module.exports = router
