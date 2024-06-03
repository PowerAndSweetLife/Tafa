<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Expires:0");

class BlockUser_model extends CI_Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function blockUser($blockingUserId, $blockedUserId) {
        // Insère dans la table 'block_user'
        $this->db->insert('block_user', array(
            'blocking_user_id' => $blockingUserId,
            'blocked_user_id' => $blockedUserId
        ));

        // Retourne true si l'insertion est réussie, sinon false
        return $this->db->affected_rows() > 0;
    }
}
