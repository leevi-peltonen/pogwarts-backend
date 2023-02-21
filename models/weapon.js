const mongoose = require('mongoose');

const weaponSchema = new mongoose.Schema({
  name: String,
  damage: Number,
  price: Number,
  rarity: String,
  description: String
})

const Weapon = mongoose.model('Weapon', weaponSchema);

module.exports = Weapon;