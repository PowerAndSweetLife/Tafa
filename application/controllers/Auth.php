<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Expires:0");

class Auth extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }
    public function authentification()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // Vérifiez si les données d'authentification ont été envoyées
        if (isset($data['Email']) && isset($data['Mots_de_passe'])) {
            // Récupérez les données d'authentification
            $Email = $data['Email'];
            $Mots_de_passe = $data['Mots_de_passe'];

            // Initialisez la connexion à la base de données
            $db = new Database();

            // Effectuez une requête pour vérifier les informations d'authentification
            $result = $db->select('inscription')
               // ->inner('images', 'Id')
                ->where('Email', '=')
                ->and('Mots_de_passe', '=')
                ->execute([$Email, $Mots_de_passe]);

            // Vérifiez si l'authentification a réussi et s'il y a des données d'utilisateur
            if ($result && count($result) > 0) {
                // L'authentification a réussi, renvoyez les données de l'utilisateur
                echo json_encode(array('success' => true, 'user' => $result[0]));
            } else {
                // L'authentification a échoué
                echo json_encode(array('success' => false, 'message' => 'Adresse e-mail ou mot de passe incorrect.'));
            }
        } else {
            // Les données d'authentification sont manquantes
            echo json_encode(array('success' => false, 'message' => 'Veuillez fournir une adresse e-mail et un mot de passe.'));
        }
    }
}
