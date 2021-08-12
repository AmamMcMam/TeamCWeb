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

router.get('/hr/add-employee', async (req, res) => {
    res.render('new-employee');
});
    
router.post('/hr/add-employee', async (req, res) => {
    
    var employee = req.body
    console.log(employee)
    var errormessage = employeeData.validate(employee);
    console.log(errormessage)
    if(errormessage){
      res.locals.errormessage = errormessage
      res.render('new-employee', employee ) 
    } else {
        let employeeID = await employeeData.addEmployee(employee)
        var resultArray = Object.values(JSON.parse(JSON.stringify(await employeeData.getEmployee(employeeID))))
        res.render('confirmation', { employee: resultArray })
    }
    
})


module.exports = router


