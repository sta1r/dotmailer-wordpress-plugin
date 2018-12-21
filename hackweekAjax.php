<?php
/**
 * Created by PhpStorm.
 * User: Fanis.Strezos
 * Date: 21/12/2018
 * Time: 09:29
 */
add_action( 'wp_ajax_custom_action', 'custom_action' );
add_action( 'wp_ajax_nopriv_custom_action', 'custom_action' );
add_action( 'plugins_loaded', array( 'hackweekAJAX', 'getInstance' ) );


class hackweekAjax
{

    public function custom_action() {
        var_dump($data);
    }

}