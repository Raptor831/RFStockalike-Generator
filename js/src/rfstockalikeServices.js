angular.module('rfstockalikeServices', [])

.factory('rfstockalikeConstants', function() {

    var constants = {
        thrustCurves : {
            '0' : "", //Stock

            //Increasing Curve
            '1' : "key = 0.00000 0.01000 0 0\r\n        " +
                  "key = 0.00077 0.01000 0 0\r\n        " +
                  "key = 0.01234 0.15000\r\n        " +
                  "key = 0.05089 0.50000\r\n        " +
                  "key = 0.11642 0.85000\r\n        " +
                  "key = 0.19352 1.00000 0 0\r\n        " +
                  "key = 0.27062 1.00000 0 0\r\n        " +
                  "key = 0.34618 0.98000\r\n        " +
                  "key = 0.41557 0.90000\r\n        " +
                  "key = 0.47957 0.83000\r\n        " +
                  "key = 0.53816 0.76000\r\n        " +
                  "key = 0.59368 0.72000\r\n        " +
                  "key = 0.64611 0.68000\r\n        " +
                  "key = 0.69545 0.64000\r\n        " +
                  "key = 0.74171 0.60000\r\n        " +
                  "key = 0.78543 0.56700\r\n        " +
                  "key = 0.82652 0.53300\r\n        " +
                  "key = 0.86507 0.50000\r\n        " +
                  "key = 0.90170 0.47500\r\n        " +
                  "key = 0.93639 0.45000\r\n        " +
                  "key = 0.96916 0.42500\r\n        " +
                  "key = 1.00000 0.40000",

            //Steady curve
            '2' : "key = 0.00000 0.01000 0 0\r\n        " +
                  "key = 0.00058 0.01000 0 0\r\n        " +
                  "key = 0.00927 0.15000\r\n        " +
                  "key = 0.03824 0.50000\r\n        " +
                  "key = 0.08749 0.85000\r\n        " +
                  "key = 0.14542 1.00000 0 0\r\n        " +
                  "key = 0.20336 1.00000 0 0\r\n        " +
                  "key = 0.26130 1.00000 0 0\r\n        " +
                  "key = 0.31924 1.00000 0 0\r\n        " +
                  "key = 0.37717 1.00000 0 0\r\n        " +
                  "key = 0.43511 1.00000 0 0\r\n        " +
                  "key = 0.49305 1.00000 0 0\r\n        " +
                  "key = 0.55098 1.00000 0 0\r\n        " +
                  "key = 0.60892 1.00000 0 0\r\n        " +
                  "key = 0.66686 1.00000 0 0\r\n        " +
                  "key = 0.72480 1.00000 0 0\r\n        " +
                  "key = 0.78273 1.00000 0 0\r\n        " +
                  "key = 0.84067 1.00000 0 0\r\n        " +
                  "key = 0.89861 1.00000 0 0\r\n        " +
                  "key = 0.95365 0.95000\r\n        " +
                  "key = 1.00000 0.80000",

            //Steady Dip curve
            '3' : "key = 0.00000 0.01000 0 0\r\n        " +
                  "key = 0.00041 0.01000 0 0\r\n        " +
                  "key = 0.00244 0.05000\r\n        " +
                  "key = 0.00652 0.10000\r\n        " +
                  "key = 0.01467 0.20000\r\n        " +
                  "key = 0.02689 0.30000\r\n        " +
                  "key = 0.04523 0.45000\r\n        " +
                  "key = 0.07253 0.67000\r\n        " +
                  "key = 0.11125 0.95000\r\n        " +
                  "key = 0.15200 1.00000 0 0\r\n        " +
                  "key = 0.19275 1.00000 0 0\r\n        " +
                  "key = 0.23227 0.97000\r\n        " +
                  "key = 0.27058 0.94000\r\n        " +
                  "key = 0.30807 0.92000\r\n        " +
                  "key = 0.34474 0.90000\r\n        " +
                  "key = 0.38060 0.88000\r\n        " +
                  "key = 0.41606 0.87000\r\n        " +
                  "key = 0.45110 0.86000\r\n        " +
                  "key = 0.48574 0.85000\r\n        " +
                  "key = 0.51997 0.84000\r\n        " +
                  "key = 0.55420 0.84000\r\n        " +
                  "key = 0.58883 0.85000\r\n        " +
                  "key = 0.62388 0.86000\r\n        " +
                  "key = 0.65933 0.87000\r\n        " +
                  "key = 0.69519 0.88000\r\n        " +
                  "key = 0.73187 0.90000\r\n        " +
                  "key = 0.76936 0.92000\r\n        " +
                  "key = 0.80766 0.94000\r\n        " +
                  "key = 0.84719 0.97000\r\n        " +
                  "key = 0.88794 1.00000 0 0\r\n        " +
                  "key = 0.92869 1.00000 0 0\r\n        " +
                  "key = 0.96740 0.95000\r\n        " +
                  "key = 1.00000 0.80000",

            // Decreasing curve
            '4' : "key = 0.00000 0.01000 0 0\r\n        " +
                  "key = 0.00057 0.01000 0 0\r\n        " +
                  "key = 0.00905 0.15000\r\n        " +
                  "key = 0.02658 0.31000\r\n        " +
                  "key = 0.04581 0.34000\r\n        " +
                  "key = 0.06674 0.37000\r\n        " +
                  "key = 0.08937 0.40000\r\n        " +
                  "key = 0.11369 0.43000\r\n        " +
                  "key = 0.13971 0.46000\r\n        " +
                  "key = 0.16742 0.49000\r\n        " +
                  "key = 0.19683 0.52000\r\n        " +
                  "key = 0.22794 0.55000\r\n        " +
                  "key = 0.26075 0.58000\r\n        " +
                  "key = 0.29525 0.61000\r\n        " +
                  "key = 0.33145 0.64000\r\n        " +
                  "key = 0.36934 0.67000\r\n        " +
                  "key = 0.40894 0.70000\r\n        " +
                  "key = 0.45023 0.73000\r\n        " +
                  "key = 0.49321 0.76000\r\n        " +
                  "key = 0.53790 0.79000\r\n        " +
                  "key = 0.58428 0.82000\r\n        " +
                  "key = 0.63235 0.85000\r\n        " +
                  "key = 0.68213 0.88000\r\n        " +
                  "key = 0.73360 0.91000\r\n        " +
                  "key = 0.78676 0.94000\r\n        " +
                  "key = 0.84163 0.97000\r\n        " +
                  "key = 0.89819 1.00000 0 0\r\n        " +
                  "key = 0.95475 1.00000 0 0\r\n        " +
                  "key = 1.00000 0.80000",

            // Decreasing dip curve
            '5' : "key = 0.00000 0.01000 0 0\r\n        " +
                  "key = 0.00058 0.01000 0 0\r\n        " +
                  "key = 0.00930 0.15000\r\n        " +
                  "key = 0.02733 0.31000\r\n        " +
                  "key = 0.04709 0.34000\r\n        " +
                  "key = 0.06860 0.37000\r\n        " +
                  "key = 0.09186 0.40000\r\n        " +
                  "key = 0.11686 0.43000\r\n        " +
                  "key = 0.14360 0.46000\r\n        " +
                  "key = 0.17209 0.49000\r\n        " +
                  "key = 0.20233 0.52000\r\n        " +
                  "key = 0.23430 0.55000\r\n        " +
                  "key = 0.26802 0.58000\r\n        " +
                  "key = 0.30291 0.60000\r\n        " +
                  "key = 0.33895 0.62000\r\n        " +
                  "key = 0.37616 0.64000\r\n        " +
                  "key = 0.41453 0.66000\r\n        " +
                  "key = 0.45407 0.68000\r\n        " +
                  "key = 0.49477 0.70000\r\n        " +
                  "key = 0.53663 0.72000\r\n        " +
                  "key = 0.57965 0.74000\r\n        " +
                  "key = 0.62558 0.79000\r\n        " +
                  "key = 0.67442 0.84000\r\n        " +
                  "key = 0.72616 0.89000\r\n        " +
                  "key = 0.78081 0.94000\r\n        " +
                  "key = 0.83721 0.97000\r\n        " +
                  "key = 0.89535 1.00000 0 0\r\n        " +
                  "key = 0.95349 1.00000 0 0\r\n        " +
                  "key = 1.00000 0.80000",

            //Pulse Steady curve
            '6' : "key = 0.00000 0.01000 0 0\r\n        " +
                  "key = 0.00065 0.01000 0 0\r\n        " +
                  "key = 0.00523 0.07000\r\n        " +
                  "key = 0.01504 0.15000\r\n        " +
                  "key = 0.03139 0.25000\r\n        " +
                  "key = 0.04774 0.25000\r\n        " +
                  "key = 0.06409 0.25000\r\n        " +
                  "key = 0.08044 0.25000\r\n        " +
                  "key = 0.09680 0.25000\r\n        " +
                  "key = 0.11315 0.25000\r\n        " +
                  "key = 0.12950 0.25000\r\n        " +
                  "key = 0.14585 0.25000\r\n        " +
                  "key = 0.16220 0.25000\r\n        " +
                  "key = 0.17855 0.25000\r\n        " +
                  "key = 0.19490 0.25000\r\n        " +
                  "key = 0.21125 0.25000\r\n        " +
                  "key = 0.22760 0.25000\r\n        " +
                  "key = 0.24395 0.25000\r\n        " +
                  "key = 0.26030 0.25000\r\n        " +
                  "key = 0.27665 0.25000\r\n        " +
                  "key = 0.29300 0.25000\r\n        " +
                  "key = 0.31131 0.28000\r\n        " +
                  "key = 0.33290 0.33000\r\n        " +
                  "key = 0.36560 0.50000\r\n        " +
                  "key = 0.41465 0.75000\r\n        " +
                  "key = 0.47351 0.90000\r\n        " +
                  "key = 0.53630 0.96000\r\n        " +
                  "key = 0.60105 0.99000\r\n        " +
                  "key = 0.66645 1.00000 0 0\r\n        " +
                  "key = 0.73185 1.00000 0 0\r\n        " +
                  "key = 0.79660 0.99000\r\n        " +
                  "key = 0.85939 0.96000\r\n        " +
                  "key = 0.91825 0.90000\r\n        " +
                  "key = 0.96730 0.75000\r\n        " +
                  "key = 1.00000 0.50000"
        },
        thrustCurveNames : {
            '0' : "Stock",
            '1' : "Increasing",
            '2' : "Steady",
            '3' : "SteadyDip",
            '4' : "Decreasing",
            '5' : "DecreasingDip",
            '6' : "PulseSteady"
        },
        // Isp charts for each engine type
        //             IspSL, IspV, TWRwTP, AcTWR,  TrMult, MaMult, TWRInc, Throt
        launchIsp : {
            'start' : [234,   260,  44.7,   67,     1.00,   1.00,   null,   1.00],
            '1'     : [248,   275,  54.2,   81.25,  1.15,   0.95,   1.21,   1.00],
            '2'     : [266,   295,	66.8,   100.25,	1.32,  	0.88,  	1.23,  	1.00],
            '3'     : [279,	  310,	76.3,   114.5,	1.43,	0.84,	1.14,   1.00],
            '4'     : [288,	  320,	82.7,	124,	1.50,	0.81,	1.08,	0.80],
            '5'     : [295,	  327,	87.1,	130.65,	1.55,   0.80,	1.05,	0.70],
            '6'     : [299,	  332,	90.3,	135.4,	1.58,	0.78,	1.04,	0.60],
            '7'     : [304,	  337,	93.4,	140.15,	1.61,  	0.77,   1.03,	0.60]
        },
        launchPlusIsp : {
            'start' : [220,	268,	38.3,	 53.6,	1.00,	1.00,	null,	1.00],
            '1'     : [233,	283,	46.4,	 65,	  1.15,	0.95,	1.21,	1.00],
            '2'     : [250,	304,	57.3,	 80.2,	1.32,	0.88,	1.23,	0.80],
            '3'     : [262,	319,	65.4,	 91.6,	1.43,	0.84,	1.14,	0.75],
            '4'     : [271,	330,	70.9,	 99.2,	1.50,	0.81,	1.08,	0.70],
            '5'     : [277,	337,	74.6,	 104.5,	1.55,	0.80,	1.05,	0.65],
            '6'     : [281,	342,	77.4,	 108.3,	1.58,	0.78,	1.04,	0.60],
            '7'     : [285,	347,	80.1,	 112.1,	1.62,	0.77,	1.03,	0.50]
        },
        upperIsp : {
            'start' : [168,	280,	35.2,	44,	1.00,	1.00,	null,	1.00],
            '1'     : [185,	308,	48.8,	61,	1.26,	0.91,	1.39,	1.00],
            '2'     : [195,	325,	56.8,	71,	1.39,	0.86,	1.16,	1.00],
            '3'     : [201,	335,	61.6,	77,	1.46,	0.84,	1.08,	1.00],
            '4'     : [204,	340,	64,	    80,	1.50,	0.82,	1.04,	0.80],
            '5'     : [207,	345,	66.4,	83,	1.53,	0.81,	1.04,	0.75],
            '6'     : [210,	350,	68.8,	86,	1.56,	0.80,	1.04,	0.70],
            '7'     : [213,	355,	71.2,	89,	1.60,	0.79,	1.03,	0.60]
        },
        upperPlusIsp : {
            'start' : [102,	291,	25.4,	30.47,	1.00,	1.00,	null,	1.00],
            '1'     : [112,	320,	38.5,	46.20,	1.38,	0.91,	1.52,	1.00],
            '2'     : [118,	338,	46.2,	55.47,	1.57,	0.86,	1.20,	0.75],
            '3'     : [122,	348,	50.9,	61.02,	1.68,	0.84,	1.10,	0.40],
            '4'     : [124,	354,	53.2,	63.81,	1.72,	0.82,	1.05,	0.30],
            '5'     : [126,	359,	55.5,	66.59,	1.77,	0.81,	1.04,	0.20],
            '6'     : [127,	364,	57.8,	69.36,	1.82,	0.80,	1.04,	0.15],
            '7'     : [129,	369,	60.1,	72.14,	1.87,	0.79,	1.04,	0.10]
        },
        orbitalIsp : {
            'start' : [100,	286,	18.9,	21.71,	1.00,	1.00,	null,	1.00],
            '1'     : [110,	314,	25.8,	29.71,	1.24,	0.91,	1.37,	1.00],
            '2'     : [116,	332,	30.3,	34.86,	1.38,	0.86,	1.17,	0.75],
            '3'     : [120,	342,	32.8,	37.71,	1.45,	0.84,	1.08,	0.40],
            '4'     : [121,	347,	34,	    39.14,	1.48,	0.82,	1.04,	0.20],
            '5'     : [123,	352,	35.3,	40.57,	1.52,	0.81,	1.04,	0.15],
            '6'     : [125,	357,	36.5,	42.00,	1.55,	0.80,	1.03,	0.10],
            '7'     : [127,	362,	37.8,	43.43,	1.58,	0.79,	1.04,	0.10]
        },
        solidIsp : {
            'start' : [200,	220,	4.347826087,	23,  1],
            '1'     : [215,	235,	5.263157895,	19,  1],
            '2'     : [230,	250,	6.25,	        16,  1],
            '3'     : [240,	260,	7.142857143,	14,  1],
            '4'     : [245,	268,	8.333333333,	12,  1],
            '5'     : [255,	276,	10,	            10,  1],
            '6'     : [260,	284,	11.11111111,	9,   1],
            '7'     : [265,	290,	12.5,	        8,   1]
        },
        solidPlusIsp : {
            'start' : [160,	231,	4.761904762,	21,	 1],
            '1'     : [172,	247,	5.882352941,	17,	 1],
            '2'     : [184,	263,	7.142857143,	14,	 1],
            '3'     : [192,	273,	8.333333333,	12,	 1],
            '4'     : [196,	281,	10,	          10,	 1],
            '5'     : [204,	290,	12.5,	        8,	 1],
            '6'     : [208,	298,	14.28571429,	7,	 1],
            '7'     : [212,	305,	16.66666667,	6,	 1]
        },
        nuclearIsp : {
            '3'     : [380,	850,	1.46,	 1.679,      1.00,	1.00,	null,	1.00],
            '4'     : [391,	875,	2,	     2.3,	     1.33,	0.97,	1.37,	1.00],
            '5'     : [407,	910,	2.4241,	 2.787715,   1.55,	0.93,	1.21,	1.00],
            '6'     : [416,	930,	4,   	 4.6,	     2.50,	0.91,	1.65,	1.00],
            '7'     : [429,	960,	6,	     6.9,	     3.64,	0.89,	1.50,	1.00],
            '8'     : [452,	1010,	8,	     9.2,	     4.61,	0.84,	1.33,	1.00]
        },
        aerospikeIsp : {
            'start' : [252,	280,	20.7,	28.94175,	1.00,	1.00,	null,	1.00],
            '1'     : [277,	308,	31.4,	43.89,	    1.38,	0.91,	1.52,	1.00],
            '2'     : [293,	325,	37.6,	52.6965,	1.56,	0.86,	1.20,	0.80],
            '3'     : [302,	335,	41.4,	57.969,	    1.67,	0.84,	1.10,	0.70],
            '4'     : [306,	340,	43.3,	60.6195,	1.72,	0.82,	1.05,	0.60],
            '5'     : [311,	345,	45.2,	63.25575,	1.77,	0.81,	1.04,	0.50],
            '6'     : [315,	350,	47.1,	65.892,	    1.82,	0.80,	1.04,	0.40],
            '7'     : [320,	355,	48.9,	68.52825,	1.86,	0.79,	1.04,	0.30]
        },
        rcsIsp : {
            'start' : [351,   366,  44.7,   67,     1.00,   1.00,   null,   1.00],
            '1'     : [370,   390,  54.2,   81.25,  1.15,   0.95,   1.21,   1.00],
            '2'     : [399,   416,	66.8,   100.25,	1.32,  	0.88,  	1.23,  	1.00],
            '3'     : [418,	  437,	76.3,   114.5,	1.43,	0.84,	1.14,   1.00],
            '4'     : [432,	  451,	82.7,	124,    1.50,	0.81,   1.08,   0.80],
            '5'     : [442,	  461,	87.1,	130.65,	1.55,   0.80,	1.05,   0.70],
            '6'     : [448,	  468,	90.3,	135.4,	1.58,	0.78,	1.04,   0.60],
            '7'     : [456,	  475,	93.4,	140.15,	1.61,  	0.77,   1.03,   0.60]
        },
        // RCS default config settings
        rcsDefaultConfigs : [
            {"config_mixture":135,"config_ratio":0,"config_tech_node":""},
            {"config_mixture":134,"config_ratio":0,"config_tech_node":""},
            {"config_mixture":178,"config_ratio":1.6,"config_tech_node":""},
            {"config_mixture":138,"config_ratio":0,"config_tech_node":""},
            {"config_mixture":137,"config_ratio":0,"config_tech_node":""},
            {"config_mixture":177,"config_ratio":2,"config_tech_node":""},
            {"config_mixture":180,"config_ratio":1.7,"config_tech_node":""},
            {"config_mixture":888,"config_ratio":0,"config_tech_node":""}
        ]
    };
    constants.engineTypeConfigs =
        // Engine type defaults array
        // type : ['config symbol', ISP table, EI Ignitions, ignore hypergolic ignition requirement, pressure fed]
        {
            'launch'            : ['L',  constants.launchIsp,     1,  false,    false],
            'launch-plus'       : ['L+', constants.launchPlusIsp, 2,  false,    false],
            'upper'             : ['U',  constants.upperIsp,      4,  false,    false],
            'upper-plus'        : ['U+', constants.upperPlusIsp,  12, true,     false],
            'orbital'           : ['O',  constants.orbitalIsp,    24, true,     true],
            'nuclear-thermal'   : ['N',  constants.nuclearIsp,    0,  false,    false],
            'solid'             : ['S',  constants.solidIsp,      1,  true,     false],
            'solid-plus'        : ['S+', constants.solidPlusIsp,  1,  true,     false],
            'aerospike'         : ['A',  constants.aerospikeIsp,  0,  true,     false],
            'jet'               : ['J',  null,                    0,  true,     false],
            'rcs'               : ['L',  constants.rcsIsp,        0,  true,     true]
        };

    return constants;
})

