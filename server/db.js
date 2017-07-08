// Read configurations
var config = require('./config');

// Loads sequelize ORM
var Sequelize = require("sequelize");

// Create Sequelize DB connection
var sequelize = new Sequelize(
	'employees',
	config.MYSQL_USERNAME,
	config.MYSQL_PASSWORD,
	{
		host: config.MYSQL_HOSTNAME,
		port: config.MYSQL_PORT,
		logging: config.MYSQL_LOGGING,
		dialect: 'mysql',
		pool: {
			max: 5,
			min: 0,
			idle: 10000,
		},
	}
);

const Employees = sequelize.import('./models/employees');

/*
// Define Model Associations
Department.hasMany(DeptManager, { foreignKey: 'dept_no' });
DeptManager.belongsTo(Employee, { foreignKey: 'emp_no' });
*/


// Exports Models
module.exports = {
  // Loads model for employees table
  Employees: Employees

};