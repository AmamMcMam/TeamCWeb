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

router.get('/add-employee', async (req, res) => {
    res.render('newemployee');
});
    
router.post('/add-employee', async (req, res) => {
    
    var employee = req.body
    console.log(employee)
    var errormessage = employeeData.validate(employee);
    console.log(errormessage)
    if(errormessage){
      res.locals.errormessage = errormessage
      res.render('newEmployee', employee ) 
    } else {
        await employeeData.addEmployee(employee)
        // console.log(employee.NationalInsuranceNumber)

        // console.log(await employeeData.getEmployee(employee.NationalInsuranceNumber))

        // res.render('confirmation', { employee: await employeeData.getEmployee(employee.NationalInsuranceNumber)} )
        res.render('hr-generate-report', {employees: await employeeData.getEmployees()}); 
    }
    
})


module.exports = router


