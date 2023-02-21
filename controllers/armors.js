const armorsRouter = require('express').Router()
const Armor = require('../models/armor')

armorsRouter.post('/', async (req,res) => {
  const body = req.body

  const armor = new Armor({
    name: body.name,
    defense: body.defense,
    price: body.price,
    rarity: body.rarity,
    description: body.description
  })

  const savedArmor = await armor.save()

  res.json(savedArmor)
})

module.exports = armorsRouter