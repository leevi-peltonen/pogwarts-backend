const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Weapon = require('../models/weapon')
const jwt = require('jsonwebtoken')
// create user
usersRouter.post('/', async (req, res) => {
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
    console.log(savedUser)
    res.json(savedUser);
});

// login

usersRouter.post('/login', async (req, res) => {
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

    res
        .status(200)
        .send({
            user,
            token
        })
})




// get equipped weapon

usersRouter.get('/:userId/equipped-weapon', (req, res) => {
    User.findById(req.params.userId)
    .then(data => {
        Weapon.findById(data.equippedWeapon, (err, docs) => {
            if(err) return res.status(500)
            return res.json(docs)
        })
    })
})



/*
  Weapon.findById(req.params.id, (err, docs) => {
    if (err) return res.status(500)
    return res.json(docs)
    */





// get user by username
usersRouter.get('/:username', (req, res) => {
    User.find({ username: req.params.username})
    .then((data) => {
        res.json(data)
    })
    
})


// get all users
usersRouter.get('/', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

//update coins by id
usersRouter.patch('/:id/coins', (req,res) => {
    User.findByIdAndUpdate(req.params.id, {coins: req.body.coins}, (err, doc) => {
        if (err) return res.status(500)
        return res.json(doc)
    })
})

module.exports = usersRouter;