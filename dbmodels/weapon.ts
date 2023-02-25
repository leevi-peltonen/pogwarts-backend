import { Schema, model} from 'mongoose'; 
import { IWeapon } from '../models/weapon';

const weaponSchema = new Schema<IWeapon>({
  name: String,
  damage: Number,
  price: Number,
  rarity: String,
  description: String
})

export const Weapon = model<IWeapon>('Weapon', weaponSchema);
