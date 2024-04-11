<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

class test extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }
  /*  public function update_image() {
        // Définir les données directement dans le code
       /* $data = array(
            "pseudo" => "Miary",
            "img_link" => "test.jpg"
        );*/
        /*$data = json_decode(file_get_contents('php://input'), true);
        // Vérifier si toutes les données requises sont présentes
        if (isset($data['pseudo'], $data['img_link'])) {
            $pseudo = $data['pseudo'];
            $img_link = $data['img_link'];
    
            // Créer une instance de la classe Database
            $db = new Database();
    
            // Mise à jour du champ 'img_link' dans la table 'inscription'
            $result = $db->update('inscription')
                         ->parametters(['img_link'])
                         ->where('Pseudo', '=')
                         ->execute(array($img_link, $pseudo));
    
            // Vérifier si la mise à jour a réussi
            if ($result) {
                echo json_encode('Mise à jour réussie.');
            } else {
                echo json_encode('Échec de la mise à jour.');
            }
        } else {
            echo json_encode('Certaines données sont manquantes.');
        }
    }*/
    
    
    
    public function test() {
   /*     $pseudo = "miary";
        $target_file = "test3.jpg";
    
        $result = $this->db->select('inscription')
      
            ->where('Pseudo', '=')
            ->execute(array($pseudo));
    
        // Vérifier si le champ img_1 est vide dans la première ligne de résultat
        if (empty($result[0]->img_1)) {
            // Si img_1 est vide, mettre à jour img_1 avec le nouveau fichier
            $updateResult = $this->db->update('inscription')
                ->parametters(['img_1']) // Utilisation correcte de la méthode parameters
                ->where('Pseudo', '=')
                ->execute(array($target_file,$pseudo)); // Utilisation de la variable liée dans la requête
            $updatedField = 'img_1';
        } else {
            // Si img_1 n'est pas vide, mettre à jour img_2 avec le nouveau fichier
            $updateResult = $this->db->update('inscription')
                ->parametters(['img_2']) // Utilisation correcte de la méthode parameters
                ->where('Pseudo', '=')
                ->execute(array($target_file,$pseudo)); // Utilisation de la variable liée dans la requête
            $updatedField = 'img_2';
        }

        
        if (empty($result[0]->img_2)) {
            // Si img_1 est vide, mettre à jour img_1 avec le nouveau fichier
            $updateResult = $this->db->update('inscription')
                ->parametters(['img_2']) // Utilisation correcte de la méthode parameters
                ->where('Pseudo', '=')
                ->execute(array($target_file,$pseudo)); // Utilisation de la variable liée dans la requête
            $updatedField = 'img_2';
        } else {
            // Si img_1 n'est pas vide, mettre à jour img_2 avec le nouveau fichier
            $updateResult = $this->db->update('inscription')
                ->parametters(['img_3']) // Utilisation correcte de la méthode parameters
                ->where('Pseudo', '=')
                ->execute(array($target_file,$pseudo)); // Utilisation de la variable liée dans la requête
            $updatedField = 'img_3';
        }*/


       //
        
     /*   $result = $this->db->select('inscription')
            ->where('Pseudo', '=')
            ->execute(array($pseudo));
        
        $updatedField = null;
        
        // Parcourir chaque champ img_* pour trouver le premier champ vide
        for ($i = 1; $i <= 6; $i++) {
            $imgField = "img_$i";
            if (empty($result[0]->$imgField)) {
                // Si le champ est vide, mettre à jour ce champ avec le nouveau fichier
                $updateResult = $this->db->update('inscription')
                    ->parametters([$imgField]) // Utilisation correcte de la méthode parameters
                    ->where('Pseudo', '=')
                    ->execute(array($target_file, $pseudo)); // Utilisation de la variable liée dans la requête
                $updatedField = $imgField;
                break; // Sortir de la boucle une fois que le champ vide est trouvé
            }
        }
        
        // Vérifier si un champ a été mis à jour
        if ($updatedField) {
            echo "Mise à jour réussie pour le champ $updatedField avec l'image $target_file.";
        } else {
            echo "Aucun champ vide trouvé pour l'insertion de l'image.";
        }*/
        


      /*  $result = $this->db->update('inscription')
        ->parametters(['img_link'])
      
        ->Where('Id', '=') // Ajoutez la condition avec l'Id-utilisateur
        ->execute(array($target_file, $Id));*/
       
       /* $result = $this->db->update('inscription')
        ->parametters(['img_couverture'])
        ->where('Id', '=')
        ->execute(array($target_file, $Id));*/
      // Requête SQL pour récupérer les données des deux tables/*
// Création d'une instance de la classe Database
$data = json_decode('{
    "Nom": "Doe",
    "Prenom": "John",
    "Pseudo": "johndoe",
    "Email": "johndoe@example.com",
    "Sexe": "Homme",
    "Situation": "Célibataire",
    "Date_de_naissance": "1990-01-01",
    "Mots_de_passe": "motdepasse123",
    "Confirmation": "motdepasse123"
}', true);


$db = new Database();
$inserted = $db->insert('inscription')
->parametters(['Nom', 'Prenom', 'Pseudo', 'Email', 'Sexe', 'Situation', 'Date_de_naissance', 'Mots_de_passe', 'Confirmation'])
->execute([$data['Nom'], $data['Prenom'], $data['Pseudo'], $data['Email'], $data['Sexe'], $data['Situation'], $data['Date_de_naissance'], $data['Mots_de_passe'], $data['Confirmation']]);

$pseudo =$data['Pseudo'];

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












    
}


    }
