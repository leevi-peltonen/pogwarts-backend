import { Schema, model } from 'mongoose';
import { IArmor } from '../models/armor'

const armorSchema = new Schema <IArmor> ({
  name: String,
  defense: Number,
  price: Number,
  rarity: String,
  description: String
})

export const Armor = model <IArmor> ('Armor', armorSchema);
