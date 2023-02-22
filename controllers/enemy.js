const enemyRouter = require('express').Router()
const Enemy = require('../models/enemy')

// get enemy by id
enemyRouter.get('/id/:enemyId', async (req, res) => {
  Enemy.findById(req.params.enemyId, (err, doc) => {
    if (err) return res.status(500)
    return res.json(doc)
  })
})

//get enemy by name
enemyRouter.post('/name', async (req, res) => {
  const body = req.body
  Enemy.findOne({name: body.name}, (err, doc) => {
    if (err) return res.status(500)
    return res.json(doc)
  })
})

//get all enemies
enemyRouter.get('/', async (req,res) => {
  const enemies = await Enemy.find()
  res.json(enemies)
})


module.exports = enemyRouter