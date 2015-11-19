var rfsApp = angular.module( 'rfsApp', ['ui.router', 'rfstockalikeControllers'] );

rfsApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){

    $urlRouterProvider.otherwise('/home');


    $stateProvider
        .state('tabs', {
            url: '/',
            abstract: true,
            templateUrl: RFS.partials + 'tabs.html',
            controller: 'RFBaseController'
        })
        .state('tabs.home', {
            url: 'home',
            views: {
                'main-tab' : {
                    templateUrl: RFS.partials + 'home.html',
                    //controller: 'RFEngineListController'
                }
            }
        })
        .state('tabs.engines', {
            url: 'engines',
            views: {
                'main-tab' : {
                    templateUrl: RFS.partials + 'engine-list.html',
                    controller: 'RFEngineListController'
                }
            }
        })
        .state('tabs.singleEngine', {
            url: 'engines/:id',
            views: {
                'main-tab': {
                    templateUrl: RFS.partials + 'engine-single.html',
                    controller: 'RFEngineController'
                }
            }
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
