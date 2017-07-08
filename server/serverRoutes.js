// Handles API routes
module.exports = function(app, db) {
  var Employees = require("./api/employee.controller")(db);

  // Create new Employee
  app.post("/api/employees", Employees.createEmployee);

};