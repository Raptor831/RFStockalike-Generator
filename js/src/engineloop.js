// IspSL, IspV, TWRwTP, AcTWR,  TrMult, MaMult, TWRInc, Throt
var launchIsp     = {
  'start' : [234,   260,  44.7,   67,     1.00,   1.00,   null,   1.00],
  '1'     : [248,   275,  54.2,   81.25,  1.15,   0.95,   1.21,   1.00],
  '2'     : [266, 	295,	66.8,   100.25,	1.32,  	0.88,  	1.23,  	1.00],
  '3'     : [279,	  310,	76.3,   114.5,	1.43,	  0.84,	  1.14,	  1.00],
  '4'     : [288,	  320,	82.7,	  124,	  1.50,	  0.81,	  1.08,	  0.80],
  '5'     : [295,	  327,	87.1,	  130.65,	1.55,   0.80,	  1.05,	  0.70],
  '6'     : [299,	  332,	90.3,	  135.4,	1.58,	  0.78,	  1.04,	  0.60],
  '7'     : [304,	  337,	93.4,	  140.15,	1.61,  	0.77,   1.03,	  0.60]
};
var launchPlusIsp = {
  'start' : [220,	268,	38.3,	 53.6,	1.00,	1.00,	null,	1.00],
  '1'     : [233,	283,	46.4,	 65,	  1.15,	0.95,	1.21,	1.00],
  '2'     : [250,	304,	57.3,	 80.2,	1.32,	0.88,	1.23,	0.80],
  '3'     : [262,	319,	65.4,	 91.6,	1.43,	0.84,	1.14,	0.75],
  '4'     : [271,	330,	70.9,	 99.2,	1.50,	0.81,	1.08,	0.70],
  '5'     : [277,	337,	74.6,	 104.5,	1.55,	0.80,	1.05,	0.65],
  '6'     : [281,	342,	77.4,	 108.3,	1.58,	0.78,	1.04,	0.60],
  '7'     : [285,	347,	80.1,	 112.1,	1.62,	0.77,	1.03,	0.50]
};
var upperIsp      = {
  'start' : [168,	280,	35.2,	44,	1.00,	1.00,	null,	1.00],
  '1'     : [185,	308,	48.8,	61,	1.26,	0.91,	1.39,	1.00],
  '2'     : [195,	325,	56.8,	71,	1.39,	0.86,	1.16,	1.00],
  '3'     : [201,	335,	61.6,	77,	1.46,	0.84,	1.08,	1.00],
  '4'     : [204,	340,	64,	  80,	1.50,	0.82,	1.04,	0.80],
  '5'     : [207,	345,	66.4,	83,	1.53,	0.81,	1.04,	0.75],
  '6'     : [210,	350,	68.8,	86,	1.56,	0.80,	1.04,	0.70],
  '7'     : [213,	355,	71.2,	89,	1.60,	0.79,	1.03,	0.60]
};
var upperPlusIsp  = {
  'start' : [102,	291,	25.4,	30.47,	1.00,	1.00,	null,	1.00],
  '1'     : [112,	320,	38.5,	46.20,	1.38,	0.91,	1.52,	1.00],
  '2'     : [118,	338,	46.2,	55.47,	1.57,	0.86,	1.20,	0.75],
  '3'     : [122,	348,	50.9,	61.02,	1.68,	0.84,	1.10,	0.40],
  '4'     : [124,	354,	53.2,	63.81,	1.72,	0.82,	1.05,	0.30],
  '5'     : [126,	359,	55.5,	66.59,	1.77,	0.81,	1.04,	0.20],
  '6'     : [127,	364,	57.8,	69.36,	1.82,	0.80,	1.04,	0.15],
  '7'     : [129,	369,	60.1,	72.14,	1.87,	0.79,	1.04,	0.10]
};
var orbitalIsp    = {
  'start' : [100,	286,	18.9,	21.71,	1.00,	1.00,	null,	1.00],
  '1'     : [110,	314,	25.8,	29.71,	1.24,	0.91,	1.37,	1.00],
  '2'     : [116,	332,	30.3,	34.86,	1.38,	0.86,	1.17,	0.75],
  '3'     : [120,	342,	32.8,	37.71,	1.45,	0.84,	1.08,	0.40],
  '4'     : [121,	347,	34,	  39.14,	1.48,	0.82,	1.04,	0.20],
  '5'     : [123,	352,	35.3,	40.57,	1.52,	0.81,	1.04,	0.15],
  '6'     : [125,	357,	36.5,	42.00,	1.55,	0.80,	1.03,	0.10],
  '7'     : [127,	362,	37.8,	43.43,	1.58,	0.79,	1.04,	0.10]
};
var solidIsp      = {
'start' : [200,	220,	4.347826087,	23,  1],
'1'     : [215,	235,	5.263157895,	19,  1],
'2'     : [230,	250,	6.25,	        16,  1],
'3'     : [240,	260,	7.142857143,	14,  1],
'4'     : [245,	268,	8.333333333,	12,  1],
'5'     : [255,	276,	10,	          10,  1],
'6'     : [260,	284,	11.11111111,	9,   1],
'7'     : [265,	290,	12.5,	        8,   1]
};
var solidPlusIsp  = {
  'start' : [160,	231,	4.761904762,	21,	 1],
  '1'     : [172,	247,	5.882352941,	17,	 1],
  '2'     : [184,	263,	7.142857143,	14,	 1],
  '3'     : [192,	273,	8.333333333,	12,	 1],
  '4'     : [196,	281,	10,	          10,	 1],
  '5'     : [204,	290,	12.5,	        8,	 1],
  '6'     : [208,	298,	14.28571429,	7,	 1],
  '7'     : [212,	305,	16.66666667,	6,	 1]
};
var nuclearIsp    = {'3'     : [380,	850,	1.46,	   1.679,	   1.00,	1.00,	null,	1.00],
  '4'     : [391,	875,	2,	     2.3,	     1.33,	0.97,	1.37,	1.00],
  '5'     : [407,	910,	2.4241,	 2.787715, 1.55,	0.93,	1.21,	1.00],
  '6'     : [416,	930,	4,   	   4.6,	     2.50,	0.91,	1.65,	1.00],
  '7'     : [429,	960,	6,	     6.9,	     3.64,	0.89,	1.50,	1.00],
  '8'     : [452,	1010,	8,	     9.2,	     4.61,	0.84,	1.33,	1.00]
};
var aerospikeIsp  = {'start' : [252,	280,	20.7,	28.94175,	1.00,	1.00,	null,	1.00],
  '1'     : [277,	308,	31.4,	43.89,	  1.38,	0.91,	1.52,	1.00],
  '2'     : [293,	325,	37.6,	52.6965,	1.56,	0.86,	1.20,	0.80],
  '3'     : [302,	335,	41.4,	57.969,	  1.67,	0.84,	1.10,	0.70],
  '4'     : [306,	340,	43.3,	60.6195,	1.72,	0.82,	1.05,	0.60],
  '5'     : [311,	345,	45.2,	63.25575,	1.77,	0.81,	1.04,	0.50],
  '6'     : [315,	350,	47.1,	65.892,	  1.82,	0.80,	1.04,	0.40],
  '7'     : [320,	355,	48.9,	68.52825,	1.86,	0.79,	1.04,	0.30]
};

