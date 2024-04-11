<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Exires:0");

class verificationdonneer extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }
    public function verification()
    {
        // Récupérer les données JSON envoyées
    $data = json_decode(file_get_contents('php://input'), true);

    // Vérifier si toutes les données requises sont présentes
    if (isset($data['Nom'], $data['Pseudo'], $data['Email'])) {
        
        // Vérifier si le nom, le pseudo ou l'email existent déjà dans la base de données
        $existingUser = $this->db->select()
                                ->from('inscription')
                                ->where('Nom = :Nom OR Pseudo = :Pseudo OR Email = :Email')
                                ->bind(':Nom', $data['Nom'])
                                ->bind(':Pseudo', $data['Pseudo'])
                                ->bind(':Email', $data['Email'])
                                ->fetch();

        if ($existingUser) {
          //  echo json_encode(array('error' => 'Un utilisateur avec ce nom, ce pseudo ou cet email existe déjà.'));
        } else {
          //  echo json_encode(array('success' => true, 'message' => 'Aucun utilisateur avec ces informations.'));
        }
    } else {
     //   echo json_encode(array('error' => 'Certaines données sont manquantes.'));
    }
    }

    
   
    
    
}
