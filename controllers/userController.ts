const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
import { User } from '../dbmodels/user'
import { Weapon } from '../dbmodels/weapon'
import express, { Request, Response } from 'express'
import { validateMongooseId } from '../utils/utils'

export const userController = express.Router();

//Register
userController.post('/', async (req: Request, res: Response) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        coins: body.coins,
        weapons: body.weapons,
        armor: body.armor,
        passwordHash,
        attributes: body.attributes,
        health: body.health,
        availableAttributePoints: body.availableAttributePoints,
        experiencePoints: body.experiencePoints,
        equippedWeapon: body.equippedWeapon,
        equippedArmor: body.equippedArmor,
        highestLevelOfKilledMonsters: body.highestLevelOfKilledMonsters,
        level: body.level
    });

    const savedUser = await user.save();
    return res.json(savedUser);
});

//Login
userController.post('/login', async (req: Request, res: Response) => {
    const body = req.body
    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    //token expires in one hour
    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        { expiresIn: 60 * 60 }
    )

    return res
        .status(200)
        .send({
            user,
            token
        })
})

//Get users
userController.get('/', async (req: Request, res: Response) => {
    const users = await User.find()
    res.json(users)
})

//Get by username
userController.get('/:username', (req: Request, res: Response) => {
    User.find({ username: req.params.username})
    .then((data) => {
        res.json(data)
    })
    
})

//Get equipped weapon
userController.get('/equippedweapon/:id', async (req: Request, res: Response) => {
    if (!validateMongooseId(req.params.id)){
       return res.status(404).send('Not a valid mongoose id!');
    }
    const user = await User.findById(req.params.id);
    if (user) {
        const equippedWeapon = await Weapon.findById(user.equippedWeapon);
        if (equippedWeapon) {
            res.json(equippedWeapon);
        } else {
            res.status(404).send('Equipped weapon not found!');
        }
    } else {
        res.status(404).send('User not found!');
    }
})

//Update coins by id
userController.patch('/:id/coins', (req:Request, res: Response) => {
    User.findByIdAndUpdate(req.params.id, {coins: req.body.coins}, (err, doc) => {
        if (err) return res.status(500)
        return res.json(doc)
    })
})
