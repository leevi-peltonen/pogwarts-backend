const inventoryRouter = require('express').Router()
const User = require('../models/user')



// Add weapon to inventory
inventoryRouter.patch('/add-weapon/:userId/:weaponId', async (req, res) => {
  User.updateOne({_id: req.params.userId}, {$push: {'weapons': req.params.weaponId}}, (err,doc) => {
    if (err) return res.status(500)
    return res.json(doc)
  })
})

// Remove weapon from inventory
inventoryRouter.patch('/remove-weapon/:userId/:weaponId', async (req,res) => {
  
  User.findOneAndUpdate(
    {_id: req.params.userId, "weapons.0": req.params.weaponId},
    { "$pop": { "weapons": -1 } },
    { "new": true },
    (err, doc) => {
      if (err) return res.status(500)
      return res.json(doc)
    }
  )
})

// Equip weapon
inventoryRouter.patch('/equip/:userId/:wepId', (req, res) => {

  /*
  let equippedWeapon;
  User.findById(req.params.userId)
  
  .then(res => {
      equippedWeapon = res.equippedWeapon
  })
  .then(() => {
      User.updateOne({_id: req.params.id}, {$set: {equippedWeapon: req.params.wepId}}, (err, docs) => {
      
          if (err) return res.status(500)
          return res.json(equippedWeapon)
      })
  })
  */

  User.updateOne({_id: req.params.userId}, {$set: {equippedWeapon: req.params.wepId}}, (err, doc) => {
      
    if (err) return res.status(500)
    return res.json(doc)
})
})

module.exports = inventoryRouter