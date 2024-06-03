<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Expires:0");

class deconnexion extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }
    public function logout()
    {
        $db = new Database();

        // Vous pouvez ajouter une vérification d'authentification ici si nécessaire

        // Effectuez les étapes de déconnexion appropriées
        // Par exemple, si vous utilisez des sessions PHP :
        session_start();
        session_destroy();

        // Répondez avec un statut de succès
        echo json_encode(array('success' => true, 'message' => 'Déconnexion réussie'));
    }
}
