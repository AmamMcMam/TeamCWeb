const mysql = require('mysql'); 
const dbconfig = require('./dbconfig.json'); 

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
        + " FROM Rachel_Database", 
        //change when schema is available
        ) 
 }

 getEmployeesByDepartment = async ( departmentName ) => { 
    return await db.query( 
        "SELECT EmployeeID, Name, Department"
        + " FROM Rachel_Database WHERE departmentName = ?", 
        //change when schema is available
                            [departmentName]) 
 }
 

 exports.getEmployees = async () => getEmployees()

 exports.getEmployeesByDept = async () => getEmployeesByDepartment('HR')
