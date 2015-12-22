angular.module('rfstockalikeEngines', ['rfstockalikeServices', 'ngSanitize'])

.controller('RFEngineController', ['$scope', '$http', '$q', '$filter', '$stateParams', 'rfengineServices', 'rfstockalikeConstants', function ($scope, $http, $q, $filter, $stateParams, rfengineServices, rfstockalikeConstants) {

    $scope.constants = rfstockalikeConstants;

    $scope.doCalcs = function(engine) {
        $scope.errors = [];
        $scope.successes = [];
        rfengineServices.doIsp(engine);
        rfengineServices.doTWR(engine, $scope);
        rfengineServices.doHeat(engine);
        rfengineServices.doConfigs(engine, $scope);
        rfengineServices.doCost(engine);
    };

    $scope.defaultIgnitions = function(engine) {
        engine.ksprfs.ksprfs_engine_ignitions = rfstockalikeConstants.engineTypeConfigs[engine.ksprfs.ksprfs_type][2];
        if ( rfstockalikeConstants.engineTypeConfigs[engine.ksprfs.ksprfs_type][3] ) {
            engine.ksprfs.ksprfs_engine_ignition_mode = 2;
        } else {
            engine.ksprfs.ksprfs_engine_ignition_mode = 1;
        }
        $scope.doCalcs(engine);
    };

    $scope.rcsDefault = function(engine) {
        engine.ksprfs.ksprfs_engine_configs = rfstockalikeConstants.rcsDefaultConfigs;
        engine.ksprfs.ksprfs_engine_tech_level = "1";
        engine.ksprfs.ksprfs_engine_ispvm = 1;
        engine.ksprfs.ksprfs_engine_ispslm = 1;
        engine.ksprfs.ksprfs_engine_ignition_mode = "0";
        engine.ksprfs.ksprfs_engine_flow = 'STAGE_PRIORITY_FLOW';
        $scope.rcsMass(engine); // includes doCalcs()
    };

    $scope.rcsMass = function(engine) {
        if ( !engine.ksprfs.ksprfs_rcs_nozzles ) { engine.ksprfs.ksprfs_rcs_nozzles = 4; }

        // 6 kg (0.006 tons) per nozzle per kilonewton of thrust.
        engine.ksprfs.ksprfs_engine_mass = ( ( engine.ksprfs.ksprfs_rcs_nozzles * engine.ksprfs.ksprfs_engine_thrust * 6 ) + 5 ) / 1000;
        $scope.doCalcs(engine);
    };

    $scope.displayTechLevel = function(engine) {
        var tl = engine.ksprfs.ksprfs_engine_tech_level;
        if (tl === 'start') { tl = '0'; }
        return tl;
    };

    // Actions

    $scope.addConfig = function(engine) {
        engine.ksprfs.ksprfs_engine_configs.push({ 'config_mixture':0, 'config_ratio':0, 'config_tech_node':'' });
    };

    $scope.removeConfig = function(engine,index) {
        engine.ksprfs.ksprfs_engine_configs.splice(index, 1);
    };

    $scope.changeTitle = function(engine) {
        var newTitle = window.prompt('Change Title', '');
        if ( newTitle !== null && newTitle !== '' ) {
            engine.title = newTitle;
        }
    };

    $scope.saveEngine = function(engine) {
        rfengineServices.prepareSaveData(engine);

        var engineData = [];

        // Clear notices
        $scope.successes = []; $scope.errors = [];

        angular.forEach(engine.ksprfs, function(value, key){
            engineData.push({'key': key, 'value': value});
        });

        //window.console.log(engineData);

        var url = '/wp-json/wp/v2/engines/';
        if (typeof engine.id != 'undefined') {
            url += engine.id;
        }

        var req = {
            method: 'PUT',
            url: url,
            transformResponse: function(d, h){ return d; },
            data: {
                'ID': engine.ID,
                'title': engine.title,
                'ksprfs': engineData
            }
        };

        $http(req).success(function(){
            $scope.successes.push('Engine saved!');
        }).error(function(){
            $scope.errors.push('Unable to save engine. Be sure you are logged in properly, and try again.');
        });

        rfengineServices.cleanData(engine);

    };

    $scope.submitEngine = function(engine) {
        engine.engineMod = window.prompt('Mod for this engine:', '');

        rfengineServices.prepareSaveData(engine);

        var req = {
            method: 'POST',
            url: '/engine-submit/',
            data: engine
        };

        $http(req).success(function(){
            $scope.successes.push('Engine submitted!');
        }).error(function(){
            $scope.errors.push('Unable to submit engine. Please try again.');
        });

        rfengineServices.cleanData(engine);

    };

    $scope.createEngine = function(engine) {
        var engineData = [];

        // Clear notices
        $scope.successes = []; $scope.errors = [];

        angular.forEach(engine.ksprfs, function(value, key){
            engineData.push({'key': key, 'value': value});
        });

        var req = {
            method: 'POST',
            url: '/wp-json/wp/v2/engines',
            headers: {
                'X-WP-Nonce': nonce
            },
            data: {
                'title': engine.title.rendered,
                'type': 'engine',
                'status': 'publish',
                'ksprfs': engineData
            }
        };

        $http(req).success(function(){
            $scope.successes.push('Engine submitted!');
        }).error(function(){
            $scope.errors.push('Unable to submit engine. Please try again.');
        });
    };

    $scope.parseField = function() {

        $scope.parsed = angular.fromJson($scope.engine);
        window.console.log($scope.parsed);

    };

    var engineID = $stateParams.id;

    //$scope.engine = null;
    $scope.loading = true;
    var promises = [];

    /*
     Run through the engines, mixtures, types, and resources.
     Check to see if they already contain data. If they do,
     then use the already loaded data. If not, fetch the data
     from the server.
     */

    if ( $scope.engines.length < 1 ) {
        if ( parseInt(engineID) !== 0 ) {
            var promise = $http.get('/wp-json/wp/v2/engines/' + engineID)
                .success(function (data) {
                    $scope.setEngine(data);
                    rfengineServices.cleanData($scope.engine, $scope);
                });
            promises.push(promise);
        } else {

        }
    } else {
        $scope.setEngine($scope.getSingleEngine(engineID));
        rfengineServices.cleanData($scope.engine, $scope);
    }

    if ( $scope.mixtures.length < 1 ) {
        var promise = $http.get('/wp-json/wp/v2/mixtures/?filter[posts_per_page]=-1')
            .success(function(data){
                $scope.setMixtures(data);
            });
        promises.push(promise);
    }

    if ( $scope.types.length < 1 ) {
        var promise = $http.get('/wp-json/wp/v2/engine-type/?per_page=0')
            .success(function(data){
                $scope.setTypes(data);
            });
        promises.push(promise);
    }

    if ( $scope.resources.length < 1 ) {
        var promise = $http.get('/wp-json/wp/v2/resources/?filter[posts_per_page]=-1')
            .success(function(data){
                $scope.setResources(data);
            });
        promises.push(promise);
    }

    if ( promises.length > 0 ) { // If we had to do requests remove the loading notice when they all complete
        $q.all(promises).then(function () {
            $scope.loading = false;
            $scope.doCalcs($scope.engine);
        });
    } else { // else if we had no requests, remove the loading anyway
        $scope.loading = false;
        $scope.doCalcs($scope.engine);
    }

}])

