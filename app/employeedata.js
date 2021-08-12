const mysql = require('mysql'); 
const dbconfig = require('./dbconfig.json'); 
const util = require ('util')


const db = wrapDB(dbconfig)

function wrapDB (dbconfig) { 
    const pool = mysql.createPool(dbconfig) 
    return { 
        query(sql, args) { 
            console.log("in query in wrapper") 
            return util.promisify( pool.query ) 
            .call(pool, sql, args) 
        }, 
        release () { 
            return util.promisify( pool.releaseConnection ) 
            .call( pool ) 
        } 
    } 
 }

 getEmployees = async () => { 
    return await db.query( 
        "SELECT EmployeeID, Name, Department"
        + " FROM kart_Rachel.Employee ORDER BY Department", 
        //change when schema is available
        ) 
 }

 getEmployeesByDepartment = async ( departmentName ) => { 
    return await db.query( 
        "SELECT EmployeeID, Name, Department, Address, NIN, Salary, IsDepartmentManager"
        + " FROM Rachel_Database WHERE departmentName = ?", 
                            [departmentName]) 
 }

 exports.getEmployee = async (id) => {
     return await db.query(
         "SELECT Name, Department"
     + " FROM kart_Rachel.Employee WHERE NationalInsuranceNumber = ?", 
                        [id]
     )
 }

 exports.validate = (employee) => {
    if(employee.NationalInsuranceNumber.search(/^\s*[a-zA-Z]{2}(?:\s*\d\s*){6}[a-zA-Z]?\s*$/)){
       return "National insurance number is incorrect";
    }

    if(employee.Salary < 7740){
        return "Salary cannot be below 7740"
    }

    if(isNaN(employee.Salary)){
        return "Salary must be a number"
    }
  }

 exports.addEmployee = async (newEmployee) => {
    let results = await db.query("INSERT INTO kart_Rachel.Employee SET ?", 
                [newEmployee])
    return results.insertId; 

}
 

 exports.getEmployees = async () => getEmployees()

 exports.getEmployeesByDept = async () => getEmployeesByDepartment('HR')

