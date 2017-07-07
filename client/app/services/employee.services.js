(function(){
    angular
        .module("ES")
        .service("EService", EService);

        EService.$inject = ["$http"];

        function EService($http){
            var service = this;

             service.insertEmp = insertEmp;
        }

        // insertEmp uses HTTP POST to send employee information to the server's /employees route
        // Parameters: employee information; Returns: Promise object
        function insertEmp(employee) {
            // This line returns the $http to the calling function
            // This configuration specifies that $http must send the employee data received from the calling function
            // to the /employees route using the HTTP POST method. $http returns a promise object. In this instance
            // the promise object is returned to the calling function
            return $http({
                method: 'POST'
                , url: 'api/employees'
                , data: {emp: employee}
            });
        }
})();