<?php

add_filter( 'auto_update_plugin', '__return_true' );
add_filter( 'auto_update_theme', '__return_true' );
add_filter( 'allow_major_auto_core_updates', '__return_true' );

//define('WP_DEBUG', true);
//define('WP_DEBUG_DISPLAY', true);

// Clean up the <head>
function removeHeadLinks() {
	remove_action( 'wp_head', 'rsd_link' );
	remove_action( 'wp_head', 'wlwmanifest_link' );
}

add_action( 'init', 'removeHeadLinks' );
remove_action( 'wp_head', 'wp_generator' );

// Declare sidebar widget zone
if ( function_exists( 'register_sidebar' ) ) {
	register_sidebar( array(
		'name'          => 'Homepage Widgets',
		'id'            => 'homepage-widgets',
		'description'   => 'These are widgets for the homepage.',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>'
	) );
}
// Declare sidebar widget zone
if ( function_exists( 'register_sidebar' ) ) {
	register_sidebar( array(
		'name'          => 'Inner Page Widgets',
		'id'            => 'inner-widgets',
		'description'   => 'These are widgets for the inner pages.',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>'
	) );
}


// Register nav menus
if ( function_exists( 'register_nav_menus' ) ) {
	register_nav_menus(
		array(
			'header-menu' => 'Header Menu',
			'footer-menu' => 'Footer Menu'
		)
	);
}

// Add support for Featured Images
if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 250, 250, true ); // default Post Thumbnail dimensions (cropped)
}

// Excerpt length
function custom_excerpt_length( $length ) {
	return 22;
}

add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

// Enqueue Styles & Scripts
if ( ! is_admin() ) {
	function load_styles_and_scripts() {

		//wp_register_script( 'modernizr', get_template_directory_uri() . '/js/vendor/modernizr-2.8.3.min.js', false );
		//wp_register_script( 'owl', get_template_directory_uri() . '/js/vendor/owl-carousel-2/owl.carousel.min.js', array('jquery'), '1.0', false );
		wp_register_script( 'angular', get_template_directory_uri() . '/bower_components/angular/angular.min.js', array( 'jquery' ), '1.4.7', false );
		wp_register_script( 'angular-sanitize', get_template_directory_uri() . '/bower_components/angular-sanitize/angular-sanitize.min.js', array( 'angular' ), '1.4.7', false );
		wp_register_script( 'angular-ui-router', get_template_directory_uri() . '/bower_components/angular-ui-router/release/angular-ui-router.min.js', array( 'angular' ), '0.2.15', false );
		wp_register_script( 'main', get_template_directory_uri() . '/js/main.js', array(
			'jquery',
			'angular',
			'angular-sanitize'
		), time(), false );
		//wp_register_script( 'rfstockalike', get_template_directory_uri() . '/js/src/rfstockalike.js', array('angular'), '1.0', false );

		//wp_enqueue_script( 'modernizr' );
		wp_enqueue_script( 'jquery' );
		wp_enqueue_script( 'angular' );
		wp_enqueue_script( 'angular-sanitize' );
		wp_enqueue_script( 'angular-ui-router' );
		//wp_enqueue_script( 'rfstockalike' );
		//wp_enqueue_script( 'owl' );
		wp_enqueue_script( 'main' );

		// Set up nonce for Angular-based authentication
		wp_localize_script( 'main', 'RFS', array(
			'root'     => esc_url_raw( rest_url() ),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
			'partials' => trailingslashit( get_template_directory_uri() ) . 'partials/'
		) );

		wp_enqueue_style( 'owlcss', get_template_directory_uri() . '/js/vendor/owl-carousel-2/assets/owl.carousel.css', false );
		//wp_enqueue_style('gfont', 'http://fonts.googleapis.com/css?family=Raleway:400,600,700,900', false );
		wp_enqueue_style( 'mainstyle', get_template_directory_uri() . '/style.css', false, '1.0', 'screen' );

	}

	add_action( 'wp_enqueue_scripts', 'load_styles_and_scripts' );
}

