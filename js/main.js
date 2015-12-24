(function($){

// Responsive functions. Adjust breakpoint(s) as needed
    function responsive() {
        // Do these on every screen resize


        // Do these on certain widths
        if ( $(window).width() > 600 ) { // above mobile size
            $('#primary-navigation .menu').removeAttr('style');
            $('#mobile-menu-button').removeClass('has-open');
        } else { // mobile size

        }
    }

    function onResize() {
        responsive();
    }

    var resizeTimer;

    window.onresize = function() {
        if (resizeTimer){
            clearTimeout(resizeTimer);
        }
        var res;
        res = setTimeout(function(){

            // Fire the onResize function.
            onResize();

        }, 200);
    };

// Find a query variable for use in scripts
    /*function getQueryVariable(variable)
     {
     var query = window.location.search.substring(1);
     var vars = query.split("&");
     for (var i=0;i<vars.length;i++) {
     var pair = vars[i].split("=");
     if(pair[0] == variable){return pair[1];}
     }
     return(false);
     }*/

// Nav menu click-to-open functions
    function navMenus() {
        // Any click outside of nav, close dropdowns
        $(document).click(function(e){
            if ( $(e.target).parents().index($('#primary-navigation')) == -1 && $(e.target).parents().index($('#mobile-menu-button')) == -1 ) { // if click anywhere but nav
                if ( $('.has-open').length > 0 ) {// if there are any open submenus
                    $('.menu-item-has-children.has-open .sub-menu').fadeOut(100).parent('.has-open').removeClass('has-open'); // close all submenus
                }
                var el = $('#mobile-menu-button'); // grab the mobile menu button
                if ( el.hasClass('has-open') ) { // if it's open
                    $('ul#menu-primary-navigation').fadeOut(100); // close the mobile menu
                    el.removeClass('has-open');
                    //toggleOpen(el); // toggle the open class
                }
            }
        });

        // Nav Dropdowns
        $('.menu-item-has-children > a').click(function(e){ // Any menu item with a sub-menu on click...
            e.preventDefault();
            $(this).siblings('.sub-menu').fadeToggle(100);

            // if we click to open a submenu and there is another menu already open, close the old one
            $(this).parent().siblings('.menu-item-has-children.has-open').each(function(){
                $(this).removeClass('has-open').find('.sub-menu').fadeOut(100);
                $(this).find('.menu-item-has-children.has-open').removeClass('has-open');
            });

            // mark the parent as having an open menu
            $(this).parent().toggleClass('has-open');
        });
        // Any click outside of nav, close dropdowns
        $(document).click(function(e){
            if ( $(e.target).parents().index($('#primary-navigation')) == -1 && $(e.target).parents().index($('#mobile-menu-button')) == -1) {
                if ( $('.has-open').length > 0 ) {
                    $('.menu-item-has-children.has-open .sub-menu').fadeOut(100).parent('.has-open').removeClass('has-open');
                }
                var el = $('#mobile-menu-button');
                if ( el.hasClass('has-open') ) {
                    $('ul#menu-primary-navigation').fadeOut(100);
                    el.removeClass('has-open');
                }
            }
        });

        // Mobile Nav Dropdown
        $('#mobile-menu-button').click(function(e){
            e.preventDefault();
            $('#primary-navigation .menu').fadeToggle(100);
            $(this).toggleClass('has-open');
        });
    }

    function selectButton() {
        $('body').on("click", "button#select", function(e){
            e.preventDefault();
            $('#selectable').click();
            selectText('selectable');
        });
    }

    function selectText(containerid) {
        var range;
        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(document.getElementById(containerid));
            range.select();
        } else if (window.getSelection) {
            window.getSelection().removeAllRanges();
            range = document.createRange();
            range.selectNode(document.getElementById(containerid));
            window.getSelection().addRange(range);
        }
    }

    $(window).load( function(){
        onResize();
    });

    $(document).ready(function(){
        navMenus();
        selectButton();
    });

})(jQuery);


angular.module('rfstockalikeServices', [])

.value( 'blankEngine', {

})

