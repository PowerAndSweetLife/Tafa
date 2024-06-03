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
    public function index()
    {
    }
    public function authentification()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // Vérifiez si les données d'authentification ont été envoyées
        if (isset($data['Email']) && isset($data['Mots_de_passe'])) {
            // Récupérez les données d'authentification
            $Email = trim($data['Email']);
            $plain_password = $data['Mots_de_passe'];

            // Initialisez la connexion à la base de données
            $db = new Database();

            // Effectuez une requête pour obtenir le mot de passe haché associé à l'email
            $result = $db->select('user')
                ->where('email', '=')
                ->execute([$Email], 'assoc');

            // Vérifiez si un utilisateur avec cet e-mail existe
            if ($result && count($result) > 0) {
                // Récupérez le mot de passe haché
                $hashed_password = $result[0]['password'];

                // Vérifiez si le mot de passe correspond au mot de passe haché
                if (password_verify($plain_password, $hashed_password)) {
                    // L'authentification a réussi, renvoyez les données de l'utilisateur
                    echo json_encode(array('success' => true, 'user' => $result[0]));
                } else {
                    // L'authentification a échoué en raison d'un mot de passe incorrect
                    echo json_encode(array('success' => false, 'message' => 'Adresse e-mail ou mot de passe incorrect.'));
                }
            } else {
                // L'authentification a échoué car aucun utilisateur avec cet e-mail n'a été trouvé
                echo json_encode(array('success' => false, 'message' => 'Adresse e-mail ou mot de passe incorrect.'));
            }
        } else {
            // Les données d'authentification sont manquantes
            echo json_encode(array('success' => false, 'message' => 'Veuillez fournir une adresse e-mail et un mot de passe.'));
        }
    }

    public function updateEnligne()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['userId']) && isset($data['enLigne'])) {
            try {
                // Initialisez la connexion à la base de données
                $db = new Database();

                // Mettez à jour le champ enLigne dans la base de données
                $result = $db->update('user')
                    ->parametters(['status']) // Spécifiez les colonnes à mettre à jour
                    ->where('id', '=') // Assurez-vous que 'Id' correspond à la colonne de votre table
                    ->execute([$data['enLigne'], $data['userId']]); // Assurez-vous que le nombre de paramètres est correct

                if ($result !== false) {
                    echo json_encode(array('success' => true, 'message' => 'Champ enLigne mis à jour avec succès.'));
                } else {
                    echo json_encode(array('success' => false, 'message' => 'Erreur lors de la mise à jour.'));
                }
            } catch (Exception $e) {
                echo json_encode(array('success' => false, 'message' => 'Erreur SQL: ' . $e->getMessage()));
            }
        } else {
            echo json_encode(array('success' => false, 'message' => 'Données manquantes.'));
        }
    }
}
