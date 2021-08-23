const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const RestaurantSeed = require('../../restaurants.json')

//setup database
mongoose.connect('mongodb://localhost/restaurants-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error!')
})
db.once('open', () => {
RestaurantSeed.results.forEach(item => { 
    Restaurant.create({ 
        name: item.name,
        name_en: item.name,
        category: item.category,
        image: item.image,
        location: item.location,
        phone: item.phone,
        google_map: item.google_map,
        rating: item.rating,
        description: item.description,

    })
  })
})

