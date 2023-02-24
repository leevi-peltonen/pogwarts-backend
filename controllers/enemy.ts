import express, { Request, Response } from 'express';
import { Enemy } from '../dbmodels/enemy';
import { validateMongooseId } from '../utils/utils';

export const enemyController = express.Router();

// get enemy by id
enemyController.get('/id/:enemyId', async (req: Request, res: Response) => {
  if (!validateMongooseId(req.params.enemyId)) {
    return res.send('Not a valid mongoose id!');
  }
  const enemy = await Enemy.findById(req.params.enemyId);
  if (enemy) {
    return res.json(enemy);
  } else {
    return res.status(404).send('Enemy not found!');
  }
})

//get enemy by name
enemyController.post('/name', async (req: Request, res: Response) => {
  const body = req.body
  const enemy = await Enemy.findOne({name: body.name});
  if (enemy) {
    return res.json(enemy);
  } else {
    return res.status(404).send('Enemy not found!');
  }
})

//get all enemies
enemyController.get('/', async (req: Request, res: Response) => {
  const enemies = await Enemy.find()
  if (enemies) {
    res.json(enemies)
  } else {
    return res.status(404).send('No enemies found!');
  }
  
})