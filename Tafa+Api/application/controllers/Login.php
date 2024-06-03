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
    public function connexion($email,$motDePasse) {
        // Récupérez les données de la requête JSON
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body);
      
        // Récupérez l'email et le mot de passe
       $email = $data->Email;
        $motDePasse = $data->Mots_de_passe;
      //  $email = 'harimahandritiana@gmail.com';
      //  $motDePasse = '123';
      
        // Vérifiez si l'email et le mot de passe sont non vides
        if (empty($email) || empty($motDePasse)) {
          echo json_encode(array('success' => false, 'message' => "Adresse e-mail ou mot de passe manquant"));
          
          return;

        }
        
        $db = new Database();
        
        // Vérifiez si l'utilisateur existe dans la base de données
        $user = $db->select('inscription')
                    ->where('Email', '=')
                    ->and('Mots_de_passe', '=')
                    ->execute([$email, $motDePasse]);
                   
        if (!empty($user)) {
          // L'utilisateur existe dans la base de données
         echo json_encode(array('success' => true, 'message' => "Connexion réussie"));
        } else {
          // L'utilisateur n'existe pas ou les informations d'identification sont incorrectes
         
          echo json_encode(array('success' => false, 'message' => "Adresse e-mail ou mot de passe incorrect"));
        }
       // $this->getNomUtilisateurByEmail($email);
      }
    }