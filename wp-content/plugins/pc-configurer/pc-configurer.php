<?php
/**
 * Plugin Name: PC Configurer
 * Plugin URI:
 * Description: Create PC sets
 * Version: 1.0.0
 * Author: s17738
 * Author URI: localhost
 * Text Domain: pc-configurer
 * License: GPLv3
 */

function is_local_dev()
{
    return in_array($_SERVER['REMOTE_ADDR'], array('10.255.0.2', '::1'));
}

add_action('admin_enqueue_scripts', function ($hook) {
    global $ghost_inspector_settings_page;
    if ($hook != $ghost_inspector_settings_page) {
        return;
    }

    if (is_local_dev()) {
        $js_to_load = 'http://localhost:3000/static/js/bundle.js';
    } else {
        $js_to_load = plugin_dir_url(__FILE__) . 'pc-configurer.js';
//        $css_to_load = plugin_dir_url(__FILE__) . 'pc_configurer.css';
    }

//    wp_enqueue_style('pc_configurer_styles', $css_to_load);
    wp_enqueue_script('pc_configurer_react', $js_to_load, '', mt_rand(10, 1000), true);
});

add_action('admin_menu', function () {
    global $ghost_inspector_settings_page;
    $ghost_inspector_settings_page = add_options_page('PC Configurer Settings', 'PC Configurer Settings', 'manage_options', 'pc-configurer-settings', 'pc_configurer_page');

    function pc_configurer_page()
    {
        ?>
        <div id="pc_configurer_page"></div>
        <?php
    }
});
