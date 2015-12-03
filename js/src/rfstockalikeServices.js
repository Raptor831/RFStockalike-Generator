angular.module('rfstockalikeServices', [])

.factory('rfengineServices', function(){

    return {

        cleanData : function(engine) {

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
        },

        prepareSaveData : function(engine) {
            engine.ksprfs.ksprfs_engine_mefx = engine.ksprfs.ksprfs_engine_mefx === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_bimodal = engine.ksprfs.ksprfs_engine_bimodal === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_ffsc = engine.ksprfs.ksprfs_engine_ffsc === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_dedicated = engine.ksprfs.ksprfs_engine_dedicated === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_vectoring_override = engine.ksprfs.ksprfs_engine_vectoring_override === true ? 'on' : null;
            engine.ksprfs.ksprfs_engine_vectoring_exists = engine.ksprfs.ksprfs_engine_vectoring_exists === true ? 'on' : null;

            if (!engine.ksprfs.ksprfs_engine_type) { engine.ksprfs.ksprfs_engine_type = []; }
            engine.ksprfs.ksprfs_engine_type[0] = $scope.getTypeBySlug(engine.ksprfs.ksprfs_type).id.toString();
        },

        doTWR : function(engine) {
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

        },

        doIsp : function(engine) {

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
                maxFactor = $scope.engineTypeConfigs[engine.ksprfs.ksprfs_type][1][engine.ksprfs.ksprfs_engine_tech_level][6];
                result = Math.pow(500 + (8 * factor) / maxFactor, 1.03);
                engine.ksprfs.max_heat = Math.max(1450, Math.min(2400, result));
            } else {
                engine.ksprfs.max_heat = 1800;
            }

            engine.ksprfs.max_heat = Math.round(engine.ksprfs.max_heat, 0);
        },

        doConfigs : function(engine) {
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

});