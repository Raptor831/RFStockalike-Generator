<?php
global $cmb2_prefix, $meta_boxes;
/**
 * Include and setup custom metaboxes and fields. (make sure you copy this file to outside the CMB directory)
 *
 * @category YourThemeOrPlugin
 * @package  Metaboxes
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/webdevstudios/Custom-Metaboxes-and-Fields-for-WordPress
 */

/**
 * Get the bootstrap! If using the plugin from wordpress.org, REMOVE THIS!
 */
//require_once  __DIR__ . '/CMB2/init.php';

/**
* Gets a number of posts and displays them as options
* @param  array $query_args Optional. Overrides defaults.
* @return array             An array of options that matches the CMB options array
*/
function cmb_get_post_options( $query_args, $add_blank ) {

	$args = wp_parse_args( $query_args, array(
		'post_type' => 'post',
		'posts_per_page' => 10,
	) );

	$posts = get_posts( $args );

	$post_options = array();
	if ( $add_blank ) {
		//$post_options[] = array('name' => '-- None --', 'value' => 0);
		$post_options['0'] = '-- None --';
	}
	if ( $posts ) {
		foreach ( $posts as $post ) {
			/*$post_options[] = array(
				'name' => $post->post_title,
				'value' => intval($post->ID)
			);*/
			$post_options[$post->ID] = $post->post_title;
		}
	}

	return $post_options;
}

// render numbers
add_action( 'cmb2_render_text_number', 'sm_cmb_render_text_number', 10, 5 );
function sm_cmb_render_text_number( $field_object, $escaped_value, $object_id, $object_type, $field_type_object ) {
	echo $field_type_object->input( array( 'class' => 'cmb_text_small', 'type' => 'number' ) );
}

// validate the field
add_filter( 'cmb2_validate_text_number', 'sm_cmb_validate_text_number' );
function sm_cmb_validate_text_number( $new ) {
	$new = preg_replace( "/[^0-9\.]/", "", $new );

	return $new;
}

/**
 * Helper functions for validation/sanitization and escaping
 */
function validate_float($number) {
	$safe_number = floatval($number);
	if ( ! $safe_number ) {
		$safe_number = 0.0;
	}
	return $safe_number;
}
function validate_int($number) {
	$safe_number = intval($number);
	if ( ! $safe_number ) {
		$safe_number = 0;
	}
	return $safe_number;
}
function validate_percent($number) {
	$safe_number = validate_float($number);
	$safe_number = abs($safe_number);
	if ( $safe_number > 100 ) $safe_number = 100;
	return $safe_number;
}
function validate_percent_over($number) {
	$safe_number = validate_float($number);
	$safe_number = abs($safe_number);
	return $safe_number;
}
function validate_ignitions($number) {
	$safe_number = validate_int($number);
	if ( $safe_number < -1 ) $safe_number = -1;
	return $safe_number;
}

add_filter( 'cmb2_meta_boxes', 'cmb2_ksprfs_metaboxes' );
/**
 * Define the metabox and field configurations.
 *
 * @param  array $meta_boxes
 * @return array
 */
