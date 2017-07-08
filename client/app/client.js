//IIEF--Immediately-invoked function expression
(function() {
    // Creates a new module
    // When setting (creating) an angular module, you need to specify the second argument ([ ])
    // Without this argument, we are telling Angular that what we want to do is to get an already existing module
    angular
        .module("ES", [
            "ui.router" // ui-router is a client-side Single Page Application routing framework for AngularJS
        ]);
})();