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

weaponsRouter.get('/random', (req, res) => {
  console.log('HALOO')
  Weapon.aggregate([{ $sample: { size: 1 } }])
  .exec((err, result) => {
    if (err) {
      res.status(500)
    } else {
      const randomWeapon = result[0];
      res.json(randomWeapon)
    }
  });
})


//get weapon by id
weaponsRouter.get('/:id', (req, res) => {
  Weapon.findById(req.params.id, (err, docs) => {
    if (err) return res.status(500)
    return res.json(docs)
  })
})

//get weapon by name
weaponsRouter.post('/name', (req, res) => {
  const body = req.body
  Weapon.findOne({name: body.name}, (err, docs) => {
    if (err) return res.status(500)
    return res.json(docs)
  })
})

module.exports = weaponsRouter