
const Employee = require('../app/employeedata')


test('Test an incorrect value in National Insurance Number input', () => {
    const emp = {NationalInsuranceNumber: 'A456a'}
    const result = Employee.validate(emp)
    expect(result).toBe('National insurance number is incorrect')
})

//test('Test the spacing in the National Insurance Number input')

test('Test a correct value in National Insurance Number input', () => {
    const emp = {NationalInsuranceNumber: 'Aa123456a'}
    const result = Employee.validate(emp)
    expect(result).toBe('Salary must be a number')
})


//good, bad, no