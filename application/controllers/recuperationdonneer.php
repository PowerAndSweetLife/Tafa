<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Expires:0");

class recuperationdonneer extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }
 public function get_users() {
    $db = new Database();

    
    $query = $db->select('inscription')
                    ->inner('images', 'Id')
                    ->getQuery();
        
        $allUsers = $db->customSelect($query, true);
        
        // Mélangez tous les utilisateurs
        shuffle($allUsers);
        
        // Définissez le nombre de résultats à renvoyer
        $numberOfUsers = 10; // Ou le nombre de résultats que vous souhaitez
        
        // Sélectionnez les premiers $numberOfUsers utilisateurs après le mélange
        $randomUsers = array_slice($allUsers, 0, $numberOfUsers);
        
        // Envoyez les résultats au format JSON
        echo json_encode($randomUsers);
    }
 
}
