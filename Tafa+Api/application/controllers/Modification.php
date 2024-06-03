<?php

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no-store, must-revalidate");
header("Pragma: no-cache");
header("Expires: 0");

class Modification
{

    private $db;

    public function __construct()
    {
        require_once APPPATH . 'core/Database.class.php';      
        $this->db = new Database();
    }

    public function modification()
    {
        // Récupérer les données JSON envoyées
        $data = json_decode(file_get_contents('php://input'), true);
      
        
        if (!empty($data)) {
            $db = new Database();
        
            // Vérifier si une entrée avec cet ID existe déjà
            $existing_entry = $db->select('emploi_etudes')
                                 ->where('Id', '=')
                                 ->execute([$data['Id']], 'assoc');
        
            if (!empty($existing_entry)) {
                // Effectuer une mise à jour
                $updated = $db->update('emploi_etudes')
                              ->parametters(['Emploi', 'Etudes', 'Centre_d_interet', 'Langue'])
                              ->where('Id', '=')
                              ->execute([$data['Emploi'], 
                                         $data['Etudes'], 
                                         $data['Centre_d_interet'], 
                                         $data['Langue'], 
                                         $data['Id']]);
        
                if ($updated !== false) {
                    echo "Mise à jour réussie.";
                } else {
                    echo "Échec de la mise à jour.";
                }
            } else {
                // Effectuer une insertion
                $inserted = $db->insert('emploi_etudes')
                               ->parametters(['Emploi', 'Etudes', 'Centre_d_interet', 'Langue', 'Id'])
                               ->execute([$data['Emploi'], 
                                          $data['Etudes'], 
                                          $data['Centre_d_interet'], 
                                          $data['Langue'], 
                                          $data['Id']]);
                                          
                if ($inserted !== false) {
                    echo "Insertion réussie.";
                } else {
                    echo "Échec de l'insertion.";
                }
            }
        }
        }
    
        public function ModificationMotdepasse()
        {
            // Récupérer les données JSON envoyées
            $data = json_decode(file_get_contents('php://input'), true);
          
            
            if (!empty($data)) {
                $db = new Database();
            
                $db = new Database();
        
        // Construction de la requête SQL
        $query = $db->select('inscription')
                    ->where('Id', '=')
                    ->execute([$data['Id']], 'assoc');
        
        // Exécution de la requête et récupération du résultat
        $result = $query[0]['Mots_de_passe'];
           var_dump($result);
        
           if ($result == $data['Ancien_mot_de_passe']) {
            // Mise à jour du mot de passe dans la base de données
            $updated = $db->update('inscription')
                ->parametters(['Mots_de_passe'])
                ->where('Id', '=')
                ->execute([$data['Nouveau_mot_de_passe'], $data['Id']]);
            
                if ($updated !== false) {
                    echo "Mise à jour réussie.";
                } else {
                    echo "Échec de la mise à jour.";
                }
        } else {
        echo "L'ancien mot de passe ne correspond pas.";
        }
         }
        }  
        
        

        public function modificationInformationgenerale()
        {
            // Récupérer les données JSON envoyées
            $data = json_decode(file_get_contents('php://input'), true);
          
            if (!empty($data)) {
                $db = new Database();
            
                $updated = $db->update('inscription')
                    ->parametters(['Nom', 'Sexe', 'Situation'])
                    ->where('Id', '=')
                    ->execute([$data['Nom'], $data['Sexe'], $data['Situation'], $data['Id']]);
                
                if ($updated !== false) {
                    echo "Mise à jour réussie.";
                } else {
                    echo "Échec de la mise à jour.";
                }
            }


            }

        
            public function modificationInformationgeneralepartie2()
            {
                // Récupérer les données JSON envoyées
                $data = json_decode(file_get_contents('php://input'), true);
              
                if (!empty($data)) {
                    $db = new Database();
                
                    // Vérifier si une entrée avec cet ID existe déjà
                    $existing_entry = $db->select('information_generales')
                                         ->where('Id', '=')
                                         ->execute([$data['Id']], 'assoc');
                
                    if (!empty($existing_entry)) {
                        // Effectuer une mise à jour
                        $updated = $db->update('information_generales')
                                      ->parametters([ 'Signe_Astrologie', 'Objectif', 'Alcool','Cigarette'])
                                      ->where('Id', '=')
                                      ->execute([ 
                                                 $data['Signe_Astrologie'], 
                                                 $data['Objectif'], 
                                                 $data['Alcool'], 
                                                 $data['Cigarette'], 
                                                 $data['Id']]);
                
                        if ($updated !== false) {
                            echo "Mise à jour réussie.";
                        } else {
                            echo "Échec de la mise à jour.";
                        }
                    } else {
                        // Effectuer une insertion
                        $inserted = $db->insert('information_generales')
                        ->parametters([ 'Signe_Astrologie', 'Objectif', 'Alcool','Cigarette'])
                                       ->execute([
                                       $data['Signe_Astrologie'], 
                                       $data['Objectif'], 
                                       $data['Alcool'], 
                                       $data['Cigarette'], 
                                       $data['Id']]);
                                                  
                        if ($inserted !== false) {
                            echo "Insertion réussie.";
                        } else {
                            echo "Échec de l'insertion.";
                        }
                    }
                }
                }
        
        }

