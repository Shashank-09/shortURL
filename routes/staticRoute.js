const express = require('express');
const Url = require('../models/url');
const router = express.Router();

router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('/login');
    const allurls = await Url.find({ createdBy : req.user._id });
   return res.render('home' , {
         urls   :  allurls
   });
});

router.get( '/signup' , (req , res) =>{
      res.render('signup');
} )
router.get( '/login' , (req , res) =>{
      res.render('login');
} )

module.exports = router;