// type : ['config symbol', ISP table, EI Ignitions, ignore hypergolic ignition requirement]
var engineTypeConfigs = {
  'launch':['L',launchIsp,1,false],
  'launch-plus':['L+',launchPlusIsp,2,false],
  'upper':['U',upperIsp,4,false],
  'upper-plus':['U+',upperPlusIsp,12,true],
  'orbital':['O',orbitalIsp,24,true],
  'nuclear-thermal':['N',nuclearIsp,0,false],
  'solid':['S',solidIsp,1,true],
  'solid-plus':['S+',solidPlusIsp,1,true],
  'aerospike':['A',aerospikeIsp,0,true],
  'jet':['J',null,0,true]
};

// MAKE LOOPABLE

// engine.meta.ksprfs === engine.meta.ksprfs
// $scope.engineTitle === engine.title

var doTWR = function(engine) {
  // TWR
  engine.meta.ksprfs.engine_twr = engine.meta.ksprfs.ksprfs_engine_thrust / 9.81 / engine.meta.ksprfs.ksprfs_engine_mass;

  // Goal TWR
  var ispsl_factor, ispv_factor, ispsl_exponent, ispv_exponent, ffsc_factor;

  // Scaling exponents for GTWR based on +/- standard IspSL and IspV. (i.e. more Isp = less GTWR)
  ispsl_exponent = ( engine.meta.ksprfs.ksprfs_engine_ispslm < 1 ? 0.9 : 4 );
  ispv_exponent = ( engine.meta.ksprfs.ksprfs_engine_ispvm < 1 ? 1.5 : 8 );

  // Scaling FFSC factor. (i.e. FFSC gives greater GTWR)
  ffsc_factor = ( engine.meta.ksprfs.ksprfs_engine_ffsc ? 1.33 : 1 );

  // Derive the two actual Isp factors
  ispsl_factor = Math.min( Math.max( Math.pow(engine.meta.ksprfs.ksprfs_engine_ispslm, ispsl_exponent), 0.5 ), 10 );
  ispv_factor  = Math.min( Math.max( Math.pow(engine.meta.ksprfs.ksprfs_engine_ispvm,  ispv_exponent),  0.5 ), 10 );

  // Calculate the GTWR finally
  engine.meta.ksprfs.engine_gtwr = $scope.engineTypeConfigs[engine.meta.ksprfs.ksprfs_type][1][engine.meta.ksprfs.ksprfs_engine_tech_level][2] / ispsl_factor / ispv_factor;

  // Compare actual to goal, set variable to true if within 5%
  if ( engine.meta.ksprfs.engine_twr > ( engine.meta.ksprfs.engine_gtwr * 0.95 ) && engine.meta.ksprfs.engine_twr < ( engine.meta.ksprfs.engine_gtwr * 1.05 ) ) {
    engine.meta.ksprfs.engine_twr_within_goal = true;
  } else {
    engine.meta.ksprfs.engine_twr_within_goal = false;
  }

  // Solids calculations
  if ( engine.meta.ksprfs.ksprfs_type === 'solid' || engine.meta.ksprfs.ksprfs_type === 'solid-plus' ) {
    // Calculate The Goal Percentage Case for solids
    engine.meta.ksprfs.engine_goal_percent_case = 1 / engine.meta.ksprfs.engine_gtwr * 100;

    // Calculate the actual percentage case for solids
    var extraMass = parseFloat(engine.meta.ksprfs.ksprfs_engine_extra_mass) || 0;
    var totalMass = engine.meta.ksprfs.ksprfs_engine_mass + extraMass;
    var gm = engine.meta.ksprfs.ksprfs_engine_mft_volume * 0.00178 + totalMass;
    //window.console.log(gm);
    engine.meta.ksprfs.engine_percent_case = totalMass / gm * 10;

    // Compare actual to goal, set variable to true if within 5%
    if ( engine.meta.ksprfs.engine_percent_case > ( engine.meta.ksprfs.engine_goal_percent_case * 0.95 ) && engine.meta.ksprfs.engine_percent_case < ( engine.meta.ksprfs.engine_goal_percent_case * 1.05 ) ) {
      engine.meta.ksprfs.engine_percent_case_within_goal = true;
    } else {
      engine.meta.ksprfs.engine_percent_case_within_goal = false;
    }

  } // end solids

};

