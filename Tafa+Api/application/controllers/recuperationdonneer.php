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
    public function get_users_contenu()
    {
        $db = new Database();

        // Obtenir les paramètres de page et de taille de page à partir de la requête
        $page = $this->input->get('page');
        $size = $this->input->get('size');

        // Définir des valeurs par défaut si les paramètres ne sont pas fournis
        $page = isset($page) ? (int)$page : 1;
        $size = isset($size) ? (int)$size : 20;

        // Calculer l'offset
        $offset = ($page - 1) * $size;

        // Récupérer les utilisateurs à partir de la base de données avec une limite et un offset
        $Query = $db->select('user')
            ->limit($size, $offset)
            ->getQuery();
        $filteredUsers = $db->customSelect($Query, true);

        // Envoyer les résultats au format JSON
        header("Content-Type: application/json");
        echo json_encode($filteredUsers);
    }

    public function get_users()
    {
        $db = new Database();
        // Récupérer tous les utilisateurs (non bloqués) à partir de votre base de données
        $Query = $db->select('user')
            ->getQuery();
        $filteredUsers = $db->customSelect($Query, true);

        // Mélanger tous les utilisateurs filtrés
        shuffle($filteredUsers);

        // Définir le nombre de résultats à renvoyer
        $numberOfUsers = 300; // Ou le nombre de résultats que vous souhaitez

        // Sélectionner les premiers $numberOfUsers utilisateurs après le mélange
        $randomUsers = array_slice($filteredUsers, 0, $numberOfUsers);

        // Envoyer les résultats au format JSON
        header("Content-Type: application/json"); // Définir l'en-tête Content-Type à JSON
        echo json_encode($randomUsers);
    }

    public function users()
    {
        $db = new Database();
        // Récupérer tous les utilisateurs (non bloqués) à partir de votre base de données
        $Query = $db->select('user')
            ->getQuery();
        $filteredUsers = $db->customSelect($Query, true);

        // Mélanger tous les utilisateurs filtrés
        shuffle($filteredUsers);
        // Mélanger à nouveau si souhaité
        shuffle($filteredUsers);

        // Définir le nombre de résultats à renvoyer
        $numberOfUsers = 400; // Ou le nombre de résultats que vous souhaitez

        // Sélectionner les premiers $numberOfUsers utilisateurs après le mélange
        $randomUsers = array_slice($filteredUsers, 0, $numberOfUsers);

        // Envoyer les résultats au format JSON
        header("Content-Type: application/json"); // Définir l'en-tête Content-Type à JSON
        echo json_encode($randomUsers);
    }

    public function usersBlocked()
    {
        $db = new Database();
        $Query = $db->select('block_user')
            ->getQuery();
        $filteredUsers = $db->customSelect($Query, true);
        // Envoyer les résultats au format JSON
        header("Content-Type: application/json"); // Définir l'en-tête Content-Type à JSON
        echo json_encode($filteredUsers);
    }

    public function getusercontenuMatch()
    {
        $db = new Database();

        // Récupérer les données de la requête POST
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['ids']) && is_array($data['ids'])) {
            $ids = $data['ids'];

            try {
                // Préparer les valeurs pour la requête
                $placeholders = implode(',', array_fill(0, count($ids), '?'));

                // Construire la requête SQL
                $sql = "SELECT * FROM user WHERE id IN ($placeholders)";

                // Définir la requête SQL
                $db->setQuery($sql);

                // Exécuter la requête
                $users = $db->execute($ids, true);

                // Vérifier si des données ont été renvoyées
                if ($users) {
                    // Encodage des données au format JSON
                    $jsonData = json_encode($users);
                    // Envoyer les résultats en réponse JSON
                    echo $jsonData;
                } else {
                    echo json_encode(['error' => 'No data found']);
                }
            } catch (Exception $e) {
                // Gérer les exceptions
                echo json_encode(['error' => $e->getMessage()]);
            }
        } else {
            echo json_encode(['error' => 'Invalid input']);
        }
    }
}