.controller('RFEngineListController', ['$scope', '$http', '$q', '$filter', '$timeout', '$window', function($scope, $http, $q, $filter, $timeout, $window){

    // Set some global List variables
    $scope.currentPage = 0;
    $scope.pageSize = 20;
    $scope.loading = true;

    // controller utility functions
    $scope.prepareEngineList = function(engine) {
        var result = {};
        result.title = engine.title.rendered;
        result.link = engine.link;
        result.id = engine.id;
        result.type = engine.ksprfs.ksprfs_type;
        var configs = [];
        angular.forEach(engine.ksprfs.ksprfs_engine_configs, function(value, key){
            configs.push(value.config_mixture);
        });
        result.configs = configs;
        return result;
    };

    $scope.ceil = function(variable) {
        return Math.ceil(variable);
    };

    $scope.checkPage = function() {
        $timeout( function(){
            if ( $scope.filteredEngines.length/$scope.pageSize < $scope.currentPage ) {
                $scope.currentPage = 0;
            }
        }, 200);
    };

    // prepare the promises array
    // var promises = [];

    // Get mixtures if they do not already exist
    if( $scope.mixtures.length < 1 ) {
        $http.get('/wp-json/wp/v2/mixtures/?filter[posts_per_page]=-1&filter[order]=ASC&filter[orderby]=title')
            .success(function (data) {
                $scope.setMixtures(data);
            });
    }

    // Get engines if enginesList doesn't have anything
    if ( $scope.enginesList.length < 1 ) {

        var baseLink = '/wp-json/wp/v2/engines/?filter[posts_per_page]=-1';

        $http.get(baseLink).success(function (data, status, headers) {
            angular.forEach(data, function (value, key) {
                // set up the engines list
                $scope.enginesList.push($scope.prepareEngineList(value));
            });

            $scope.setEngines(data);

            $scope.engineCount = headers('X-WP-Total');

            /*
            var pages = Math.ceil($scope.engineCount / $scope.pageSize);
            var count = 2;

            for (count; count <= pages; count++) {
                var promise = $http.get(baseLink + '?filter[posts_per_page]=' + $scope.pageSize + '&page=' + count)
                    .success(function (data) {
                        angular.forEach(data, function (value, key) {
                            $scope.enginesList.push($scope.prepareEngineList(value));
                        });
                    });
                promises.push(promise);
            }
            $q.all(promises).then(function () {
                $scope.loading = false;
            });*/
            $scope.loading = false;
        });
    } else {
        $scope.loading = false;
    }

}])

.controller('RFSingleModController', ['$scope', '$http', '$q', '$filter', '$stateParams', 'rfengineServices', function ($scope, $http, $q, $filter, $stateParams, rfengineServices) {

    $scope.doCalcs = function(engine) {
        $scope.errors = [];
        $scope.successes = [];
        rfengineServices.doIsp(engine);
        rfengineServices.doTWR(engine, $scope);
        rfengineServices.doHeat(engine);
        rfengineServices.doConfigs(engine, $scope);
        rfengineServices.doCost(engine);
    };

    if ( $scope.engines.length < 1 ) {
        $http.get('/wp-json/wp/v2/engines/?per_page=0&filter[engine_mod]=' + $stateParams.slug)
            .success(function (data) {
                $scope.modEngines = data;
                angular.forEach( $scope.modEngines, function(value, key){
                    rfengineServices.cleanData(value, $scope);
                    $scope.doCalcs(value);
                });
            });
    } else {
        $scope.modEngines = $filter('filter')($scope.engines, function (data) {
            if ( data.ksprfs_taxonomy.engine_mod.length !== 0 ) {
                return data.ksprfs_taxonomy.engine_mod[0].slug === $stateParams.slug;
            }
        });

        angular.forEach( $scope.modEngines, function(value, key){
            rfengineServices.cleanData(value, $scope);
            $scope.doCalcs(value);
        });
    }

}]);