var doIsp = function(engine) {

  // Get resultant base Isp from inputs
  var ispV, ispSL;
  ispV = $scope.engineTypeConfigs[engine.meta.ksprfs.ksprfs_type][1][engine.meta.ksprfs.ksprfs_engine_tech_level][1] * engine.meta.ksprfs.ksprfs_engine_ispvm;
  ispSL = $scope.engineTypeConfigs[engine.meta.ksprfs.ksprfs_type][1][engine.meta.ksprfs.ksprfs_engine_tech_level][0] * engine.meta.ksprfs.ksprfs_engine_ispslm;
  if ( engine.meta.ksprfs.ksprfs_engine_ffsc ) {
    ispV *= 1.07;
    ispSL *= 1.07;
  }
  engine.meta.ksprfs.resultIspV = ispV;
  engine.meta.ksprfs.resultIspSL = ispSL;

  // Calculate Isp modifiers for the individual MEC CONFIG nodes


};

var doHeat = function(engine) {
  var factor, maxFactor;

  // Heat production
  if ( engine.meta.ksprfs.ksprfs_type === 'solid' || engine.meta.ksprfs.ksprfs_type === 'solid-plus' ) {
    factor = Math.pow( ( engine.meta.ksprfs.ksprfs_engine_mft_volume * engine.meta.ksprfs.resultIspV / 4 / 9.81 / engine.meta.ksprfs.ksprfs_engine_thrust ) + 20, 0.75);
    engine.meta.ksprfs.engine_heat = Math.round( ( 200 + 5200 / factor ) * 0.5 );
  } else {
    // var factor = 135 * ( engine.meta.ksprfs.resultIspSL / 200 ) ^ 0.7 * ( engine.meta.ksprfs.engine_twr / engine.meta.ksprfs.engine_gtwr ) ^ 0.5 *IF(ISERR(FIND("N",Engines!H197)),1,1.25)),0)
    factor = 135 * Math.pow( (engine.meta.ksprfs.resultIspSL / 200), 0.7) * Math.pow( engine.meta.ksprfs.engine_twr / engine.meta.ksprfs.engine_gtwr, 0.5);
    if ( engine.meta.ksprfs.ksprfs_type === 'nuclear-thermal' ) { factor *= 1.25; }
    engine.meta.ksprfs.engine_heat = factor;
  }

  // Maximum heat for the engine
  if ( engine.meta.ksprfs.ksprfs_type !== 'solid' && engine.meta.ksprfs.ksprfs_type !== 'solid-plus' ) {
    var result;
    maxFactor = $scope.engineTypeConfigs[engine.meta.ksprfs.ksprfs_type][1][engine.meta.ksprfs.ksprfs_engine_tech_level][6];
    result = Math.pow(500 + (8 * factor) / maxFactor, 1.03);
    engine.meta.ksprfs.max_heat = Math.max(1450, Math.min(2400, result));
  } else {
    engine.meta.ksprfs.max_heat = 1800;
  }

  engine.meta.ksprfs.max_heat = Math.round(engine.meta.ksprfs.max_heat, 0);
};

