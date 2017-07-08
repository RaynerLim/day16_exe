// Always use an IIFE, i.e., (function() {})();
(function () {
    // Attaches EmpService service to the EMS module
    angular
        .module("ES")
        .service("EService", EService);

    // Dependency injection. Here we inject $http because we need this built-in service to communicate with the server
    // There are different ways to inject dependencies; $inject is minification safe
    EService.$inject = ['$http'];

    // EmpService function declaration
    // Accepts the injected dependency as a parameter. We name it $http for consistency, but you may assign any name
    function EService($http) {

        // Declares the var service and assigns it the object this (in this case, the EmpService). Any function or
        // variable that you attach to service will be exposed to callers of EmpService, e.g., search.controller.js
        // and register.controller.js
        var service = this;

        // EXPOSED DATA MODELS -----------------------------------------------------------------------------------------
        // EXPOSED FUNCTIONS -------------------------------------------------------------------------------------------
        service.insertEmp = insertEmp;
		
        // FUNCTION DECLARATION AND DEFINITION -------------------------------------------------------------------------
        // insertEmp uses HTTP POST to send employee information to the server's /employees route
        // Parameters: employee information; Returns: Promise object
        function insertEmp(employee) {
            console.log("aaaaaaaaaaaaaaaaaa")
            return $http({
                method: 'POST'
                , url: 'api/employees'
                , data: {emp: employee}
            });
        }

    }
})();