.factory('rfstockalikeConstants', function() {

    var constants = {
        thrustCurves : {
            '0' : "",
            '1' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.05 1.00 0 0\r\n        key = 0.95 0.50 0 0\r\n        key = 1.00 0.50",
            '2' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.05 1.00 0 0\r\n        key = 0.95 1.00 0 0\r\n        key = 1.00 0.50",
            '3' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.20 1.00 6 -0.2\r\n     key = 0.95 1.00 0  0.0\r\n     key = 1.00 0.50",
            '4' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.95 1.00 0 0\r\n        key = 1.00 0.50",
            '5' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.05 0.50 0 0\r\n        key = 0.95 1.00 0 0\r\n        key = 1.00 0.50",
            '6' : "key = 0.00 0.01\r\n        key = 0.01 0.01\r\n        key = 0.05 0.10 0.1 0.1\r\n    key = 0.88 0.10 0.1 0.1\r\n    key = 0.92 1.00\r\n        key = 0.95 1.00\r\n        key = 1.00 0.50"
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
        // type : ['config symbol', ISP table, EI Ignitions, ignore hypergolic ignition requirement]
        {
            'launch'            : ['L',  constants.launchIsp,     1,  false],
            'launch-plus'       : ['L+', constants.launchPlusIsp, 2,  false],
            'upper'             : ['U',  constants.upperIsp,      4,  false],
            'upper-plus'        : ['U+', constants.upperPlusIsp,  12, true],
            'orbital'           : ['O',  constants.orbitalIsp,    24, true],
            'nuclear-thermal'   : ['N',  constants.nuclearIsp,    0,  false],
            'solid'             : ['S',  constants.solidIsp,      1,  true],
            'solid-plus'        : ['S+', constants.solidPlusIsp,  1,  true],
            'aerospike'         : ['A',  constants.aerospikeIsp,  0,  true],
            'jet'               : ['J',  null,                    0,  true],
            'rcs'               : ['L',  constants.rcsIsp,        0,  true]
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
        },

        prepareSaveData : function(engine, $scope) {
            engine.ksprfs.ksprfs_engine_mefx = engine.ksprfs.ksprfs_engine_mefx === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_bimodal = engine.ksprfs.ksprfs_engine_bimodal === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_ffsc = engine.ksprfs.ksprfs_engine_ffsc === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_dedicated = engine.ksprfs.ksprfs_engine_dedicated === true ? 'on' : null;
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
                        engine.ksprfs.ksprfs_engine_configs[i].title += rfstockalikeConstants.thrustCurveNames[engine.ksprfs.ksprfs_engine_configs[i].config_thrust_curve];
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
        }

    };

}]);
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
        $http.get('/wp-json/wp/v2/engine-mod/?per_page=0')
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
        var result = $filter('filter')($scope.engines, function (data) {return parseInt(data.id) === parseInt(id);});
        return result[0];
    };

}]);

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


    if ( $scope.engines.length < 1 && parseInt(engineID) !== 0 ) {
        var promise = $http.get('/wp-json/wp/v2/engines/' + engineID)
            .success(function (data) {
                $scope.setEngine(data);
                rfengineServices.cleanData($scope.engine, $scope);
            });
        promises.push(promise);
    } else if( parseInt(engineID) === 0 ) {
        var promise = $http.get('/wp-content/themes/rfstockalike/data/blank.json')
            .success(function (data) {
                $scope.setEngine(data);
                rfengineServices.cleanData($scope.engine, $scope);
            });
        promises.push(promise);
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
    if ( $scope.enginesList.length < 1  ) {

        var baseLink = '/wp-json/wp/v2/engines/?filter[posts_per_page]=-1';

        $http.get(baseLink).success(function (data, status, headers) {
            angular.forEach(data, function (value, key) {
                // set up the engines list
                $scope.enginesList.push($scope.prepareEngineList(value));
            });

            $scope.setEngines(data);

            $scope.engineCount = data.length;

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

angular.module( 'rfsApp', ['ui.router', 'rfstockalikeBase', 'rfstockalikeEngines'] )

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){

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
        })
        .state('tabs.mods', {
            url: 'mods',
            views: {
                'main-tab' : {
                    templateUrl: RFS.partials + 'mods.html'
                }
            }
        })
        .state('tabs.singleMod', {
            url: 'mods/:slug',
            views: {
                'main-tab': {
                    templateUrl: RFS.partials + 'mods-single.html',
                    controller: 'RFSingleModController'
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

}])

.directive('rfConfig', function(){
    return {
        templateUrl: RFS.partials + 'engine-config.html'
    };
})

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
