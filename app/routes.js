const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

module.exports = router
router.get('/addemployee', async (req, res) => {
    res.render('newemployee');
});

router.post('/addcity', async (req, res) => {
        let insertedKey = await citydata.addCity(req.body)
        res.render('list-cities', { cities: await citydata.getCities()} )
})