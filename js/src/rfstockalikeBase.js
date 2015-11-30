angular.module('rfstockalikeBase', [])

.controller('RFBaseController', ['$scope', '$http', '$filter', function($scope, $http, $filter) {
    $scope.errors = [];
    $scope.successes = [];
    $scope.math = Math;
    $scope.enginesList = [];
    $scope.engines = [];
    $scope.mods = [];
    $scope.types = [];
    $scope.resources = [];
    $scope.mixtures = [];

    window.console.log(RFS.nonce);

    $scope.thrustCurves = {
        '0' : "",
        '1' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.05 1.00 0 0\r\n        key = 0.95 0.50 0 0\r\n        key = 1.00 0.50",
        '2' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.05 1.00 0 0\r\n        key = 0.95 1.00 0 0\r\n        key = 1.00 0.50",
        '3' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.20 1.00 6 -0.2\r\n     key = 0.95 1.00 0  0.0\r\n     key = 1.00 0.50",
        '4' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.95 1.00 0 0\r\n        key = 1.00 0.50",
        '5' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.05 0.50 0 0\r\n        key = 0.95 1.00 0 0\r\n        key = 1.00 0.50",
        '6' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.05 0.10 0.1 0.1\r\n    key = 0.88 0.10 0.1 0.1\r\n    key = 0.92 1.00\r\n        key = 0.95 1.00\r\n        key = 1.00 0.50"
    };

    $scope.thrustCurveNames = {
        '0' : "Stock",
        '1' : "Increasing",
        '2' : "Steady",
        '3' : "SteadyDip",
        '4' : "Decreasing",
        '5' : "DecreasingDip",
        '6' : "PulseSteady"
    };
    // IspSL, IspV, TWRwTP, AcTWR,  TrMult, MaMult, TWRInc, Throt
    $scope.launchIsp     = {'start' : [234,   260,  44.7,   67,     1.00,   1.00,   null,   1.00],
        '1'     : [248,   275,  54.2,   81.25,  1.15,   0.95,   1.21,   1.00],
        '2'     : [266, 	295,	66.8,   100.25,	1.32,  	0.88,  	1.23,  	1.00],
        '3'     : [279,	  310,	76.3,   114.5,	1.43,	  0.84,	  1.14,	  1.00],
        '4'     : [288,	  320,	82.7,	  124,	  1.50,	  0.81,	  1.08,	  0.80],
        '5'     : [295,	  327,	87.1,	  130.65,	1.55,   0.80,	  1.05,	  0.70],
        '6'     : [299,	  332,	90.3,	  135.4,	1.58,	  0.78,	  1.04,	  0.60],
        '7'     : [304,	  337,	93.4,	  140.15,	1.61,  	0.77,   1.03,	  0.60]
    };
    $scope.launchPlusIsp = {'start' : [220,	268,	38.3,	 53.6,	1.00,	1.00,	null,	1.00],
        '1'     : [233,	283,	46.4,	 65,	  1.15,	0.95,	1.21,	1.00],
        '2'     : [250,	304,	57.3,	 80.2,	1.32,	0.88,	1.23,	0.80],
        '3'     : [262,	319,	65.4,	 91.6,	1.43,	0.84,	1.14,	0.75],
        '4'     : [271,	330,	70.9,	 99.2,	1.50,	0.81,	1.08,	0.70],
        '5'     : [277,	337,	74.6,	 104.5,	1.55,	0.80,	1.05,	0.65],
        '6'     : [281,	342,	77.4,	 108.3,	1.58,	0.78,	1.04,	0.60],
        '7'     : [285,	347,	80.1,	 112.1,	1.62,	0.77,	1.03,	0.50]
    };
    $scope.upperIsp      = {'start' : [168,	280,	35.2,	44,	1.00,	1.00,	null,	1.00],
        '1'     : [185,	308,	48.8,	61,	1.26,	0.91,	1.39,	1.00],
        '2'     : [195,	325,	56.8,	71,	1.39,	0.86,	1.16,	1.00],
        '3'     : [201,	335,	61.6,	77,	1.46,	0.84,	1.08,	1.00],
        '4'     : [204,	340,	64,	  80,	1.50,	0.82,	1.04,	0.80],
        '5'     : [207,	345,	66.4,	83,	1.53,	0.81,	1.04,	0.75],
        '6'     : [210,	350,	68.8,	86,	1.56,	0.80,	1.04,	0.70],
        '7'     : [213,	355,	71.2,	89,	1.60,	0.79,	1.03,	0.60]
    };
    $scope.upperPlusIsp  = {'start' : [102,	291,	25.4,	30.47,	1.00,	1.00,	null,	1.00],
        '1'     : [112,	320,	38.5,	46.20,	1.38,	0.91,	1.52,	1.00],
        '2'     : [118,	338,	46.2,	55.47,	1.57,	0.86,	1.20,	0.75],
        '3'     : [122,	348,	50.9,	61.02,	1.68,	0.84,	1.10,	0.40],
        '4'     : [124,	354,	53.2,	63.81,	1.72,	0.82,	1.05,	0.30],
        '5'     : [126,	359,	55.5,	66.59,	1.77,	0.81,	1.04,	0.20],
        '6'     : [127,	364,	57.8,	69.36,	1.82,	0.80,	1.04,	0.15],
        '7'     : [129,	369,	60.1,	72.14,	1.87,	0.79,	1.04,	0.10]
    };
    $scope.orbitalIsp    = {'start' : [100,	286,	18.9,	21.71,	1.00,	1.00,	null,	1.00],
        '1'     : [110,	314,	25.8,	29.71,	1.24,	0.91,	1.37,	1.00],
        '2'     : [116,	332,	30.3,	34.86,	1.38,	0.86,	1.17,	0.75],
        '3'     : [120,	342,	32.8,	37.71,	1.45,	0.84,	1.08,	0.40],
        '4'     : [121,	347,	34,	  39.14,	1.48,	0.82,	1.04,	0.20],
        '5'     : [123,	352,	35.3,	40.57,	1.52,	0.81,	1.04,	0.15],
        '6'     : [125,	357,	36.5,	42.00,	1.55,	0.80,	1.03,	0.10],
        '7'     : [127,	362,	37.8,	43.43,	1.58,	0.79,	1.04,	0.10]
    };
    $scope.solidIsp      = {'start' : [200,	220,	4.347826087,	23,  1],
        '1'     : [215,	235,	5.263157895,	19,  1],
        '2'     : [230,	250,	6.25,	        16,  1],
        '3'     : [240,	260,	7.142857143,	14,  1],
        '4'     : [245,	268,	8.333333333,	12,  1],
        '5'     : [255,	276,	10,	          10,  1],
        '6'     : [260,	284,	11.11111111,	9,   1],
        '7'     : [265,	290,	12.5,	        8,   1]
    };
    $scope.solidPlusIsp  = {'start' : [160,	231,	4.761904762,	21,	 1],
        '1'     : [172,	247,	5.882352941,	17,	 1],
        '2'     : [184,	263,	7.142857143,	14,	 1],
        '3'     : [192,	273,	8.333333333,	12,	 1],
        '4'     : [196,	281,	10,	          10,	 1],
        '5'     : [204,	290,	12.5,	        8,	 1],
        '6'     : [208,	298,	14.28571429,	7,	 1],
        '7'     : [212,	305,	16.66666667,	6,	 1]
    };
    $scope.nuclearIsp    = {'3'     : [380,	850,	1.46,	   1.679,	   1.00,	1.00,	null,	1.00],
        '4'     : [391,	875,	2,	     2.3,	     1.33,	0.97,	1.37,	1.00],
        '5'     : [407,	910,	2.4241,	 2.787715, 1.55,	0.93,	1.21,	1.00],
        '6'     : [416,	930,	4,   	   4.6,	     2.50,	0.91,	1.65,	1.00],
        '7'     : [429,	960,	6,	     6.9,	     3.64,	0.89,	1.50,	1.00],
        '8'     : [452,	1010,	8,	     9.2,	     4.61,	0.84,	1.33,	1.00]
    };
    $scope.aerospikeIsp  = {'start' : [252,	280,	20.7,	28.94175,	1.00,	1.00,	null,	1.00],
        '1'     : [277,	308,	31.4,	43.89,	  1.38,	0.91,	1.52,	1.00],
        '2'     : [293,	325,	37.6,	52.6965,	1.56,	0.86,	1.20,	0.80],
        '3'     : [302,	335,	41.4,	57.969,	  1.67,	0.84,	1.10,	0.70],
        '4'     : [306,	340,	43.3,	60.6195,	1.72,	0.82,	1.05,	0.60],
        '5'     : [311,	345,	45.2,	63.25575,	1.77,	0.81,	1.04,	0.50],
        '6'     : [315,	350,	47.1,	65.892,	  1.82,	0.80,	1.04,	0.40],
        '7'     : [320,	355,	48.9,	68.52825,	1.86,	0.79,	1.04,	0.30]
    };
    $scope.rcsIsp        = {'start' : [351,   366,  44.7,   67,     1.00,   1.00,   null,   1.00],
        '1'     : [370,   390,  54.2,   81.25,  1.15,   0.95,   1.21,   1.00],
        '2'     : [399, 	416,	66.8,   100.25,	1.32,  	0.88,  	1.23,  	1.00],
        '3'     : [418,	  437,	76.3,   114.5,	1.43,	  0.84,	  1.14,	  1.00],
        '4'     : [432,	  451,	82.7,	  124,	  1.50,	  0.81,	  1.08,	  0.80],
        '5'     : [442,	  461,	87.1,	  130.65,	1.55,   0.80,	  1.05,	  0.70],
        '6'     : [448,	  468,	90.3,	  135.4,	1.58,	  0.78,	  1.04,	  0.60],
        '7'     : [456,	  475,	93.4,	  140.15,	1.61,  	0.77,   1.03,	  0.60]
    };

    // type : ['config symbol', ISP table, EI Ignitions, ignore hypergolic ignition requirement]
    $scope.engineTypeConfigs = {'launch':['L',$scope.launchIsp,1,false],
        'launch-plus':['L+',$scope.launchPlusIsp,2,false],
        'upper':['U',$scope.upperIsp,4,false],
        'upper-plus':['U+',$scope.upperPlusIsp,12,true],
        'orbital':['O',$scope.orbitalIsp,24,true],
        'nuclear-thermal':['N',$scope.nuclearIsp,0,false],
        'solid':['S',$scope.solidIsp,1,true],
        'solid-plus':['S+',$scope.solidPlusIsp,1,true],
        'aerospike':['A',$scope.aerospikeIsp,0,true],
        'jet':['J',null,0,true],
        'rcs':['L',$scope.rcsIsp,0,true]};

    $scope.rcsDefaultConfigs = [
        {"config_mixture":135,"config_ratio":0,"config_tech_node":""},
        {"config_mixture":134,"config_ratio":0,"config_tech_node":""},
        {"config_mixture":178,"config_ratio":1.6,"config_tech_node":""},
        {"config_mixture":138,"config_ratio":0,"config_tech_node":""},
        {"config_mixture":137,"config_ratio":0,"config_tech_node":""},
        {"config_mixture":177,"config_ratio":2,"config_tech_node":""},
        {"config_mixture":180,"config_ratio":1.7,"config_tech_node":""},
        {"config_mixture":888,"config_ratio":0,"config_tech_node":""}
    ];

    $http.get('/wp-json/wp/v2/terms/engine-mod/?per_page=0')
        .success(function(data){
            $scope.setMods(data);
        });

    //window.console.log($scope.thrustCurves);

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

    $scope.getEngine = function() {
        return $scope.engine;
    };

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

    $scope.getSingleEngine = function (id) {
        var result = $filter('filter')($scope.engines, function (data) {return parseInt(data.id) === parseInt(id);});
        return result[0];
    };

    $scope.cleanData = function(engine) {

        // Checkboxes (checking for all possible values from CMB2 or RFStockalike)
        engine.ksprfs.ksprfs_engine_mefx = engine.ksprfs.ksprfs_engine_mefx === 'on' || engine.ksprfs.ksprfs_engine_mefx == true ? true : false;
        engine.ksprfs.ksprfs_engine_bimodal = engine.ksprfs.ksprfs_engine_bimodal === 'on' || engine.ksprfs.ksprfs_engine_bimodal == true ? true : false;
        engine.ksprfs.ksprfs_engine_ffsc = engine.ksprfs.ksprfs_engine_ffsc === 'on' || engine.ksprfs.ksprfs_engine_ffsc == true ? true : false;
        engine.ksprfs.ksprfs_engine_dedicated = engine.ksprfs.ksprfs_engine_dedicated === 'on' || engine.ksprfs.ksprfs_engine_dedicated == true ? true : false;
        engine.ksprfs.ksprfs_engine_vectoring_override = engine.ksprfs.ksprfs_engine_vectoring_override === 'on' || engine.ksprfs.ksprfs_engine_vectoring_override == true ? true : false;
        engine.ksprfs.ksprfs_engine_vectoring_exists = engine.ksprfs.ksprfs_engine_vectoring_exists === 'on' || engine.ksprfs.ksprfs_engine_vectoring_exists == true ? true : false;

        // Check for valid data
        engine.ksprfs.ksprfs_engine_vectoring = parseInt(engine.ksprfs.ksprfs_engine_vectoring) ? parseInt(engine.ksprfs.ksprfs_engine_vectoring) : 0;
        if (engine.ksprfs.ksprfs_engine_type && !engine.ksprfs.ksprfs_type) {
            var type = $scope.getType(engine.ksprfs.ksprfs_engine_type[0]);
            engine.ksprfs.ksprfs_type = type.slug;
        }

        if ( !engine.ksprfs.ksprfs_engine_flow ) {
            engine.ksprfs.ksprfs_engine_flow = 'STACK_PRIORITY_SEARCH';
        }

        engine.ksprfs.ksprfs_engine_ignition_mode = engine.ksprfs.ksprfs_engine_ignition_mode.toString();
        engine.ksprfs.ksprfs_engine_tech_level = engine.ksprfs.ksprfs_engine_tech_level.toString();
    };

    $scope.prepareSaveData = function(engine) {
        engine.ksprfs.ksprfs_engine_mefx = engine.ksprfs.ksprfs_engine_mefx === true ? 'on' : null;
        engine.ksprfs.ksprfs_engine_bimodal = engine.ksprfs.ksprfs_engine_bimodal === true ? 'on' : null;
        engine.ksprfs.ksprfs_engine_ffsc = engine.ksprfs.ksprfs_engine_ffsc === true ? 'on' : null;
        engine.ksprfs.ksprfs_engine_dedicated = engine.ksprfs.ksprfs_engine_dedicated === true ? 'on' : null;
        engine.ksprfs.ksprfs_engine_vectoring_override = engine.ksprfs.ksprfs_engine_vectoring_override === true ? 'on' : null;
        engine.ksprfs.ksprfs_engine_vectoring_exists = engine.ksprfs.ksprfs_engine_vectoring_exists === true ? 'on' : null;

        if (!engine.ksprfs.ksprfs_engine_type) { engine.ksprfs.ksprfs_engine_type = []; }
        engine.ksprfs.ksprfs_engine_type[0] = $scope.getTypeBySlug(engine.ksprfs.ksprfs_type).id.toString();
    };

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

}]);
