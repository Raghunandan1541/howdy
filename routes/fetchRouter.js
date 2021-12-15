const router = require('express').Router()
const fetchCtrl = require('../controllers/fetchCtrl')

router.get('/users', fetchCtrl.getUsers)


module.exports = router