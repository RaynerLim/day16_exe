// Dependencies -------------------------------------------------------------------------------------------------------
// Loads express module and assigns it to a var called express
var express = require('express');

// Loads path to access helper functions for working with files and directory paths
var path = require("path");

// Loads bodyParser to populate and parse the body property of the request object
var bodyParser = require("body-parser");

// Loads sequelize ORM
var Sequelize = require("sequelize");

// Creates an instance of express called app
var app = express();

// Constants  ---------------------------------------------------------------------------------------------------------
// Defines server port.
// Value of NODE_PORT is taken from the user environment if defined; port 3000 is used otherwise.
const NODE_PORT = process.env.NODE_PORT || 8080;

// Paths --------------------------------------------------------------------------------------------------------------
// __dirname is a global that holds the directory name of the current module
// CLIENT FOLDER is the public directory
const CLIENT_FOLDER = path.join(__dirname + "/../client");
//Message Folder for error pages
const MSG_FOLDER = path.join(CLIENT_FOLDER + "/assets/messages");

const MYSQL_USERNAME = "root";
const MYSQL_PASSWORD = "root";

// Middlewares  -------------------------------------------------------------------------------------------------------
app.use(express.static(CLIENT_FOLDER));

// DBs, MODELS, and ASSOCIATIONS ---------------------------------------------------------------------------------------
// Creates a MySQL connection
var conn = new Sequelize(
    "employees",MYSQL_USERNAME,MYSQL_PASSWORD,{
        host:"localhost",
        logging: console.log,
        dialect: "mysql",
        pool:{
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

var Employee = require('./models/employees')(conn, Sequelize);

app.post("/api/employees", function (req, res, next) {
    // Information sent via an HTTP POST is found in req.body
    console.log('\nInformation submitted to server:')
    console.log(req.body);

    // Employee
    //     .create({
    //         emp_no: req.body.emp.empNo,
    //         birth_date: new Date(req.body.emp.birthday),
    //         first_name: req.body.emp.firstname,
    //         last_name: req.body.emp.lastname,
    //         gender: req.body.emp.gender,
    //         hire_date: new Date(req.body.emp.hiredate)
    //     })
    //     .then(function (employee) {
    //         res
    //             .status(200)
    //             .json(employee);
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //         res
    //             .status(501)
    //             .json(err);
    //     });

    sequelize
        .transaction(function (t) {
            return Employee
                .create(
                    {
                        emp_no: req.body.emp.empNo,
                        birth_date: new Date(req.body.emp.birthday),
                        first_name: req.body.emp.firstname,
                        last_name: req.body.emp.lastname,
                        gender: req.body.emp.gender,
                        hire_date: new Date(req.body.emp.hiredate)
                    }
                    , {transaction: t})
                .then(function (employee) {
                    console.log("inner result " + JSON.stringify(employee))
                    return Department
                        .create(
                            {
                                dept_no: req.body.emp.dept_no
                                , dept_name: req.body.emp.dept_name
                            }
                            , {transaction: t});
                });
        })
        .then(function (employee) {
            res
                .status(200)
                .json(employee);
        })
        .catch(function (err) {
            console.log(err);
            res
                .status(501)
                .json(err);
        });
});
// Modularization of server files. Use require to import the files into app.js
//require("./route")(app);



// Error Handling  ----------------------------------------------------------------------------------------------------
// Handles 404. In Express, 404 responses are not the result of an error, 
// so the error-handler middleware will not capture them.
// To handle a 404 response, add a middleware function at the very bottom of the stack
// (below all other path handlers)
app.use (function (req, res) {
    res.status(404);
    res.sendFile(path.join(MSG_FOLDER + "/404.html"));
});

app.use (function (req, res) {
    res.status(500);
    res.sendFile(path.join(MSG_FOLDER + "/500.html"));
});

// Start server  -------------------------------------------------------------------------------------------------------
// Server starts and listens on NODE_PORT
app.listen(NODE_PORT, function() {
    console.log("Server running at http://localhost:" + NODE_PORT);
});