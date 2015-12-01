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
        }
    };

});