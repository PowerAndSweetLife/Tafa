<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Expires:0");

class BlockUser extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
        // Load required models, libraries, etc.
        $this->load->model('BlockUser_model');
    }

    
    public function index() {
        $db = new Database();
        // Gère les requêtes entrantes pour bloquer un utilisateur
        $postData = json_decode(file_get_contents('php://input'), true);

        // Extrait les ID utilisateur
        $userIdToBlock = $postData['userIdToBlock'];
        $blockingUserId = $this->session->userdata('userId'); // Assumant que vous avez mis en place l'authentification utilisateur / gestion de session

        // Vérifie si l'utilisateur est authentifié
        if (!$blockingUserId) {
            // Utilisateur non authentifié, renvoie un message d'erreur
            echo json_encode(array('error' => 'User not authenticated'));
            return;
        }

        // Appelle la méthode blockUser du modèle BlockUser_model pour bloquer l'utilisateur
        $result = $this->BlockUser_model->blockUser($blockingUserId, $userIdToBlock);

        if ($result) {
            // Succès
            echo json_encode(array('success' => 'User blocked successfully'));
        } else {
            // Échec
            echo json_encode(array('error' => 'Failed to block user'));
        }
    }
}
