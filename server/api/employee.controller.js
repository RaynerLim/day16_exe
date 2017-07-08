var createEmployee = function(db){
    console.log('\nInformation submitted to server:')
    return function(req,res){
        console.log(req.body);
        console.log('\nData Submitted');
            db.Employees
         .create({
             emp_no: req.body.emp.empNo,
             birth_date: new Date(req.body.emp.birthday),
             first_name: req.body.emp.firstname,
             last_name: req.body.emp.lastname,
             gender: req.body.emp.gender,
             hire_date: new Date(req.body.emp.hiredate)
         })
         .then(function (employees) {
             res
                 .status(200)
                 .json(employees);
         })
         .catch(function (err) {
             console.log(err);
             res
                 .status(501)
                 .json(err);
         });
/*
    sequelize
        .transaction(function (t) {
            
            return Employees
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
                .then(function (employees) {
                    console.log("inner result " + JSON.stringify(employees))
                    return Department
                        .create(
                            {
                                dept_no: req.body.emp.dept_no
                                , dept_name: req.body.emp.dept_name
                            }
                            , {transaction: t});
                });
        })
        .then(function (employees) {
            res
                .status(200)
                .json(employees);
        })
        .catch(function (err) {
            console.log(err);
            res
                .status(501)
                .json(err);
        });*/
    };
};

// Export route handlers
module.exports = function(db) {
  return {
    createEmployee: createEmployee(db),
  }
};