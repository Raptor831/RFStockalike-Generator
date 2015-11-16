var rfsApp = angular.module( 'rfsApp', ['ui.router', 'rfstockalikeControllers'] );

rfsApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){

    $urlRouterProvider.otherwise('/');


    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: RFS.partials + 'tabs.html'
        })
        .state('engines', {
            url: '/engines',
            templateUrl: RFS.partials + 'home.html',
            controller: 'RFEngineListController'
        });

    //$urlRouteProvider.otherwise('/');

    $httpProvider.interceptors.push([function() {
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                //add nonce to avoid CSRF issues
                config.headers['X-WP-Nonce'] = RFS.nonce;

                return config;
            }
        };
    }]);

}]);
