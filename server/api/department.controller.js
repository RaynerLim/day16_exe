var retrieveDepartments = function (db) {
    console.log('\nInformation requested from server:')
    return function (req, res) {
        console.log('\nRetrieve Data');
        db.Departments
            .findAll({
                attributes: ['dept_name']
            })
            .then(function(departments){
                res.status(200);
                res.json(departments)
            })
            .catch(function(err) {
        console.log("departmentsDB error clause: " + err);
        res
          .status(500)
          .json(err);
      });
    };
};

// Export route handlers
module.exports = function(db) {
  return {
    retrieveDepartments: retrieveDepartments(db),
  }
};