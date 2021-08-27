const Restaurant = require('../restaurant')
const RestaurantSeed = require('../../restaurants.json')

const db = require('../../config/mongoose')

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
      description: item.description

    })
  })
})
