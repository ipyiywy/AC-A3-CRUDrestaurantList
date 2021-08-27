const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

// show all the data in index page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

module.exports = router
