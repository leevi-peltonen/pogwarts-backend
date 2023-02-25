const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    passwordHash: String,
    
    weapons: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Weapon"
        }
    ],
    armor: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Armor'
        }
    ],
    
    coins: Number,
    attributes: {
      str: Number,
      dex: Number,
      int: Number
    },
    health: Number,
    availableAttributePoints: Number,
    experience: Number,
    equippedWeapon: { type: mongoose.Schema.Types.ObjectId, ref: "Weapon" },
    equippedArmor: { type: mongoose.Schema.Types.ObjectId, ref: "Armor" },
    highestLevelOfKilledMonsters: Number,
    level: Number
});

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;