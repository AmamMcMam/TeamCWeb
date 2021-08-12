const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
router.get('/hr', async (req, res) => {
    res.render('hr-main'); 
});

module.exports = router
