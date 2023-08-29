const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "somesecret"
let success = false;

//ROUTE - 1 : CREATE USER using POST "/api/auth/createuser"
router.post('/createuser', [
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleat 5 characters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt();
    const secPass = await bcrypt.hash(req.body.password, salt)

    //Create user
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    });
    const jwtData = {
      user:{
        id: user.id
      }
    }
    const authToken = jwt.sign(jwtData,JWT_SECRET);
    res.json({success: true, authToken});
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ success, error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).send(success, 'Internal server error');
  }
});

//ROUTE - 2 : AUTHENTICATE USER using POST "/api/auth/login"

router.post('/login', [
  body('email','enter a valid email').isEmail(),
  body('password','password cannot be blank').exists()
], async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(400).json({success, errors: errors.array() });
}

const {email, password} = req.body;
try {
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({error: "please login with correct credentials"});
  }

  let passwordCompare = await bcrypt.compare(password, user.password)
  if(!passwordCompare){
    return res.status(400).json({success, error: "please login with correct credentials"});
  }

  const jwtData = {
    user:{
      id: user.id
    }
  }
  const authToken = jwt.sign(jwtData,JWT_SECRET);
  res.json({success: true, authToken});
} catch (error) {
  console.error(error);
    res.status(500).send(success, 'Internal server error');
}
});

//ROUTE - 3 : GET USER using POST "/api/auth/getuser"

router.post('/getuser', fetchuser, async (req, res) => {
try {
  let userID = req.user.id;
  const user = await User.findById(userID).select('-password');
  res.send(success = true, user)

} catch (error) {
  console.error(error);
    res.status(500).send(success, 'Internal server error');
}
});

module.exports = router

