const weaponsRouter = require('express').Router()
const Weapon = require('../models/weapon')

weaponsRouter.post('/', async (req,res) => {
  const body = req.body

  const weapon = new Weapon({
    name: body.name,
    damage: body.damage,
    price: body.price,
    rarity: body.rarity,
    description: body.description
  })

  const savedWeapon = await weapon.save()

  res.json(savedWeapon)
})

//get weapon by id
weaponsRouter.get('/:id', (req, res) => {
  Weapon.findById(req.params.id, (err, docs) => {
    if (err) return res.status(500)
    return res.json(docs)
  })
})
/*
//get weapon by name
weaponsRouter.get('/name', (req, res) => {
  const body = req.body
  Weapon.findOne({name: body.name})
  .then(data => {
    res.json(data)
  })
  .catch(err => console.log(err))
})
*/

module.exports = weaponsRouter