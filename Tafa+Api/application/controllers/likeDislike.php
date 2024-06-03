<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

class likeDislike extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }

    public function insertlike()
    {
        // Récupérer les données JSON de la requête
        $data = json_decode(file_get_contents("php://input"));

        // Vérifier que toutes les données nécessaires sont présentes
        if (isset($data->likerId) && isset($data->likedUserId)) {
            $likerId = $data->likerId;
            $likedUserId = $data->likedUserId;

            // Initialiser la connexion à la base de données
            $db = new Database();
            $db->insert('likes')
                ->parametters(['liker_id', 'liked_user_id'])
                ->execute([$likerId, $likedUserId]);

            // Vérifier si l'insertion a réussi
            if ($db->lastInsertId() > 0) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to insert data']);
            }
        } else {
            // Si les données nécessaires ne sont pas présentes, renvoyer une erreur
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        }
    }
    public function insertdislike()
    {
        // Récupérer les données JSON de la requête
        $data = json_decode(file_get_contents("php://input"));

        // Vérifier que toutes les données nécessaires sont présentes
        if (isset($data->dislikerId) && isset($data->dislikedUserId)) {
            $dislikerId = $data->dislikerId;
            $dislikedUserId = $data->dislikedUserId;

            // Initialiser la connexion à la base de données
            $db = new Database();
            $db->insert('dislikes')
                ->parametters(['disliker_id', 'disliked_user_id'])
                ->execute([$dislikerId, $dislikedUserId]);

            // Vérifier si l'insertion a réussi
            if ($db->lastInsertId() > 0) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to insert data']);
            }
        } else {
            // Si les données nécessaires ne sont pas présentes, renvoyer une erreur
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        }
    }

    public function check_matches()
    {
        // Récupérer les données JSON de la requête
        $data = json_decode(file_get_contents("php://input"));

        // Vérifier que toutes les données nécessaires sont présentes
        if (isset($data->userId) && isset($data->likedUserId)) {
            $userId = $data->userId;
            $likedUserId = $data->likedUserId;

            // Initialiser la connexion à la base de données
            $db = new Database();

            // Vérifier si l'utilisateur a liké l'autre utilisateur
            $userLike = $db->select('likes')
                ->where('liker_id', '=')
                ->and('liked_user_id', '=')
                ->execute([$userId, $likedUserId]);

            // Vérifier si l'autre utilisateur a liké l'utilisateur
            $likedUserLike = $db->select('likes')
                ->where('liker_id', '=')
                ->and('liked_user_id', '=')
                ->execute([$likedUserId, $userId]);

            // Déterminer si c'est un match
            $isMatch = !empty($userLike) && !empty($likedUserLike);

            // Retourner le résultat en JSON
            echo json_encode(['isMatch' => $isMatch]);
        } else {
            // Si les données nécessaires ne sont pas présentes, renvoyer une erreur
            echo json_encode(['status' => 'error', 'message' => 'Invalid input']);
        }
    }

    public function matched_users()
    {
        // Initialiser la connexion à la base de données en utilisant la classe Database
        $db = new Database();
    
        // Construire la requête SQL pour récupérer toutes les données de la table "likes"
        $query = $db->select('likes')->execute();
    
        // Vérifier si la requête a réussi et si elle a retourné des données
        if ($query !== false && count($query) > 0) {
            // Retourner les données des likes des utilisateurs en JSON
            echo json_encode($query);
        } else {
            // Retourner un tableau vide en JSON
            echo json_encode([]);
        }
    }
    
    public function getdislikesman()
{
    // Initialiser la connexion à la base de données en utilisant la classe Database
    $db = new Database();

    // Construire la requête SQL pour récupérer toutes les données de la table "likes"
    $query = $db->select('dislikes')->execute();

    // Vérifier si la requête a réussi et si elle a retourné des données
    if ($query !== false && count($query) > 0) {
        // Retourner les données des likes des utilisateurs en JSON
        echo json_encode($query);
    } else {
        // Retourner un tableau vide en JSON
        echo json_encode([]);
    }
}


    public function getlikes()
    {
        // Récupérer les données JSON envoyées en tant que corps de la requête HTTP
        $data = json_decode(file_get_contents("php://input"), true); // Ajout du deuxième argument true pour obtenir un tableau associatif
        // Vérifier que toutes les données nécessaires sont présentes
        if (isset($data['Id'])) {
            $userId = $data['Id'];

            // Initialiser la connexion à la base de données
            $db = new Database();

            // Utiliser une requête préparée pour éviter les injections SQL
            $query = $db->select('likes')
                ->where('liker_id', '=')
                ->execute([$userId]);

            // Vérifier si la requête a été exécutée avec succès
            if ($query !== false) {
                // Retourner les dislikes en JSON avec un code d'état HTTP 200 (OK)
                http_response_code(200);
                echo json_encode($query);
            } else {
                // Retourner un message d'erreur avec un code d'état HTTP 500 (Erreur interne du serveur)
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Failed to execute SQL query']);
            }
        } else {
            // Si l'identifiant de l'utilisateur n'est pas fourni, renvoyer une erreur avec un code d'état HTTP 400 (Demande incorrecte)
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID utilisateur manquant']);
        }
    }


    public function getdislikes()
    {
        // Récupérer les données JSON envoyées en tant que corps de la requête HTTP
        $data = json_decode(file_get_contents("php://input"), true); // Ajout du deuxième argument true pour obtenir un tableau associatif
        // Vérifier que toutes les données nécessaires sont présentes
        if (isset($data['Id'])) {
            $userId = $data['Id'];

            // Initialiser la connexion à la base de données
            $db = new Database();

            // Utiliser une requête préparée pour éviter les injections SQL
            $query = $db->select('dislikes')
                ->where('disliker_id', '=')
                ->execute([$userId]);

            // Vérifier si la requête a été exécutée avec succès
            if ($query !== false) {
                // Retourner les dislikes en JSON avec un code d'état HTTP 200 (OK)
                http_response_code(200);
                echo json_encode($query);
            } else {
                // Retourner un message d'erreur avec un code d'état HTTP 500 (Erreur interne du serveur)
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Failed to execute SQL query']);
            }
        } else {
            // Si l'identifiant de l'utilisateur n'est pas fourni, renvoyer une erreur avec un code d'état HTTP 400 (Demande incorrecte)
            http_response_code(400);
            echo json_encode(['status' => 'error', 'message' => 'ID utilisateur manquant']);
        }
    }
}
