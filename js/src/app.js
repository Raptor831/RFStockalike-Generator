var rfsApp = angular.module( 'rfsApp', ['ui.router', 'rfstockalikeControllers'] );

rfsApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouteProvider){

    window.console.log(RFS.partials);

    $locationProvider.html5Mode(true);



    $stateProvider
        .state('home', {
            url: '/app',
            templateUrl: RFS.partials + 'tabs.html'
        })
        .state('home.content', {
            url: '/content',
            template: '<article>This is my content for the state.</article>'
        });

    $urlRouteProvider.otherwise('/app');


}]);