var doConfigs = function(engine) {
  // Do all the work for each engine config in this loop
  var i;
  for(i = 0; i < engine.meta.ksprfs.ksprfs_engine_configs.length; i++) {
    // Convert mass ratio into KSP unit ratios (out of 100)
    var fuelDensity = $scope.getFuel($scope.getMixture(engine.meta.ksprfs.ksprfs_engine_configs[i].config_mixture)).meta.ksprfs.ksprfs_resource_density;
    var oxyDensity = $scope.getOxidizer($scope.getMixture(engine.meta.ksprfs.ksprfs_engine_configs[i].config_mixture)).meta.ksprfs.ksprfs_resource_density;
    //window.console.log($scope.getFuel($scope.getMixture(engine.meta.ksprfs.ksprfs_engine_configs[i].config_mixture)));
    var ratio = engine.meta.ksprfs.ksprfs_engine_configs[i].config_ratio;
    engine.meta.ksprfs.ksprfs_engine_configs[i].fuelRatio = (1 / fuelDensity / ( 1 / fuelDensity + (ratio/oxyDensity) )) * 100;
    engine.meta.ksprfs.ksprfs_engine_configs[i].oxyRatio = 100 - engine.meta.ksprfs.ksprfs_engine_configs[i].fuelRatio;

    // Find Isp multiplier values
    var ispV, ispSL;
    ispV = ispSL = 1.0;

    // Do EI configs
    doIgnitions(engine.meta.ksprfs.ksprfs_engine_configs[i]);

  }
};

var doIgnitions = function(config) {
  // =IF(H305="L",1,IF(H305="L+",2,IF(H305="U",4,IF(H305="U+",12,IF(H305="A",4,IF(H305="O",24,IF(H305="","",0)))))))
  // get standard ingitions
  var ignitions = $scope.engineTypeConfigs[engine.meta.ksprfs.ksprfs_type][2];
  var typeOverride = $scope.engineTypeConfigs[engine.meta.ksprfs.ksprfs_type][3];
};

var displayTechLevel = function(engine) {
  var tl = engine.meta.ksprfs.ksprfs_engine_tech_level;
  if (tl === 'start') { tl = '0'; }
  return tl;
};

// END MAKE LOOPABLE
