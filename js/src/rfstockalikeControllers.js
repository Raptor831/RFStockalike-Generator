angular.module('rfstockalikeEngines', ['ngSanitize'])

.controller('RFEngineController', ['$scope', '$http', '$q', '$filter', '$stateParams', function ($scope, $http, $q, $filter, $stateParams) {

    $scope.doCalcs = function(engine) {
        $scope.errors = [];
        $scope.successes = [];
        $scope.doIsp(engine);
        $scope.doTWR(engine);
        $scope.doHeat(engine);
        $scope.doConfigs(engine);
        $scope.doCost(engine);
    };

    $scope.doTWR = function(engine) {
        // TWR
        engine.ksprfs.engine_twr = engine.ksprfs.ksprfs_engine_thrust / 9.81 / engine.ksprfs.ksprfs_engine_mass;

        // Goal TWR
        var ispsl_factor, ispv_factor, ispsl_exponent, ispv_exponent, ffsc_factor;

        // Scaling exponents for GTWR based on +/- standard IspSL and IspV. (i.e. more Isp = less GTWR)
        ispsl_exponent = ( engine.ksprfs.ksprfs_engine_ispslm < 1 ? 0.9 : 4 );
        ispv_exponent = ( engine.ksprfs.ksprfs_engine_ispvm < 1 ? 1.5 : 8 );

        // Scaling FFSC factor. (i.e. FFSC gives greater GTWR)
        ffsc_factor = ( engine.ksprfs.ksprfs_engine_ffsc ? 1.33 : 1 );

        // Derive the two actual Isp factors
        ispsl_factor = Math.min( Math.max( Math.pow(engine.ksprfs.ksprfs_engine_ispslm, ispsl_exponent), 0.5 ), 10 );
        ispv_factor  = Math.min( Math.max( Math.pow(engine.ksprfs.ksprfs_engine_ispvm,  ispv_exponent),  0.5 ), 10 );

        // Calculate the GTWR finally
        engine.ksprfs.engine_gtwr = $scope.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][2] / ispsl_factor / ispv_factor * ffsc_factor;

        // Compare actual to goal, set variable to true if within 5%
        if ( engine.ksprfs.engine_twr > ( engine.ksprfs.engine_gtwr * 0.95 ) && engine.ksprfs.engine_twr < ( engine.ksprfs.engine_gtwr * 1.05 ) ) {
            engine.ksprfs.engine_twr_within_goal = true;
        } else {
            engine.ksprfs.engine_twr_within_goal = false;
        }

        // Solids calculations
        if ( engine.ksprfs.ksprfs_type === 'solid' || engine.ksprfs.ksprfs_type === 'solid-plus' ) {
            if ( !engine.ksprfs.ksprfs_engine_mft_volume || engine.ksprfs.ksprfs_engine_mft_volume === 0 || engine.ksprfs.ksprfs_engine_mft_volume === '0' ) {
                $scope.errors.push('No tank volume specified.');
            }

            // Calculate The Goal Percentage Case for solids
            engine.ksprfs.engine_goal_percent_case = 1 / engine.ksprfs.engine_gtwr * 100;

            // Calculate the actual percentage case for solids
            var extraMass = parseFloat(engine.ksprfs.ksprfs_engine_extra_mass) || 0;
            var totalMass = engine.ksprfs.ksprfs_engine_mass + extraMass;
            var gm = engine.ksprfs.ksprfs_engine_mft_volume * 0.00178 + totalMass;
            //window.console.log(gm);

            engine.ksprfs.engine_percent_case = totalMass / gm * 100;

            // Compare actual to goal, set variable to true if within 5%
            if ( engine.ksprfs.engine_percent_case > ( engine.ksprfs.engine_goal_percent_case * 0.95 ) && engine.ksprfs.engine_percent_case < ( engine.ksprfs.engine_goal_percent_case * 1.05 ) ) {
                engine.ksprfs.engine_percent_case_within_goal = true;
            } else {
                engine.ksprfs.engine_percent_case_within_goal = false;
            }

        } // end solids

        switch( engine.ksprfs.ksprfs_engine_throttle_type ) {
            case 'full-throttle':
                engine.finalThrottle = 0;
                break;
            case 'unthrottleable':
                engine.finalThrottle = -1;
                break;
            case 'use-default':
                engine.finalThrottle = $scope.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][7];
                break;
            case 'use-default-tech':
                var tech = $scope.engine.ksprfs.ksprfs_engine_throttle_tl;
                if (tech === 'start') { tech = '0'; }
                engine.finalThrottle = tech;
                if ( ! parseInt(engine.finalThrottle) ) { engine.finalThrottle = 0; }
                break;
            case 'custom-throttle':
                engine.finalThrottle = Math.round( (engine.ksprfs.ksprfs_engine_throttle * $scope.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][7])*1000) / 1000;
                if ( ! parseFloat(engine.finalThrottle) ) { engine.finalThrottle = 0; }
                break;
            default:
                engine.finalThrottle = 0;
        }

        if ( engine.ksprfs.ksprfs_type === 'rcs' ) {
            engine.finalThrottle = 0;
        }

    };

    $scope.doIsp = function(engine) {

        // Get resultant base Isp from inputs
        var ispV, ispSL;
        ispV = $scope.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][1] * engine.ksprfs.ksprfs_engine_ispvm;
        ispSL = $scope.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][0] * engine.ksprfs.ksprfs_engine_ispslm;
        if ( engine.ksprfs.ksprfs_engine_ffsc ) {
            ispV *= 1.07;
            ispSL *= 1.07;
        }
        engine.ksprfs.resultIspV = ispV;
        engine.ksprfs.resultIspSL = ispSL;

    };

    $scope.doHeat = function(engine) {
        var factor, maxFactor;

        // Heat production
        if ( engine.ksprfs.ksprfs_type === 'solid' || engine.ksprfs.ksprfs_type === 'solid-plus' ) {
            factor = Math.pow( ( engine.ksprfs.ksprfs_engine_mft_volume * engine.ksprfs.resultIspV / 4 / 9.81 / engine.ksprfs.ksprfs_engine_thrust ) + 20, 0.75);
            engine.ksprfs.engine_heat = Math.round( ( 200 + 5200 / factor ) * 0.5 );
        } else {
            // var factor = 135 * ( engine.ksprfs.resultIspSL / 200 ) ^ 0.7 * ( engine.ksprfs.engine_twr / engine.ksprfs.engine_gtwr ) ^ 0.5 *IF(ISERR(FIND("N",Engines!H197)),1,1.25)),0)
            factor = 135 * Math.pow( (engine.ksprfs.resultIspSL / 200), 0.7) * Math.pow( engine.ksprfs.engine_twr / engine.ksprfs.engine_gtwr, 0.5);
            if ( engine.ksprfs.ksprfs_type === 'nuclear-thermal' ) { factor *= 1.25; }
            engine.ksprfs.engine_heat = factor;
        }

        // Maximum heat for the engine
        if ( engine.ksprfs.ksprfs_type !== 'solid' && engine.ksprfs.ksprfs_type !== 'solid-plus' ) {
            var result;
            maxFactor = $scope.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][6];
            result = Math.pow(500 + (8 * factor) / maxFactor, 1.03);
            engine.ksprfs.max_heat = Math.max(1450, Math.min(2400, result));
        } else {
            engine.ksprfs.max_heat = 1800;
        }

        engine.ksprfs.max_heat = Math.round(engine.ksprfs.max_heat, 0);
    };

    $scope.doConfigs = function(engine) {
        // Do all the work for each engine config in this loop
        var i;
        for(i = 0; i < engine.ksprfs.ksprfs_engine_configs.length; i++) {
            // Convert mass ratio into KSP unit ratios (out of 100)
            engine.ksprfs.ksprfs_engine_configs[i].config_mixture = parseInt(engine.ksprfs.ksprfs_engine_configs[i].config_mixture);
            var mixture = $scope.getMixture(engine.ksprfs.ksprfs_engine_configs[i].config_mixture);
            var fuelDensity = $scope.getFuel(mixture).ksprfs.ksprfs_resource_density;
            var oxyDensity;
            if ( $scope.getOxidizer(mixture) ) {
                oxyDensity = $scope.getOxidizer(mixture).ksprfs.ksprfs_resource_density;
            }
            var ratio = engine.ksprfs.ksprfs_engine_configs[i].config_ratio;
            if ( $scope.getOxidizer(mixture) ) {
                engine.ksprfs.ksprfs_engine_configs[i].fuelRatio = (1 / fuelDensity / ( 1 / fuelDensity + (ratio/oxyDensity) )) * 100;
                engine.ksprfs.ksprfs_engine_configs[i].oxyRatio = 100 - engine.ksprfs.ksprfs_engine_configs[i].fuelRatio;
            } else {
                engine.ksprfs.ksprfs_engine_configs[i].fuelRatio = 100;
            }

            // Find Isp multiplier values
            var ispV, ispSL;
            ispV = ispSL = 1.0;

            ispV = mixture.ksprfs.ksprfs_mixture_ispv_mult;
            ispSL = mixture.ksprfs.ksprfs_mixture_ispsl_mult;

            if ( engine.ksprfs.ksprfs_engine_ffsc ) {
                ispV *= 1.07;
                ispSL *= 1.07;
            }

            engine.ksprfs.ksprfs_engine_configs[i].ispV_mult = ispV * engine.ksprfs.ksprfs_engine_ispvm;
            engine.ksprfs.ksprfs_engine_configs[i].ispSL_mult = ispSL * engine.ksprfs.ksprfs_engine_ispslm;

            // Do EI configs
            var ignitions, typeOverride, finalIgnitions;
            ignitions = engine.ksprfs.ksprfs_engine_ignitions;
            typeOverride = parseInt(engine.ksprfs.ksprfs_engine_ignition_mode);
            if ( !ignitions ) { ignitions = 0; }
            if ( typeOverride > 1 ) {
                finalIgnitions = ignitions;
            } else {
                if ( mixture.ksprfs.ksprfs_mixture_hypergolic ) {
                    finalIgnitions = ignitions;
                } else {
                    finalIgnitions = 1;
                }
            }

            engine.ksprfs.ksprfs_engine_configs[i].ignitions = finalIgnitions;
            if ( engine.ksprfs.ksprfs_type === 'solid' || engine.ksprfs.ksprfs_type === 'solid-plus' ) {
                engine.ksprfs.ksprfs_engine_configs[i].ullage = false;
                engine.ksprfs.ksprfs_engine_configs[i].ignitions = 1;
            } else {
                engine.ksprfs.ksprfs_engine_configs[i].ullage = true;
            }

            engine.ksprfs.ksprfs_engine_configs[i].title = mixture.title;
            if ( engine.ksprfs.ksprfs_engine_configs[i].config_thrust_curve && engine.ksprfs.ksprfs_engine_configs[i].config_thrust_curve != '0' ) {
                if ( engine.ksprfs.ksprfs_engine_configs[i].config_thrust_curve === '-1' ) {
                    engine.ksprfs.ksprfs_engine_configs[i].title += 'Custom'+(i+1);
                } else {
                    engine.ksprfs.ksprfs_engine_configs[i].title += $scope.thrustCurveNames[engine.ksprfs.ksprfs_engine_configs[i].config_thrust_curve];
                }
            }
        }
    };

    $scope.doCost = function(engine) {
        var baseCost, finalCost;
        var costMultiplier = 1.5;
        // =((J302*0.8+I302*0.2)-200)^2*M302/1000*(1+ABS(AH302)*0.2)*IF(H302="J",0.05,1)*IF(H302="N",4,1)*IF(AA302>0,0.5,1)
        baseCost = (engine.ksprfs.resultIspV * 0.8 + engine.ksprfs.resultIspSL * 0.2) - 200;
        baseCost = Math.pow(baseCost, 2) * engine.ksprfs.ksprfs_engine_thrust / 1000 * (1 + Math.abs(engine.ksprfs.ksprfs_engine_vectoring) * 0.2);
        if ( engine.ksprfs.ksprfs_type === 'jet' ) { baseCost *= 0.05; }
        if ( engine.ksprfs.ksprfs_type === 'nuclear-thermal' ) { baseCost *= 4; }
        if ( engine.ksprfs.ksprfs_engine_ffsc ) { baseCost *= 0.5; }

        // =IF(AI302>0,AI302*((AI302/E302/4000)^0.25)*0.5+50+0.1*700*E302,"")
        if (baseCost > 0) {
            finalCost = baseCost * ( Math.pow(baseCost / engine.ksprfs.ksprfs_engine_mass / 4000), 0.25) * 0.5 + 50 + 0.1 * 700 * engine.ksprfs.ksprfs_engine_mass;
        } else {
            finalCost = 0;
        }
        engine.ksprfs.engineCost = Math.round(finalCost * costMultiplier);

        var entryFactor = engine.ksprfs.ksprfs_engine_ffsc ? 10 : 5;
        engine.ksprfs.engineEntryCost = engine.ksprfs.engineCost * entryFactor;
    };

    $scope.defaultIgnitions = function(engine) {
        engine.ksprfs.ksprfs_engine_ignitions = $scope.engineTypeConfigs[engine.ksprfs.ksprfs_type][2];
        if ( $scope.engineTypeConfigs[engine.ksprfs.ksprfs_type][3] ) {
            engine.ksprfs.ksprfs_engine_ignition_mode = 2;
        } else {
            engine.ksprfs.ksprfs_engine_ignition_mode = 1;
        }
        $scope.doCalcs(engine);
    };

    $scope.rcsDefault = function(engine) {
        engine.ksprfs.ksprfs_engine_configs = $scope.rcsDefaultConfigs;
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
        $scope.prepareSaveData(engine);

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

        $scope.cleanData(engine);

    };

    $scope.submitEngine = function(engine) {
        engine.engineMod = window.prompt('Mod for this engine:', '');

        $scope.prepareSaveData(engine);

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

        $scope.cleanData(engine);

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

    //alert('parsed gSE');

    //var nonce = RFS.nonce;
    //window.console.log(nonce);
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
        var promise = $http.get('/wp-json/wp/v2/engines/'+engineID)
            .success(function(data){
                $scope.setEngine(data);
                $scope.cleanData($scope.engine);
            });
        promises.push(promise);
    } else {
        $scope.setEngine($scope.getSingleEngine(engineID));
        window.console.log($scope.engine);
        $scope.cleanData($scope.engine);
    }

    if ( $scope.mixtures.length < 1 ) {
        var promise = $http.get('/wp-json/wp/v2/mixtures/?filter[posts_per_page]=-1')
            .success(function(data){
                $scope.setMixtures(data);
            });
        promises.push(promise);
    }

    if ( $scope.types.length < 1 ) {
        var promise = $http.get('/wp-json/wp/v2/terms/engine-type/?per_page=0')
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

    // prepare the promises array
    var promises = [];

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
                // push to the global engines as well
                //$scope.engines.push(value);
            });

            $scope.setEngines(data);

            //$scope.enginePages = headers('X-WP-TotalPages');
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


    // Actions

    $scope.getMixture = function(ID) {
        return $filter('filter')($scope.mixtures, function (data) {return data.ID === ID;});
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

}])

.controller('RFSingleModController', ['$scope', '$http', '$q', '$filter', '$stateParams', function ($scope, $http, $q, $filter, $stateParams) {

    if ( $scope.engines.length < 1 ) {
        $http.get('/wp-json/wp/v2/engines/?per-page=0&filter[engine_mod]=' + $stateParams.slug)
            .success(function (data) {
                $scope.modEngines = data;
            });
    } else {
        $scope.modEngines = $filter('filter')($scope.engines, function (data) {
            if ( data.ksprfs_taxonomy.engine_mod.length !== 0 ) {
                return data.ksprfs_taxonomy.engine_mod[0].slug === $stateParams.slug;
            }
        });
    }

}])

.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        if (input.length < start) {
            return input.slice(0);
        } else {
            return input.slice(start);
        }
    };
});