// Register Engine Post Type
function ksprfs_engine() {

	$labels = array(
		'name'               => _x( 'Engines', 'Post Type General Name', 'text_domain' ),
		'singular_name'      => _x( 'Engine', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'          => __( 'Engines', 'text_domain' ),
		'parent_item_colon'  => __( 'Parent Engine:', 'text_domain' ),
		'all_items'          => __( 'All Engines', 'text_domain' ),
		'view_item'          => __( 'View Engine', 'text_domain' ),
		'add_new_item'       => __( 'Add New Engine', 'text_domain' ),
		'add_new'            => __( 'Add New', 'text_domain' ),
		'edit_item'          => __( 'Edit Engine', 'text_domain' ),
		'update_item'        => __( 'Update Engine', 'text_domain' ),
		'search_items'       => __( 'Search Engines', 'text_domain' ),
		'not_found'          => __( 'Not found', 'text_domain' ),
		'not_found_in_trash' => __( 'Not found in Trash', 'text_domain' ),
	);
	$args   = array(
		'label'               => __( 'engine', 'text_domain' ),
		'description'         => __( 'A single engine config', 'text_domain' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'thumbnail', 'revisions', 'custom-fields', 'page-attributes', ),
		'taxonomies'          => array( 'engine_mod', 'engine_type' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
		'show_in_rest'        => true,
		'rest_base'           => 'engines',
	);
	register_post_type( 'engine', $args );

}

// Hook into the 'init' action
add_action( 'init', 'ksprfs_engine', 0 );

// Register Custom Taxonomy
function engine_mod_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Mods', 'Taxonomy General Name', 'text_domain' ),
		'singular_name'              => _x( 'Mod', 'Taxonomy Singular Name', 'text_domain' ),
		'menu_name'                  => __( 'Mods', 'text_domain' ),
		'all_items'                  => __( 'All Mods', 'text_domain' ),
		'parent_item'                => __( 'Parent Mod', 'text_domain' ),
		'parent_item_colon'          => __( 'Parent Mod:', 'text_domain' ),
		'new_item_name'              => __( 'New Mod', 'text_domain' ),
		'add_new_item'               => __( 'Add New Mod', 'text_domain' ),
		'edit_item'                  => __( 'Edit Mod', 'text_domain' ),
		'update_item'                => __( 'Update Mod', 'text_domain' ),
		'separate_items_with_commas' => __( 'Separate items with commas', 'text_domain' ),
		'search_items'               => __( 'Search Mods', 'text_domain' ),
		'add_or_remove_items'        => __( 'Add or remove mods', 'text_domain' ),
		'choose_from_most_used'      => __( 'Choose from the most used mods', 'text_domain' ),
		'not_found'                  => __( 'Not Found', 'text_domain' ),
	);
	$args   = array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud'     => true,
		'show_in_rest'      => true,
		'rest_base'         => 'engine-mod',
	);
	register_taxonomy( 'engine_mod', array( 'engine' ), $args );

}

// Hook into the 'init' action
add_action( 'init', 'engine_mod_taxonomy', 0 );

// Register Custom Taxonomy
function engine_type_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Types', 'Taxonomy General Name', 'text_domain' ),
		'singular_name'              => _x( 'Type', 'Taxonomy Singular Name', 'text_domain' ),
		'menu_name'                  => __( 'Type', 'text_domain' ),
		'all_items'                  => __( 'All Types', 'text_domain' ),
		'parent_item'                => __( 'Parent Type', 'text_domain' ),
		'parent_item_colon'          => __( 'Parent Type:', 'text_domain' ),
		'new_item_name'              => __( 'New Type', 'text_domain' ),
		'add_new_item'               => __( 'Add New Type', 'text_domain' ),
		'edit_item'                  => __( 'Edit Type', 'text_domain' ),
		'update_item'                => __( 'Update Type', 'text_domain' ),
		'separate_items_with_commas' => __( 'Separate items with commas', 'text_domain' ),
		'search_items'               => __( 'Search Types', 'text_domain' ),
		'add_or_remove_items'        => __( 'Add or remove types', 'text_domain' ),
		'choose_from_most_used'      => __( 'Choose from the most used types', 'text_domain' ),
		'not_found'                  => __( 'Not Found', 'text_domain' ),
	);
	$args   = array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud'     => true,
		'show_in_rest'      => true,
		'rest_base'         => 'engine-type',
	);
	register_taxonomy( 'engine_type', array( 'engine' ), $args );

}

// Hook into the 'init' action
add_action( 'init', 'engine_type_taxonomy', 0 );

