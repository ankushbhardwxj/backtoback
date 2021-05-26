const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const db = require('../models');

/* signup user */
router.post('/signup', (req, res) => {
  const userData = new db.user({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
    sex: req.body.sex,
    mail: req.body.email,
    password: req.body.password,
    phNo: req.body.phno
  });
  userData.save()
    .then(resData => {
      console.log(resData);
      res.status(200).json({message: 'User signup successful'});
    })
    .catch(err => console.log(err));
});

/* signin user */
router.post('/signin', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.user.findOne({mail: req.body.email})
    .then(userData => {
      if (userData.password == password) 
        res.status(200).json({ message: 'Signin successful' });
      else res.status(501).json({ message: 'Password doesnt match' });
    })
    .catch(err => console.log(err));
});

module.exports = router;
