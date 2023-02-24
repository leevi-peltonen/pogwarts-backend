import { Schema, model} from 'mongoose'; 
import { IEnemy } from '../models/enemy';

const enemySchema = new Schema<IEnemy>({
  name: String,
  level: Number,
  health: Number,
  attack: Number,
  defense: Number,
  isAlive: Boolean
})

export const Enemy = model<IEnemy>('Enemy', enemySchema);