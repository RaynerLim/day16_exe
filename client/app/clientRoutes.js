//IIEF--Immediately-invoked function expression
(function(){
    angular
        .module("ES")
        .config(clientRoutes)
    clientRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

    function clientRoutes($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("register", {
                url: "/register",
                templateUrl: "./app/register/register.html"
            })
    }
})();