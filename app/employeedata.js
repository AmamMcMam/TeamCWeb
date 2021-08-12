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
        "SELECT EmployeeID, Name, Department, Address, NIN, Salary, IsDepartmentManager"
        + " FROM Rachel_Database", 
        ) 
 }

 getEmployeesByDepartment = async ( departmentName ) => { 
    return await db.query( 
        "SELECT EmployeeID, Name, Department, Address, NIN, Salary, IsDepartmentManager"
        + " FROM Rachel_Database WHERE departmentName = ?", 
                            [departmentName]) 
 }
 

 exports.getEmployees = async () => getEmployees()

 exports.getEmployeesByDept = async () => getEmployeesByDepartment('HR')
