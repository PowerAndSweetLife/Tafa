<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Exires:0");

class Api extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }
    public function insert_data()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['Nom'], $data['Prenom'], $data['Pseudo'], $data['Email'], $data['Ville'], $data['Sexe'], $data['Situation'], $data['Date_de_naissance'], $data['Mots_de_passe'])) {



            if (!filter_var($data['Email'], FILTER_VALIDATE_EMAIL)) {
                echo json_encode(array('success' => false, 'message' => "Veuillez entrer une adresse email valide."));
                return;
            }

            $email_exists_query = $this->db->select('user')
                ->where('email', '=')
                ->execute([$data['Email']], 'assoc');


            if ($email_exists_query && count($email_exists_query) > 0) {
                echo json_encode(array('success' => false, 'message' => "Cet email est déjà utilisé par un autre utilisateur."));
                return;
            }




            $db = new Database();
            $inserted = $db->insert('user')
                ->parametters(['pseudo', 'firstname', 'lastname', 'v_natale', 'd_naissance', 'sexe', 'email', 'situation', 'password', "confirm_inscription", "is_confirmed", "status"])
                ->execute([trim($data['Pseudo']), trim($data['Nom']), trim($data['Prenom']), trim($data['Ville']), $data['Date_de_naissance'], $data['Sexe'], trim($data['Email']), $data['Situation'], password_hash($data['Mots_de_passe'], PASSWORD_DEFAULT), "", 1, 0,]);

            $pseudo = $data['Pseudo'];


            $user_id_query = $db->select('user')
                ->where('pseudo', '=')
                ->execute([$pseudo], 'assoc');

            if ($user_id_query) {
                $user_id = $user_id_query[0]['Id'];


                $result_images = $this->db->insert('images')
                    ->parametters(['id'])
                    ->execute([$user_id]);


                $result_emploi_etudes = $this->db->insert('emploi_etudes')
                    ->parametters(['id'])
                    ->execute([$user_id]);

                $result_information_generales = $this->db->insert('information_generales')
                    ->parametters(['id'])
                    ->execute([$user_id]);
            } else {
                echo 'Aucun résultat trouvé.';
            }
        } else {
            echo 'Échec de l\'enregistrement dans la table User.';
        }
    }
}
