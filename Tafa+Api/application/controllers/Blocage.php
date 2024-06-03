<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Expires:0");

class Blocage extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }

    public function bloquer()
    {
        $db = new Database();
        // Récupérer les données envoyées dans le corps de la requête
        $data = json_decode(file_get_contents('php://input'), true);

        // Vérifier si les clés existent dans les données reçues
        if (isset($data['blocking_user_id'], $data['blocked_user_id'])) {
            // Extraire les IDs des utilisateurs impliqués dans le blocage
            $blockingUserId = $data['blocking_user_id'];
            $blockedUserId = $data['blocked_user_id'];

            // Insérer ces informations dans la table de blocage dans la base de données
            $db->insert('block_user')
                ->parametters(['blocking_user_id', 'blocked_user_id'])
                ->execute([$blockingUserId, $blockedUserId]);

            // Répondre avec un statut 200 pour indiquer que la requête a été traitée avec succès
            http_response_code(200);
            echo json_encode(array("message" => "L'utilisateur a été bloqué avec succès"));
        } else {
            // Si les clés sont manquantes, répondre avec un code d'erreur 400 (mauvvaise requête)
            http_response_code(400);
            echo json_encode(array("message" => "Les données de la requête sont incomplètes"));
        }
    }

    public function deblocage()
    {
        $db = new Database();
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['blocking_user_id'], $data['blocked_user_id'])) {
            $blockingUserId = $data['blocking_user_id'];
            $blockedUserId = $data['blocked_user_id'];

            // Utilisation de la classe Database pour effectuer la suppression
            $deleted = $db->delete('block_user')
                ->where('blocking_user_id', '=')
                ->and('blocked_user_id', '=')
                ->execute([$blockingUserId, $blockedUserId]);

            if ($deleted) {
                http_response_code(200); // Succès
                echo json_encode(array("message" => "L'utilisateur a été débloqué avec succès"));
            } else {
                http_response_code(500); // Erreur interne du serveur
                echo json_encode(array("message" => "Erreur lors de la suppression de l'utilisateur bloqué"));
            }
        } else {
            http_response_code(400); // Mauvaise requête
            echo json_encode(array("message" => "Les données de la requête sont incomplètes"));
        }
    }
}
