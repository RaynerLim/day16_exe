(function() {
    angular
        .module("ES")         
        .controller("RegCon", RegCon);    
   
      RegCon.$inject = [ "$window", "EService", 'DService'];

    function RegCon( $window, EService, DService) {
        var regCon = this;

        // Exposed data models ---------------------------------------------------------------------------------------
        // Creates an employee object that
        // We expose the employee object by attaching it to the regCon
        // This will allow us apply two-way data-binding to this object by using ng-model in our view (i.e., index.html)
        regCon.employee = {
            empNo: "",
            firstname: "",
            lastname: "",
            gender: "M",
            birthday: "",
            hiredate: "",
            phonenumber: "",
            department: ""
        };

        // Creates a status object. We will use this to display appropriate success or error messages.
        regCon.status = {
            message: "",
            code: ""
        };

        regCon.register = register;

        initDepartmentBox();

        function initDepartmentBox(){
            DService
                .retrieveDept()
                .then (function(results) {  
                    console.log(JSON.stringify(results.data));
                    regCon.departments = results.data;
                })
                .catch(function(err){
                    console.log("error " + JSON.stringify(err));
                    regCon.status.code = err.data.parent.errno;
                });
        }

          function register() {
            // Calls alert box and displays registration information
            alert("The registration information you sent are \n" + JSON.stringify(regCon.employee));

            // Prints registration information onto the client console
            console.log("The registration information you sent were:");
            console.log("Employee Number: " + regCon.employee.empNo);
            console.log("Employee First Name: " + regCon.employee.firstname);
            console.log("Employee Last Name: " + regCon.employee.lastname);
            console.log("Employee Gender: " + regCon.employee.gender);
            console.log("Employee Birthday: " + regCon.employee.birthday);
            console.log("Employee Hire Date: " + regCon.employee.hiredate);
            console.log("Employee Phone Number: " + regCon.employee.phonenumber);
            console.log("Employee Department name: " + String(regCon.employee.department));


            // We call EmpService.insertEmp to handle registration of employee information. The data sent to this
            // function will eventually be inserted into the database.
            EService
                .insertEmp(regCon.employee)
                .then(function (result) {
                    console.log("result " + JSON.stringify(result));
                    $window.location.assign('/app/register/thanks.html');
                })
                .catch(function (err) {
                    console.log("error " + JSON.stringify(err));
                    regCon.status.message = err.data.name;
                    regCon.status.code = err.data.parent.errno;
                });

        } // END function register()
    } // END RegCon
})();