.factory('rfengineServices', ['rfstockalikeConstants', function(rfstockalikeConstants){

    return {

        cleanData : function(engine, $scope) {

            // Checkboxes (checking for all possible values from CMB2 or RFStockalike)
            engine.ksprfs.ksprfs_engine_mefx = engine.ksprfs.ksprfs_engine_mefx === 'on' || engine.ksprfs.ksprfs_engine_mefx == true ? true : false;
            engine.ksprfs.ksprfs_engine_bimodal = engine.ksprfs.ksprfs_engine_bimodal === 'on' || engine.ksprfs.ksprfs_engine_bimodal == true ? true : false;
            engine.ksprfs.ksprfs_engine_ffsc = engine.ksprfs.ksprfs_engine_ffsc === 'on' || engine.ksprfs.ksprfs_engine_ffsc == true ? true : false;
            engine.ksprfs.ksprfs_engine_dedicated = engine.ksprfs.ksprfs_engine_dedicated === 'on' || engine.ksprfs.ksprfs_engine_dedicated == true ? true : false;
            engine.ksprfs.ksprfs_engine_pressure_fed = engine.ksprfs.ksprfs_engine_pressure_fed === 'on' || engine.ksprfs.ksprfs_engine_pressure_fed == true ? true : false;
            engine.ksprfs.ksprfs_engine_vectoring_override = engine.ksprfs.ksprfs_engine_vectoring_override === 'on' || engine.ksprfs.ksprfs_engine_vectoring_override == true ? true : false;
            engine.ksprfs.ksprfs_engine_vectoring_exists = engine.ksprfs.ksprfs_engine_vectoring_exists === 'on' || engine.ksprfs.ksprfs_engine_vectoring_exists == true ? true : false;

            // Check for valid data
            engine.ksprfs.ksprfs_engine_vectoring = parseInt(engine.ksprfs.ksprfs_engine_vectoring) ? parseInt(engine.ksprfs.ksprfs_engine_vectoring) : 0;
            if (engine.ksprfs.ksprfs_engine_type && !engine.ksprfs.ksprfs_type) {
                var type = $scope.getType(engine.ksprfs.ksprfs_engine_type[0]);
                engine.ksprfs.ksprfs_type = type ? type.slug : 'launch';
            }

            if ( !engine.ksprfs.ksprfs_engine_flow ) {
                engine.ksprfs.ksprfs_engine_flow = 'STACK_PRIORITY_SEARCH';
            }

            engine.ksprfs.ksprfs_engine_ignition_mode = engine.ksprfs.ksprfs_engine_ignition_mode.toString();
            engine.ksprfs.ksprfs_engine_tech_level = engine.ksprfs.ksprfs_engine_tech_level.toString();
            if( typeof engine.ksprfs.ksprfs_engine_pressure_fed === 'undefined' ) engine.ksprfs.ksprfs_engine_pressure_fed = false;
        },

        prepareSaveData : function(engine, $scope) {
            engine.ksprfs.ksprfs_engine_mefx = engine.ksprfs.ksprfs_engine_mefx === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_bimodal = engine.ksprfs.ksprfs_engine_bimodal === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_ffsc = engine.ksprfs.ksprfs_engine_ffsc === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_dedicated = engine.ksprfs.ksprfs_engine_dedicated === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_pressure_fed = engine.ksprfs.ksprfs_engine_pressure_fed === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_vectoring_override = engine.ksprfs.ksprfs_engine_vectoring_override === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_vectoring_exists = engine.ksprfs.ksprfs_engine_vectoring_exists === true ? 'on' : null;

            if (!engine.ksprfs.ksprfs_engine_type) { engine.ksprfs.ksprfs_engine_type = []; }
            engine.ksprfs.ksprfs_engine_type[0] = $scope.getTypeBySlug(engine.ksprfs.ksprfs_type).id.toString();
        },

        doTWR : function(engine, $scope) {
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
            engine.ksprfs.engine_gtwr = rfstockalikeConstants.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][2] / ispsl_factor / ispv_factor * ffsc_factor;

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
                    engine.finalThrottle = rfstockalikeConstants.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][7];
                    break;
                case 'use-default-tech':
                    var tech = $scope.engine.ksprfs.ksprfs_engine_throttle_tl;
                    if (tech === 'start') { tech = '0'; }
                    engine.finalThrottle = tech;
                    if ( ! parseInt(engine.finalThrottle) ) { engine.finalThrottle = 0; }
                    break;
                case 'custom-throttle':
                    engine.finalThrottle = Math.round( (engine.ksprfs.ksprfs_engine_throttle * rfstockalikeConstants.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][7])*1000) / 1000;
                    if ( ! parseFloat(engine.finalThrottle) ) { engine.finalThrottle = 0; }
                    break;
                default:
                    engine.finalThrottle = 0;
            }

            if ( engine.ksprfs.ksprfs_type === 'rcs' ) {
                engine.finalThrottle = 0;
            }

        },

        doIsp : function(engine) {

            // Get resultant base Isp from inputs
            var ispV, ispSL;
            ispV = rfstockalikeConstants.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][1] * engine.ksprfs.ksprfs_engine_ispvm;
            ispSL = rfstockalikeConstants.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][0] * engine.ksprfs.ksprfs_engine_ispslm;
            if ( engine.ksprfs.ksprfs_engine_ffsc ) {
                ispV *= 1.07;
                ispSL *= 1.07;
            }
            engine.ksprfs.resultIspV = ispV;
            engine.ksprfs.resultIspSL = ispSL;

        },

        doHeat : function(engine) {
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
                maxFactor = rfstockalikeConstants.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][6];
                result = Math.pow(500 + (8 * factor) / maxFactor, 1.03);
                engine.ksprfs.max_heat = Math.max(1450, Math.min(2400, result));
            } else {
                engine.ksprfs.max_heat = 1800;
            }

            engine.ksprfs.max_heat = Math.round(engine.ksprfs.max_heat, 0);
        },

        doConfigs : function(engine, $scope) {
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
                if ( typeof ignitions === 'undefined' && ignitions !== '' ) { ignitions = 0; }
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

                // For the outer config, if ignitions aren't 0 use abs value, else use -1 for infinite
                engine.ksprfs.ksprfs_engine_configs[i].ignitionsPart = engine.ksprfs.ksprfs_engine_configs[i].ignitions ? Math.abs(engine.ksprfs.ksprfs_engine_configs[i].ignitions) : -1;
                if ( ignitions < 0 ) {
                    engine.ksprfs.ksprfs_engine_configs[i].ignitionsPart = Math.max(1, parseInt(this.displayTechLevel(engine)) + ignitions);
                }

                engine.ksprfs.ksprfs_engine_configs[i].title = JSON.parse(JSON.stringify( mixture.title ));
                if ( engine.ksprfs.ksprfs_engine_configs[i].config_thrust_curve && engine.ksprfs.ksprfs_engine_configs[i].config_thrust_curve != '0' ) {
                    if ( engine.ksprfs.ksprfs_engine_configs[i].config_thrust_curve === '-1' ) {
                        engine.ksprfs.ksprfs_engine_configs[i].title.rendered += 'Custom'+(i+1);
                    } else {
                        engine.ksprfs.ksprfs_engine_configs[i].title.rendered += rfstockalikeConstants.thrustCurveNames[engine.ksprfs.ksprfs_engine_configs[i].config_thrust_curve];
                    }
                }
            }
        },

        doCost : function(engine) {
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
        },

        displayTechLevel : function(engine) {
            var tl = engine.ksprfs.ksprfs_engine_tech_level;
            if (tl === 'start') { tl = '0'; }
            return tl;
        }

    };

}]);