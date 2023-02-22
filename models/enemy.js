const mongoose = require('mongoose');


const enemySchema = new mongoose.Schema({
  name: String,
  level: Number,
  health: Number,
  attack: Number,
  defense: Number,
  isAlive: Boolean
})

const Enemy = mongoose.model('Enemy', enemySchema);
module.exports = Enemy;