// Register Custom Taxonomy
function engine_nationality_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Nationalities', 'Taxonomy General Name', 'text_domain' ),
		'singular_name'              => _x( 'Nationality', 'Taxonomy Singular Name', 'text_domain' ),
		'menu_name'                  => __( 'Nationality', 'text_domain' ),
		'all_items'                  => __( 'All Nationalites', 'text_domain' ),
		'parent_item'                => __( 'Parent Nationality', 'text_domain' ),
		'parent_item_colon'          => __( 'Parent Nationality:', 'text_domain' ),
		'new_item_name'              => __( 'New Nationality Name', 'text_domain' ),
		'add_new_item'               => __( 'Add New Nationality', 'text_domain' ),
		'edit_item'                  => __( 'Edit Nationality', 'text_domain' ),
		'update_item'                => __( 'Update Nationality', 'text_domain' ),
		'separate_items_with_commas' => __( 'Separate Nationalites with commas', 'text_domain' ),
		'search_items'               => __( 'Search Nationalities', 'text_domain' ),
		'add_or_remove_items'        => __( 'Add or remove Nationalities', 'text_domain' ),
		'choose_from_most_used'      => __( 'Choose from the most used Nationality', 'text_domain' ),
		'not_found'                  => __( 'Not Found', 'text_domain' ),
	);
	$args   = array(
		'labels'            => $labels,
		'hierarchical'      => false,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud'     => true,
	);
	register_taxonomy( 'engine_nationality', array( 'engine' ), $args );

}

// Hook into the 'init' action
add_action( 'init', 'engine_nationality_taxonomy', 0 );

