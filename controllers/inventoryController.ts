import express, { Request, Response } from 'express';
import { validateMongooseId } from '../utils/utils';
import { User } from '../dbmodels/user';

export const inventoryController = express.Router();

// Add weapon to inventory
inventoryController.patch('/add-weapon/:userId/:weaponId', async (req: Request, res: Response) => {
  if ((!validateMongooseId(req.params.userId)) || (!validateMongooseId(req.params.weaponId))) {
    return res.status(404).send('Not a valid mongoose id!');
  }
  const response = await User.updateOne({_id: req.params.userId}, {$push: {'weapons': req.params.weaponId}});
  res.send(response);
})

// Remove weapon from inventory
inventoryController.patch('/remove-weapon/:userId/:weaponId', async (req,res) => {
  
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
/*
// Equip weapon
inventoryController.patch('/equip/:userId/:wepId', (req, res) => {

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
  

  User.updateOne({_id: req.params.userId}, {$set: {equippedWeapon: req.params.wepId}}, (err, doc) => {
      
    if (err) return res.status(500)
    return res.json(doc)
  })
})

*/