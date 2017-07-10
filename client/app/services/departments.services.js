// Always use an IIFE, i.e., (function() {})();
(function () {
    // Attaches DeptService service to the DMS module
    angular
        .module("ES")
        .service("DService", DService);

    // Dependency injection. Here we inject $http because we need this built-in service to communicate with the server
    // There are different ways to inject dependencies; $inject is minification safe
    DService.$inject = ['$http'];

    // DeptService function declaration
    // Accepts the injected dependency as a parameter. We name it $http for consistency, but you may assign any name
    function DService($http) {

        // Declares the var service and assigns it the object this (in this case, the DeptService). Any function or
        // variable that you attach to service will be exposed to callers of DeptService, e.g., search.controller.js
        // and register.controller.js
        var service = this;

        // EXPOSED FUNCTIONS -------------------------------------------------------------------------------------------
        // TODO: 3.2 Expose retrieveDepartments function
        service.retrieveDept = retrieveDept;

        // FUNCTION DECLARATION AND DEFINITION -------------------------------------------------------------------------
        // TODO: 3.1 Create function that would retrieve departments
        function retrieveDept() {
            return $http({
                method: 'GET'
                , url: 'api/departments'
            });
        }
    }
})();