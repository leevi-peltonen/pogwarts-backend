const mongoose = require('mongoose');

const armorSchema = new mongoose.Schema({
  name: String,
  defense: Number,
  price: Number,
  rarity: String,
  description: String
})

const Armor = mongoose.model('Armor', armorSchema);

module.exports = Armor;