// Register Custom Post Type
function fuel_mixture_post_type() {

	$labels = array(
		'name'               => _x( 'Mixtures', 'Post Type General Name', 'text_domain' ),
		'singular_name'      => _x( 'Mixture', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'          => __( 'Mixtures', 'text_domain' ),
		'parent_item_colon'  => __( 'Parent Mixture:', 'text_domain' ),
		'all_items'          => __( 'All Mixtures', 'text_domain' ),
		'view_item'          => __( 'View Mixture', 'text_domain' ),
		'add_new_item'       => __( 'Add New Mixture', 'text_domain' ),
		'add_new'            => __( 'Add New', 'text_domain' ),
		'edit_item'          => __( 'Edit Mixture', 'text_domain' ),
		'update_item'        => __( 'Update Mixture', 'text_domain' ),
		'search_items'       => __( 'Search Mixture', 'text_domain' ),
		'not_found'          => __( 'Not found', 'text_domain' ),
		'not_found_in_trash' => __( 'Not found in Trash', 'text_domain' ),
	);
	$args   = array(
		'label'               => __( 'mixture', 'text_domain' ),
		'description'         => __( 'Fuel mixtures for engines', 'text_domain' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'revisions', 'custom-fields', ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'post',
		'show_in_rest'        => true,
		'rest_base'           => 'mixtures',
	);
	register_post_type( 'mixture', $args );

}

// Hook into the 'init' action
add_action( 'init', 'fuel_mixture_post_type', 0 );

// Register Custom Post Type
function resource_post_type() {

	$labels = array(
		'name'               => _x( 'Resources', 'Post Type General Name', 'text_domain' ),
		'singular_name'      => _x( 'Resource', 'Post Type Singular Name', 'text_domain' ),
		'menu_name'          => __( 'Resource', 'text_domain' ),
		'parent_item_colon'  => __( 'Parent Resource:', 'text_domain' ),
		'all_items'          => __( 'All Resources', 'text_domain' ),
		'view_item'          => __( 'View Resource', 'text_domain' ),
		'add_new_item'       => __( 'Add New Resource', 'text_domain' ),
		'add_new'            => __( 'Add New', 'text_domain' ),
		'edit_item'          => __( 'Edit Resource', 'text_domain' ),
		'update_item'        => __( 'Update Resource', 'text_domain' ),
		'search_items'       => __( 'Search Resource', 'text_domain' ),
		'not_found'          => __( 'Not found', 'text_domain' ),
		'not_found_in_trash' => __( 'Not found in Trash', 'text_domain' ),
	);
	$args   = array(
		'label'               => __( 'resource', 'text_domain' ),
		'description'         => __( 'Base resources for fuel use', 'text_domain' ),
		'labels'              => $labels,
		'supports'            => array( 'title', 'custom-fields', 'page-attributes', ),
		'taxonomies'          => array( 'usage' ),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'show_in_nav_menus'   => true,
		'show_in_admin_bar'   => true,
		'menu_position'       => 5,
		'can_export'          => true,
		'has_archive'         => true,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'capability_type'     => 'page',
		'show_in_rest'        => true,
		'rest_base'           => 'resources',
	);
	register_post_type( 'resource', $args );

}

// Hook into the 'init' action
add_action( 'init', 'resource_post_type', 0 );

// Register Custom Taxonomy
function usage_taxonomy() {

	$labels = array(
		'name'                       => _x( 'Usage Types', 'Taxonomy General Name', 'text_domain' ),
		'singular_name'              => _x( 'Usage Type', 'Taxonomy Singular Name', 'text_domain' ),
		'menu_name'                  => __( 'Usage Type', 'text_domain' ),
		'all_items'                  => __( 'All Usage Types', 'text_domain' ),
		'parent_item'                => __( 'Parent Usage Type', 'text_domain' ),
		'parent_item_colon'          => __( 'Parent Usage Type:', 'text_domain' ),
		'new_item_name'              => __( 'New Usage Type', 'text_domain' ),
		'add_new_item'               => __( 'Add New Usage Type', 'text_domain' ),
		'edit_item'                  => __( 'Edit Usage Type', 'text_domain' ),
		'update_item'                => __( 'Update Usage Type', 'text_domain' ),
		'separate_items_with_commas' => __( 'Separate usage types with commas', 'text_domain' ),
		'search_items'               => __( 'Search Usage Types', 'text_domain' ),
		'add_or_remove_items'        => __( 'Add or remove usage type', 'text_domain' ),
		'choose_from_most_used'      => __( 'Choose from the most used types', 'text_domain' ),
		'not_found'                  => __( 'Not Found', 'text_domain' ),
	);
	$args   = array(
		'labels'            => $labels,
		'hierarchical'      => false,
		'public'            => true,
		'show_ui'           => true,
		'show_admin_column' => true,
		'show_in_nav_menus' => true,
		'show_tagcloud'     => true,
	);
	register_taxonomy( 'usage', array( 'resource' ), $args );

}

// Hook into the 'init' action
add_action( 'init', 'usage_taxonomy', 0 );

include_once( 'cmb-functions.php' );

// Add custom handlers to the REST API
add_action( 'rest_api_init', 'slug_register_ksprfs' );
function slug_register_ksprfs() {
	register_api_field( array( 'engine', 'mixture', 'resource' ),
		'ksprfs',
		array(
			'get_callback'    => 'slug_get_ksprfs',
			'update_callback' => 'slug_update_ksprfs',
			'schema'          => null,
		)
	);
}

/**
 * Handler for getting RFS field data.
 *
 * @since 0.1.0
 *
 * @param array $object The object from the response
 * @param string $field_name Name of field
 * @param WP_REST_Request $request Current request
 *
 * @return mixed
 */
function slug_get_ksprfs( $object, $field_name, $request ) {
	global $cmb2_prefix;
	$cf_data  = get_post_custom( $object->ID );
	$new_data = array();
	foreach ( $cf_data as $key => $single ) {
		if ( 0 === strpos( $key, $cmb2_prefix ) ) {
			$value = $single[0];
			if ( is_numeric( $value ) ) {
				if ( is_int( $value ) ) {
					$value = intval( $value );
				} else {
					$value = floatval( $value );
				}
			} elseif ( is_array( $value ) ) {
				foreach ( $value as $key => $val ) {
					if ( is_numeric( $val ) ) {
						if ( is_int( $val ) ) {
							$val = intval( $val );
						} else {
							$val = floatval( $val );
						}
					}
				}
			}
			$new_data[ $key ] = maybe_unserialize( $value );
		}
	}

	return $new_data;
}

/**
 * Handler for updating custom field data.
 *
 * @since 0.1.0
 *
 * @param mixed $value The value of the field
 * @param object $object The object from the response
 * @param string $field_name Name of field
 *
 * @return bool|int
 */
function slug_update_ksprfs( $value, $object, $field_name ) {
	if ( ! $value ) {
		return;
	}
	foreach ( $value as $meta ) {
		update_post_meta( $object->ID, $meta['key'], $meta['value'] );
		if ( $meta['key'] === 'ksprfs_type' ) {
			wp_set_object_terms( $object->ID, array( $meta['value'] ), 'engine_type', false );
		}
	}
}

function one_time_import() {
	$engines   = get_posts( array( 'post_type' => 'engine', 'posts_per_page' => - 1 ) );
	$mixtures  = get_posts( array( 'post_type' => 'mixture', 'posts_per_page' => - 1 ) );
	$resources = get_posts( array( 'post_type' => 'resource', 'posts_per_page' => - 1 ) );

	global $cmb2_prefix;
	if ( $engines ) : foreach ( $engines as $engine ) {
		// $type = array();
		// $term = get_term_by( 'slug', get_post_meta( $engine->ID, $cmb2_prefix . 'type', true ), 'engine_type' );
		//
		// wp_set_object_terms( $engine->ID, $term->term_id, 'engine_type' );
		//
		// $configs = array();
		// $modes = array( 'mode_1', 'mode_2', 'mode_3' );
		// foreach( $modes as $key => $mode ) {
		//   if ( get_post_meta( $engine->ID, $cmb2_prefix . $mode ) && get_post_meta( $engine->ID, $cmb2_prefix . $mode ) != '' ) {
		//     $mix = get_page_by_title( get_post_meta( $engine->ID, $cmb2_prefix . $mode, true ), ARRAY_A, 'mixture' );
		//     if ( ! $mix ) break;
		//     $single_config = array();
		//     $single_config['config_mixture'] = $mix["ID"];
		//     $single_config['config_ratio'] = floatval(get_post_meta( $engine->ID, $cmb2_prefix . $mode . '_mr', true ));
		//     $single_config['config_tech_node'] = get_post_meta( $engine->ID, $cmb2_prefix . $mode . '_tl', true );
		//     $configs[] = $single_config;
		//   }
		// }
		//
		// update_post_meta( $engine->ID, $cmb2_prefix . 'engine_configs', $configs );
		//
		// if ( get_post_meta( $engine->ID, $cmb2_prefix . 'engine_tech_level', true ) == '0' ) {
		//   update_post_meta( $engine->ID, $cmb2_prefix . 'engine_tech_level', 'start' );
		// }

		// $id = get_post_meta( $engine->ID, $cmb2_prefix . 'engine_id', true );
		// var_dump($id);
		// if ( strpos($id, 'RLA') === 0 ) {
		//   wp_set_object_terms( $engine->ID, 'rla-stockalike', 'engine_mod' );
		// } elseif ( strpos($id, 'SXT') === 0 ) {
		//   wp_set_object_terms( $engine->ID, 'sxt', 'engine_mod' );
		// } elseif ( strpos($id, 'Kosmos') === 0 ) {
		//   wp_set_object_terms( $engine->ID, 'kosmos', 'engine_mod' );
		// }

	} endif;
	// $usage_strings = array( 'O' => 17, 'F' => 16, 'M' => 20, 'E' => 19, 'S' => 18 );
	// if ( $resources ) : foreach ( $resources as $resource ) {
	//
	//   $data = get_post_meta( $resource->ID, $cmb2_prefix . 'resource_type_string', true );
	//   $usage = array();
	//
	//   foreach ( $usage_strings as $key => $use ) {
	//     if ( strpos($data,$key) !== false ) $usage[] = $use;
	//   }
	//
	//   var_dump($usage);
	//   echo '<br/>';
	//
	//   wp_set_object_terms( $resource->ID, $usage, 'usage' );
	//
	// } endif;

	// if ($mixtures) : foreach ( $mixtures as $mixture ) {
	//
	//   $title = $mixture->post_title;
	//   $split = explode('+', $title);
	//   $fuel = get_page_by_title( $split[0], ARRAY_A, 'resource' );
	//   $oxy = get_page_by_title( $split[1], ARRAY_A, 'resource' );
	//   var_dump($fuel);
	//   update_post_meta( $mixture->ID, $cmb2_prefix . 'mixture_fuel', $fuel['ID'] );
	//   update_post_meta( $mixture->ID, $cmb2_prefix . 'mixture_oxidizer', $oxy['ID'] );
	//
	// } endif;
}
