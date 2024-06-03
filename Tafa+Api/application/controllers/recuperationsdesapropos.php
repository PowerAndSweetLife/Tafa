<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Exires:0");

class recuperationsdesapropos extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }

    public function get_Apropos()
    {
        // Utilisation de la classe Database pour la connexion à la base de données
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data['userId'])) { // Ajout d'une parenthèse fermante manquante
            $userId = $data['userId'];

            // Requête pour récupérer les données avec une jointure gauche
            $combined_results = $this->db->select('user')
                ->innerD('information_generales', 'id', 'id')
                ->innerD('emploi_etudes', 'id', 'id')
                ->where('user.id', '=') 
                ->execute([$userId]);
            // Utiliser des alias de table pour éviter les ambiguïtés dans la requête SQL
            $query = "SELECT u.id, u.pseudo,u.situation, u.v_natale, u.d_naissance, u.sexe, u.description, u.objectif, 
                      u.nationalite, u.religion, u.o_politique, u.id_adresse, u.id_profession, 
                      u.id_etude,u.status, 
                      e.nom_etude, e.d_debut_etude, e.d_fin_etude, e.l_etude,
                      a.ville,a.pays,
                      p.nom_profession, p.d_debut_profession, p.d_fin_profession, p.l_profession
               FROM user u
               LEFT JOIN etude e ON u.id_etude = e.id_etude
               LEFT JOIN adresse a ON u.id_adresse = a.id_adresse
               LEFT JOIN profession p ON u.id_profession = p.id_profession
               WHERE u.id = $userId";

            // Exécution de la requête avec votre méthode customSelect
            $results = $this->db->customSelect($query, true);

            // Fusionner $combined_results et $results dans un tableau associatif
            $response = array(
                'combined_results' => $combined_results,
                'results' => $results
            );

            // Conversion en JSON
            $json_data = json_encode($response);

            // Définir les en-têtes HTTP
            header("Content-Type: application/json");
            echo $json_data;
        } else {
            echo "L'ID n'est pas défini.";
        }
    }
}
