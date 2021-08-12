const express = require('express')
const router = express.Router()
const employeeData = require('./employeedata.js')


// Add your routes here - above the module.exports line
router.get('/hr', async (req, res) => {
    res.render('hr-main'); 
});

router.get('/hr/generate-report', async (req, res) => {
    res.render('hr-generate-report', {employees: await employeeData.getEmployees()}); 
});


module.exports = router


