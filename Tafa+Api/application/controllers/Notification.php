<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

class Notification extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }

    // Méthode pour enregistrer une visite de profil
    public function save_visit()
    {
        // Récupérer les données envoyées dans le corps de la requête
        $requestData = json_decode(file_get_contents('php://input'), true);

        // Vérifier si les données sont bien présentes
        if (isset($requestData['visitedUserId']) && isset($requestData['visitorUserId'])) {
            // Récupérer les données envoyées
            $visitedUserId = $requestData['visitedUserId'];
            $visitorUserId = $requestData['visitorUserId'];

            // Enregistrer la visite de profil dans la base de données
            $this->db->insert('fcm_tokens')->parametters(['visitedUserId', 'visitorUserId'])->execute([$visitedUserId, $visitorUserId]);

            // Répondre avec un code HTTP 200 OK si tout s'est bien passé
            http_response_code(200);

            // Envoyer la notification en temps réel
            $this->send_notification($visitedUserId, $visitorUserId);
        } else {
            // Répondre avec un code HTTP 400 Bad Request si des données sont manquantes
            http_response_code(400);
        }
    }

    // Méthode pour envoyer une notification en temps réel
    private function send_notification($visitedUserId, $visitorUserId)
    {
        // Récupérer le token FCM de l'utilisateur visité depuis la base de données
        $fcmToken = $this->get_fcm_token($visitedUserId);

        // Vérifier si le token FCM est valide
        if ($fcmToken) {
            // Construire le message de la notification
            $message = array(
                'to' => $fcmToken,
                'notification' => array(
                    'title' => 'Nouvelle visite de profil',
                    'body' => 'Votre profil a été visité par un utilisateur'
                ),
            );

            // Envoyer la notification en utilisant la méthode sendFcmNotification
            $this->sendFcmNotification($message);
        }
    }

    // Méthode pour récupérer le token FCM de l'utilisateur visité depuis la base de données
    private function get_fcm_token($userId)
    {
        // Implémentez la logique pour récupérer le token FCM de l'utilisateur visité depuis la base de données
        // Par exemple, vous pouvez utiliser une requête SQL pour récupérer le token à partir d'une table de tokens FCM
        // Assurez-vous de remplacer cette logique par la logique réelle de récupération du token FCM de l'utilisateur
        // et de retourner le token FCM.
        // Exemple fictif :
        $query = $this->db->select('fcm_token')->where('user_id', $userId)->get('fcm_tokens');
        $result = $query->row();
        return $result ? $result->fcm_token : null;
    }

    // Méthode pour envoyer une notification Firebase Cloud Messaging (FCM)
    private function sendFcmNotification($message)
    {
        // URL de l'API FCM
        $url = 'https://fcm.googleapis.com/fcm/send';

        // Clé de serveur FCM
        $serverKey = 'YOUR_SERVER_KEY'; // Remplacez par votre clé de serveur FCM

        // En-têtes de la requête HTTP
        $headers = array(
            'Authorization: key=' . $serverKey,
            'Content-Type: application/json'
        );

        // Initialisation de cURL
        $ch = curl_init();

        // Configuration de cURL
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($message));

        // Exécution de la requête cURL
        $result = curl_exec($ch);

        // Fermeture de la session cURL
        curl_close($ch);

        // Retour du résultat
        return $result;
    }
}
