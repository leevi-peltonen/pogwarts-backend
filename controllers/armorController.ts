import express, { Request, Response } from 'express';
import { Armor } from '../dbmodels/armor';

export const armorController = express.Router();

armorController.post('/', async (req: Request, res: Response) => {
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