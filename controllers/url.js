const shortId  = require('shortid');
const Url = require('../models/url');
const shortid = require('shortid');

async function handleGenerateShortURL(req , res) {
    const body = req.body;
    console.log(body);
    if(!body.url) return res.status(400).json({message: "Url is required"});

    const shortId = shortid();
    await Url.create({
        shortId : shortId,
        redirectUrl : body.url,
        visitHistory : [],
        createdBy : req.user._id
    })

    return res.render('home', {id : shortId});
}

async function handleGetAnalytics(req , res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({shortId});

    return res.json({ totalClicks : result.visitHistory.length, 
                      visitHistory : result.visitHistory
                    });
}


module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics
}