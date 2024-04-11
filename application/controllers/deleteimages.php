<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

class deleteimages extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }
     
  

   
    public function delete_image() {
    
        $data = json_decode(file_get_contents('php://input'), true);
    
     
        if (isset($data['Id']) && isset($data['imgIndex'])) {
            $Id = $data['Id'];
            $imgIndex = $data['imgIndex'];
    
            
            $imgField = "img_" . $imgIndex;
    
          
         
    
            
           
                
                        $updateResult = $this->db->update('images')
                            ->parametters([$imgField])
                            ->where('Id', '=')
                            ->execute(array('', $Id));
    
                       
                  
           
        } else {
            echo json_encode("Données manquantes pour supprimer l'image.");
            return;
        }
    }
       
    }
    
   
    
  
    
