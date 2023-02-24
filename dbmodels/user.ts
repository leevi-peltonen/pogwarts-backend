const uniqueValidator = require('mongoose-unique-validator');
import { IUser } from '../models/user';
import { Schema, model} from 'mongoose'; 

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true
    },
    passwordHash: String,
    
    weapons: [
        {
          type: Schema.Types.ObjectId,
          ref: "Weapon"
        }
    ],
    // armor: [
    //     {
    //       type: Schema.Types.ObjectId,
    //       ref: 'Armor'
    //     }
    // ]
    
    coins: Number,
    attributes: {
      str: Number,
      dex: Number,
      int: Number
    },
    health: Number,
    availableAttributePoints: Number,
    experiencePoints: Number,
    equippedWeapon: { type: Schema.Types.ObjectId, ref: "Weapon" },
    //equippedArmor: { type: Schema.Types.ObjectId, ref: "Armor" },
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

export const User = model<IUser>('User', userSchema);