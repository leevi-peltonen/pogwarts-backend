import express, { Request, Response } from 'express';
import { validateMongooseId } from '../utils/utils';
import { Weapon } from '../dbmodels/weapon';

export const weaponController = express.Router();

weaponController.post('/', async (req: Request, res: Response) => {
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
});

//get weapon by id
weaponController.get('/:id', async (req: Request, res: Response) => {
  if (!validateMongooseId(req.params.id)) {
    return res.status(404).send('Not a valid Mongoose id!');
  }
  const weapon = await Weapon.findById(req.params.id);
  if (weapon) {
    return res.json(weapon);
  }
});

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
