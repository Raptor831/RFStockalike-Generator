angular.module('rfstockalikeBase', [])

.controller('RFBaseController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {

    /*
    Globals
     */

    // Notices
    $scope.errors = [];
    $scope.successes = [];

    // Data containers
    $scope.enginesList = [];
    $scope.engines = [];
    $scope.mods = [];
    $scope.types = [];
    $scope.resources = [];
    $scope.mixtures = [];

    // Helpers
    $scope.math = Math;

    if( $scope.mods.length < 1 ) {
        $http.get('/wp-json/wp/v2/engine-mod/?per_page=100')
            .success(function (data) {
                $scope.setMods(data);
            });
    }

    //window.console.log($scope.thrustCurves);

    /*
    Utility Functions
     */

    // Getters/Setters for global data arrays

    $scope.setEngines = function(engines) {
        $scope.engines = engines;
    };

    $scope.setEnginesList = function(engines) {
        $scope.enginesList = engines;
    };

    $scope.setEngine = function(engine) {
        $scope.engine = engine;
    };

    $scope.setMixtures = function(mixtures) {
        $scope.mixtures = mixtures;
    };

    $scope.setMods = function(mods) {
        $scope.mods = mods;
    };

    $scope.setTypes = function(types) {
        $scope.types = types;
    };

    $scope.setResources = function(resources) {
        $scope.resources = resources;
    };

    // Getters for relationships (i.e. get a mixture's fuel object)

    $scope.getFuel = function(mixture) {
        return $scope.getResource(mixture.ksprfs.ksprfs_mixture_fuel);
    };

    $scope.getOxidizer = function(mixture) {
        return $scope.getResource(mixture.ksprfs.ksprfs_mixture_oxidizer);
    };

    $scope.getResource = function(ID) {
        ID = parseInt(ID);
        return $filter('filter')($scope.resources, function (data) {return data.id === ID;})[0];
    };

    $scope.getMixture = function(ID) {
        ID = parseInt(ID);
        return $filter('filter')($scope.mixtures, function (data) {return data.id === ID;})[0];
    };

    $scope.getType = function(ID) {
        ID = parseInt(ID);
        return $filter('filter')($scope.types, function (data) {return data.id === ID;})[0];
    };

    $scope.getTypeBySlug = function(slug) {
        return $filter('filter')($scope.types, function (data) {return data.slug === slug;})[0];
    };

    $scope.getSingleEngine = function (id) {
        return $filter('filter')($scope.engines, function (data) {return parseInt(data.id) === parseInt(id);})[0];
    };

}]);
