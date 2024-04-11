<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Expires:0");

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
        // Récupérer les données JSON envoyées
        $data = json_decode(file_get_contents('php://input'), true);

        // Vérifier si toutes les données requises sont présentes
        if (isset($data['Nom'], $data['Prenom'], $data['Pseudo'], $data['Email'], $data['Sexe'], $data['Situation'], $data['Date_de_naissance'], $data['Mots_de_passe'], $data['Confirmation'])) {

            $db = new Database();
            $inserted = $db->insert('inscription')
                ->parametters(['Nom', 'Prenom', 'Pseudo', 'Email', 'Sexe', 'Situation', 'Date_de_naissance', 'Mots_de_passe', 'Confirmation'])
                ->execute([$data['Nom'], $data['Prenom'], $data['Pseudo'], $data['Email'], $data['Sexe'], $data['Situation'], $data['Date_de_naissance'], $data['Mots_de_passe'], $data['Confirmation']]);

            $pseudo = $data['Pseudo'];

            var_dump($pseudo);

            $user_id_query = $db->select('inscription')
                ->where('Pseudo', '=')
                ->execute([$pseudo], 'assoc');


            if ($user_id_query) {

                $user_id = $user_id_query[0]['Id'];


                $result = $this->db->insert('images')
                    ->parametters(['Id'])

                    ->execute(array($user_id));
            } else {
                echo 'Aucun résultat trouvé.';
            }
        } else {
            echo 'Échec de l\'enregistrement dans la table inscription.';
        }
    }







    public function connexion()
    {
        $this->load->library('session');


        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body);

        $email = $data->Email;
        $motDePasse = $data->Mots_de_passe;



        if (empty($email) || empty($motDePasse)) {
            echo json_encode(array('success' => false, 'message' => "Adresse e-mail ou mot de passe manquant"));
            return;
        }

        $db = new Database();


        $user = $db->select('inscription')
            ->where('Email', '=')
            ->and('Mots_de_passe', '=')
            ->execute([$email, $motDePasse]);


        if (!empty($user)) {

            $this->session->set_userdata('Email', $email);
            echo json_encode(array('success' => true, 'message' => "Connexion réussie"));
        } else {

            echo json_encode(array('success' => false, 'message' => "Adresse e-mail ou mot de passe incorrect"));
        }
    }
}
