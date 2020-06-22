<?php

add_action('wp_enqueue_scripts', 'porto_child_css', 1001);

// Load CSS
function porto_child_css()
{
	// porto child theme styles
	wp_deregister_style('styles-child');
	wp_register_style('styles-child', esc_url(get_stylesheet_directory_uri()) . '/style.css');
	wp_enqueue_style('styles-child');

	if (is_rtl()) {
		wp_deregister_style('styles-child-rtl');
		wp_register_style('styles-child-rtl', esc_url(get_stylesheet_directory_uri()) . '/style_rtl.css');
		wp_enqueue_style('styles-child-rtl');
	}
}

add_action( 'wp_enqueue_scripts', 'porto_child_js', 1002 );
function porto_child_js() {
	wp_register_script( 'porto-child-js', esc_url( get_stylesheet_directory_uri() ) . '/custom.js', array('jquery'), '', true);
	wp_enqueue_script( 'porto-child-js' );
}

add_filter('wc_additional_variation_images_custom_swap', '__return_true');

add_action('init', function(){
	delete_option('porto_convert_variation_images');
	return;
	if (!class_exists('Woo_Variation_Gallery') || get_option('porto_convert_variation_images')) {
		return;
	}

	global $wpdb;
	$query = "SELECT * FROM {$wpdb->prefix}postmeta WHERE meta_key='_wc_additional_variation_images'";
	$variation_images = $wpdb->get_results($query);
	foreach ($variation_images as $v) {
		$ids = explode(',', $v->meta_value);
		update_post_meta( $v->post_id, 'woo_variation_gallery_images', $ids);
	}

	add_option('porto_convert_variation_images', 'done');
});