function cmb2_ksprfs_metaboxes( array $meta_boxes ) {

	// Start with an underscore to hide fields from custom fields list
	$prefix = 'ksprfs_';
	global $cmb2_prefix, $meta_boxes;
	$cmb2_prefix = $prefix;

	$meta_boxes['engine_data'] = array(

		'id' 			=> 'engine_data',
		'title' 		=> 'Engine Data',
		'object_types'  => array( 'engine', ),
		'context'		=> 'normal',
		'priority'		=> 'high',
		'show_names'	=> true,
		'fields'		=> array(

			array(
				'name' => 'Engine ID',
				'desc' => 'The "name" of the engine in the original .cfg file',
				'id'   => $prefix . 'engine_id',
				'type' => 'text',
				'attributes'  => array(
					'required'    => 'required',
					'ng-model' => 'rfs.' . $prefix . 'engine_id',
				)
			),
			array(
				'name' => 'New Name',
				//'desc' => 'The new title',
				'id'   => $prefix . 'engine_name',
				'type' => 'text',
				'attributes'  => array(
					'ng-model' => 'rfs.' . $prefix . 'engine_name',
				)
			),
			array(
				'name' => 'Description',
				'desc' => 'Override the stock description',
				'id'   => $prefix . 'engine_desc',
				'type' => 'text',
				'attributes'  => array(
					'ng-model' => 'rfs.' . $prefix . 'engine_desc',
				)
			),
			array(
				'name' => 'Mass',
				'desc' => 'Mass value in mt',
				'id'   => $prefix . 'engine_mass',
				'type' => 'text_number',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float',
				'attributes'  => array(
					'required' => 'required',
					'ng-model' => 'rfs.' . $prefix . 'engine_mass',
					'min' => 0.001,
					'step' => 0.001
				)
			),
			array(
				'name' => 'Extra Mass',
				'desc' => 'Additional mass not from an engine',
				'id'   => $prefix . 'engine_extra_mass',
				'default' => 0,
				'type' => 'text_number',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float',
				'attributes'  => array(
					'ng-model' => 'rfs.' . $prefix . 'engine_extra_mass',
					'min' => 0,
					'step' => 0.001
				)
			),
			array(
				'name' => 'RCS Nozzles',
				'desc' => 'Number of RCS Nozzles',
				'id'   => $prefix . 'rcs_nozzles',
				'type' => 'text_number',
				'sanitization_cb' => 'validate_int',
				'escape_cb' => 'validate_int',
				'attributes'  => array(
					'min' => 1,
					'step' => 1
				)
			),
			array(
				'name' => 'Tech Level',
				//'desc' => 'Choose 0-7',
				'id'   => $prefix . 'engine_tech_level',
				'type' => 'select',
				'options' => array(
					'start' => __( 'Start', 'cmb' ),
					'1' => __( 'Basic Rocketry', 'cmb' ),
					'2' => __( 'General Rocketry', 'cmb' ),
					'3' => __( 'Advanced Rocketry', 'cmb' ),
					'4' => __( 'Heavy Rocketry', 'cmb' ),
					'5' => __( 'Heavier Rocketry', 'cmb' ),
					'6' => __( 'Very Heavy Rocketry', 'cmb' ),
					'7' => __( 'Experimental Rocketry', 'cmb' ),
					'8' => __( 'Experimental Rocketry (for NTRs)', 'cmb' )
				)
			),
			array(
				'name' => 'Engine Type',
				//'desc' => 'Description Goes Here',
				'id' => $prefix . 'engine_type',
				'taxonomy' => 'engine_type', //Enter Taxonomy Slug
				'type' => 'taxonomy_select'
			),
			array(
				'name' => 'Flow Mode',
				'desc' => 'Type of resource flow mode the engine will use to find its needed resources',
				'id' => $prefix . 'engine_flow',
				'type' => 'select',
				'options' => array(
					'STACK_PRIORITY_SEARCH' => __('Current Stage Only, Respect Crossfeed', 'cmb'),
					'STAGE_PRIORITY_FLOW' => __('All Vessel, Stage Priority', 'cmb'),
					'ALL_VESSEL' => __('All Vessel, Ignore Crossfeed', 'cmb')
				)
			),
			array(
				'name' => 'IspSL Multiplier',
				//'desc' => 'Additional mass not from an engine',
				'id'   => $prefix . 'engine_ispslm',
				'default'  => 1,
				'type' => 'text_number',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float',
				'attributes' => array(
					'min' => 0.5,
					'max' => 1.5,
					'step' => 0.001
				)
			),
			array(
				'name' => 'IspV Multiplier',
				//'desc' => 'Additional mass not from an engine',
				'id'   => $prefix . 'engine_ispvm',
				'default'  => 1,
				'type' => 'text_number',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float',
				'attributes' => array(
					'min' => 0.5,
					'max' => 1.5,
					'step' => 0.001
				)
			),
			array(
				'name' => 'Thrust',
				'desc' => 'Thrust value in kN',
				'id'   => $prefix . 'engine_thrust',
				'type' => 'text_number',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float',
				'attributes' => array(
					'min' => 0,
					'step' => 0.001
				)
			),
			array(
				'name' => 'Throttle Type',
				'desc' => 'By default, engines become more deeply throttleable as the tech level increases.',
				'id'   => $prefix . 'engine_throttle_type',
				'type' => 'select',
				'options' => array(
					'full-throttle' => __( 'Fully Throttleable', 'cmb' ),
					'use-default' => __( 'Use Default Throttle', 'cmb' ),
					'use-default-tech' => __( 'Use Default Throttle After Tech Level', 'cmb' ),
					'custom-throttle' => __( 'Custom Throttle', 'cmb' ),
					'unthrottleable' => __( 'Unthrottleable', 'cmb' )
				)
			),
			array(
				'name' => 'Minimum Throttle',
				'desc' => 'Minimum throttle that can be achieved by this engine (1 = 100%, 0.5 = 50%).',
				'id'   => $prefix . 'engine_throttle',
				'type' => 'text_number',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float',
				'attributes' => array(
					'min' => 0,
					'max' => 1,
					'step' => 0.01
				)
			),
			array(
				'name' => 'Throttle Tech Level',
				//'desc' => 'Choose 0-7',
				'id'   => $prefix . 'engine_throttle_tl',
				'type' => 'select',
				'options' => array(
					'start' => __( 'Start', 'cmb' ),
					'1' => __( 'Basic Rocketry', 'cmb' ),
					'2' => __( 'General Rocketry', 'cmb' ),
					'3' => __( 'Advanced Rocketry', 'cmb' ),
					'4' => __( 'Heavy Rocketry', 'cmb' ),
					'5' => __( 'Heavier Rocketry', 'cmb' ),
					'6' => __( 'Very Heavy Rocketry', 'cmb' ),
					'7' => __( 'Experimental Rocketry', 'cmb' ),
					'8' => __( 'Experimental Rocketry (for NTRs)', 'cmb' )
				)
			),
			array(
				'name' => 'Engine Configs',
				'desc' => 'Add fuel configs for your engines. First config is default.',
				'id'   => $prefix . 'engine_configs',
				'type' => 'group',
				'options' => array(
					'group_title'		=> __( 'Config {#}', 'cmb' ),
					'add_button'		=> __( 'Add Config', 'cmb' ),
					'remove_button' => __( 'Remove Config', 'cmb' )
				),
				'fields' => array(
					array(
						'name' => 'Fuel Mixture',
						//'desc' => '',
						'id'   => 'config_mixture',
						'type' => 'select',
						'options' => cmb_get_post_options( array( 'post_type' => 'mixture', 'posts_per_page' => -1 ) ),
						'attributes' => array( 'required' => 'required' )
					),
					array(
						'name' => 'Mass Ratio',
						//'desc' => '',
						'id'   => 'config_ratio',
						'type' => 'text_number',
						'sanitization_cb' => 'validate_float',
						'escape_cb' => 'validate_float',
						'attributes' => array(
							'min' => 0,
							'step' => 0.01
						)
					),
					array(
						'name' => 'Config Tech Node',
						'desc' => 'Unlock this config only when the tech node is available.',
						'id'   => 'config_tech_node',
						'type' => 'text',
					),
					array(
						'name' => 'Thrust Curve',
						//'desc' => 'Choose 0-7',
						'id'   => 'config_thrust_curve',
						'type' => 'select',
						'options' => array(
							'-1' => __('Custom', 'cmb'),
							'0' => __( 'Stock (no curve)', 'cmb' ),
							'1' => __( 'Increasing', 'cmb' ),
							'2' => __( 'Steady', 'cmb' ),
							'3' => __( 'Steady Dip', 'cmb' ),
							'4' => __( 'Decreasing', 'cmb' ),
							'5' => __( 'Decreasing Dip', 'cmb' ),
							'6' => __( 'Pulse Steady', 'cmb' ),
						)
					),
					array(
						'name' => 'Custom Thrust Curve',
						'desc' => 'Custom thrust curve. Make sure you know how to write proper curves if you use this!',
						'id'   => 'config_custom_curve',
						'type' => 'textarea'
					),
				)
			),
			array(
				'name' => 'ModuleEngineFX',
				'desc' => 'Does this engine use ModuleEngineFX?',
				'id' => $prefix . 'engine_mefx',
				'type' => 'checkbox'
			),
			array(
				'name' => 'Extra Patch',
				'desc' => 'MM patch added to the part config',
				//'default' => 'standard value (optional)',
				'id' => $prefix . 'engine_patch',
				'type' => 'textarea_code'
			),
			array(
				'name' => 'Per Config Patch',
				'desc' => 'MM patch added to each engine config',
				//'default' => 'standard value (optional)',
				'id' => $prefix . 'engine_config_patch',
				'type' => 'textarea_code'
			),
			array(
				'name' => 'Full Flow Staged Cycle',
				'desc' => 'Does this engine use FFSC?',
				'id' => $prefix . 'engine_ffsc',
				'type' => 'checkbox'
			),
			array(
				'name' => 'Bimodal',
				'desc' => 'Is this engine bimodal (i.e. "afterburner")?',
				'id' => $prefix . 'engine_bimodal',
				'type' => 'checkbox'
			),
			array(
				'name' => 'Dedicated',
				'desc' => 'Does this engine have a dedicated tank (i.e. SRB)?',
				'id' => $prefix . 'engine_dedicated',
				'type' => 'checkbox'
			),
			array(
				'name' => 'MFT Tank',
				'desc' => 'If the engine has an attached tank, set the tank type.',
				'id'   => $prefix . 'engine_mft',
				'type' => 'text_medium'
			),
			array(
				'name' => 'MFT Tank Volume',
				'desc' => 'If the engine has an attached tank, set the volume in liters.',
				'id'   => $prefix . 'engine_mft_volume',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_int',
				'escape_cb' => 'validate_int'
			),
			array(
				'name' => 'EI Ignition Mode',
				'desc' => 'Check the box to override the derived number of ignitions',
				'id' => $prefix . 'engine_ignition_mode',
				'type' => 'select',
				'options' => array(
					'0' => __( 'None', 'cmb' ),
					'1' => __( 'Respect Hypergolic', 'cmb' ),
					'2' => __( 'Force Ignitions', 'cmb' )
				)
			),
			array(
				'name' => 'EI Ignitions',
				'desc' => 'Number of ignitions available to the engine (see above). If >0, that many. If 0, unlimited. If <0, engine will have (current TL - this) ignitions, with a minimum of 1.',
				'id' => $prefix . 'engine_ignitions',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_ignitions',
				'escape_cb' => 'validate_ignitions'
			),
			array(
				'name' => 'Override Vectoring',
				'desc' => 'Check the box to override existing gimbal',
				'id' => $prefix . 'engine_vectoring_override',
				'type' => 'checkbox'
			),
			array(
				'name' => 'Gimbal Exists',
				'desc' => 'Does a gimbal module exist for this engine?',
				'id' => $prefix . 'engine_vectoring_exists',
				'type' => 'checkbox'
			),
			array(
				'name' => 'Vectoring Range',
				'desc' => 'Degrees of vectoring for this engine.',
				'id' => $prefix . 'engine_vectoring',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_int',
				'escape_cb' => 'validate_int'
			),
			array(
				'name' => 'ModuleManager NEEDS',
				//'desc' => 'Unlock this config only when the tech node is available.',
				'id'   => $prefix . 'mm_needs',
				'type' => 'text',
			),
			array(
				'name' => 'ModuleManager HAS',
				//'desc' => 'Unlock this config only when the tech node is available.',
				'id'   => $prefix . 'mm_has',
				'type' => 'text',
			),
			array(
				'name' => 'ModuleManager Duplicate',
				//'desc' => 'Unlock this config only when the tech node is available.',
				'id'   => $prefix . 'mm_duplicate',
				'type' => 'text',
			),
		)

	);

	$meta_boxes['mixture_data'] = array(

		'id' 			=> 'mixture_data',
		'title' 		=> 'Mixture Data',
		'object_types'  => array( 'mixture', ),
		'context'		=> 'normal',
		'priority'		=> 'high',
		'show_names'	=> true,
		'fields'		=> array(

			array(
				'name' => 'Short Name',
				'desc' => 'Abbreviated name',
				'id'   => $prefix . 'mixture_id',
				'type' => 'text',
			),
			array(
				'name' => 'Fuel',
				//'desc' => 'Fuel name',
				'id'   => $prefix . 'mixture_fuel',
				'type' => 'select',
				'options' => cmb_get_post_options( array( 'post_type' => 'resource', 'posts_per_page' => -1 ) )
			),
			array(
				'name' => 'Oxidizer',
				//'desc' => 'Oxidizer name',
				'id'   => $prefix . 'mixture_oxidizer',
				'type' => 'select',
				'options' => cmb_get_post_options( array( 'post_type' => 'resource', 'posts_per_page' => -1 ), true )
			),
			array(
				'name' => 'Thrust Multiplier',
				//'desc' => 'Fuel name',
				'id'   => $prefix . 'mixture_thrust_mult',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
			),
			array(
				'name' => 'IspV Multiplier',
				//'desc' => 'Fuel name',
				'id'   => $prefix . 'mixture_ispv_mult',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
			),
			array(
				'name' => 'IspSL Multiplier',
				//'desc' => 'Fuel name',
				'id'   => $prefix . 'mixture_ispsl_mult',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
			),
			array(
				'name' => 'IspV',
				//'desc' => 'Fuel name',
				'id'   => $prefix . 'mixture_ispv',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
			),
			array(
				'name' => 'IspSL',
				//'desc' => 'Fuel name',
				'id'   => $prefix . 'mixture_ispsl',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
			),
			array(
				'name' => 'Fuel Density',
				//'desc' => 'Fuel name',
				'id'   => $prefix . 'mixture_fuel_density',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
			),
			array(
				'name' => 'Oxidizer Density',
				//'desc' => 'Fuel name',
				'id'   => $prefix . 'mixture_oxidizer_density',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
			),
			array(
				'name' => 'Typical Mixture Ratio',
				//'desc' => 'Fuel name',
				'id'   => $prefix . 'mixture_typical_mr',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
			),
			array(
				'name' => 'Hypergolic',
				'desc' => 'Indicates this mixture is hypergolic.',
				'id' => $prefix . 'mixture_hypergolic',
				'type' => 'checkbox'
			),
		)

	);

	$meta_boxes['resource_data'] = array(

		'id' 			=> 'resource_data',
		'title' 		=> 'Resource Data',
		'object_types'  => array( 'resource', ),
		'context'		=> 'normal',
		'priority'		=> 'high',
		'show_names'	=> true,
		'fields'		=> array(

			array(
				'name' => 'Density',
				'desc' => 'in g/cc',
				'id'   => $prefix . 'resource_density',
				'type' => 'text',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float'
			),
			array(
				'name' => 'Flow Mode',
				//'desc' => 'Abbreviated name',
				'id'   => $prefix . 'resource_flow',
				'type' => 'text',
			),
			array(
				'name' => 'Transfer Mode',
				//'desc' => 'Abbreviated name',
				'id'   => $prefix . 'resource_transfer',
				'type' => 'text',
			),
			array(
				'name' => 'Exists as Stock?',
				//'desc' => 'Check the box to override the derived number of ignitions',
				'id' => $prefix . 'resource_exists',
				'type' => 'checkbox'
			),
			array(
				'name' => 'Fillable?',
				'desc' => 'Is the resource fillable pre-launch?',
				'id' => $prefix . 'resource_fillable',
				'type' => 'checkbox'
			),
			array(
				'name' => 'Utilization',
				'desc' => 'Percent of the tank fillable by this resoucre. Values above 100% mean a pressurized/compressed resource.',
				'id'   => $prefix . 'resource_utilization',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_percent_over',
				'escape_cb' => 'validate_percent_over'
			),
			array(
				'name' => 'Boiling Point',
				'desc' => 'in degrees Celsius',
				'id'   => $prefix . 'resource_boiling',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float'
			),
			array(
				'name' => 'Lossrate',
				//'desc' => 'in degrees Celsius',
				'id'   => $prefix . 'resource_lossrate',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float'
			),
			array(
				'name' => 'Cryo Tank Lossrate',
				//'desc' => 'in degrees Celsius',
				'id'   => $prefix . 'resource_cryoloss',
				'type' => 'text_small',
				'sanitization_cb' => 'validate_float',
				'escape_cb' => 'validate_float'
			),
			array(
				'name' => 'Usage Type',
				//'desc' => 'Abbreviated name',
				'id'   => $prefix . 'resource_usage_type',
				'type' => 'select',
				'taxonomy' => 'usage', //Enter Taxonomy Slug
				'type' => 'taxonomy_multicheck'
			),
		)

	);

	return $meta_boxes;
}
