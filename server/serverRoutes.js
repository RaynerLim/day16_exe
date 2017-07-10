// Handles API routes
module.exports = function(app, db) {
  var Employees = require("./api/employee.controller")(db);

  var Departments = require("./api/department.controller")(db);

  // Create new Employee
  app.post("/api/employees", Employees.createEmployee);

  //Retrieve all departments
  app.get("/api/departments", Departments.retrieveDepartments);

};