const express = require('express');
const { User, Country, State, City } = require('../model/user-model');
const router = express.Router();

//Api Endpoints
router.get('/countries', async (req, res) => {
    try {
        const countries = await Country.find({});
        res.json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries' });
    }
});
router.get('/states', async (req, res) => {
   const country = await Country.findOne({ name:
    req.query.countryName });
   const states = await State.find({ country: country._id });
    res.json(states);
})

router.get('/cities', async (req, res) => {
    const state = await State.findOne({ name:req.query.state});
    const cities = await City.find({ state: state._id });
    res.json(cities);
});


router.post('/check-username', async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username: username })
        res.json({available: !user});
    } catch (error) {
        res.status(500).json({ message: 'Error checking username' });
    }
});

router.post('/save-profile', async (req, res) => {
    try {
        const errors ={};
        if(!req.body.profilePhoto) {
            errors.profilePhoto = 'Profile photo is required';
        }
        if(!req.body.username) {
            errors.username = 'Username is required';
        }
        if(Object.keys(errors).length > 0) {
            return res.status(400).json({ errors });
        }

        const userData = { ...req.body };
    if (userData.newPassword) {
      userData.password = userData.newPassword; // In real router, hash password
    }
    
    await User.findOneAndUpdate(
      { username: req.body.username },
      userData,
      { upsert: true, new: true }
    );
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  } 
});


// Export the router
module.exports = router;