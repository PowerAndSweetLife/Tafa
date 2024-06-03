<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");

class uploadimage extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }
     
  

    public function update_image() {
        if (isset($_FILES['image'])) {
            $Id = $_POST['Id'];
            $target_directory = "assets/Images/Users/";
    
            // Générer un nom de fichier unique avec un UUID
            $imageFileName = uniqid() . '_' . basename($_FILES["image"]["name"]);
            $target_file = $target_directory . $imageFileName;
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    
            // Vérifier si le fichier est une image réelle
            $check = getimagesize($_FILES["image"]["tmp_name"]);
            if ($check === false) {
                echo json_encode('Le fichier n\'est pas une image.');
                return;
            }
    
            // Vérifiez si le fichier existe déjà
            if (file_exists($target_file)) {
                echo json_encode('Le fichier existe déjà.');
                return;
            }
    
            // Vérifier la taille de l'image
            if ($_FILES["image"]["size"] >  10000000) {
                echo json_encode('Désolé, votre fichier est trop volumineux.');
                return;
            }
    
            // Autoriser certains formats de fichiers
            if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
                echo json_encode('Désolé, seuls les fichiers JPG, JPEG, PNG & GIF sont autorisés.');
                return;
            }
    
            // Déplacer le fichier téléchargé vers le répertoire cible
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                echo json_encode('Le fichier ' . htmlspecialchars($imageFileName) . ' a été téléchargé.');
                // Mettre à jour la base de données avec le chemin de l'image enregistrée
                $result = $this->db->update('images')
                    ->parametters(['img_link'])
                    ->where('Id', '=')
                    ->execute(array($target_file, $Id));
                if (!$result) {
                    echo json_encode('Échec de la mise à jour de la base de données.');
                }
            } else {
                echo json_encode('Désolé, une erreur s\'est produite lors du téléchargement de votre fichier.');
            }
        } else {
            echo json_encode('Aucune image n\'a été téléchargée.');
        }
    }
       public function update_imagecouverture() {
        if (isset($_FILES['image'])) {
            $Id = $_POST['Id'];
            $target_directory = "assets/Images/Users/";
    
            // Générer un nom de fichier unique avec un UUID
            $imageFileName = uniqid() . '_' . basename($_FILES["image"]["name"]);
            $target_file = $target_directory . $imageFileName;
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    
            // Vérifier si le fichier est une image réelle
            $check = getimagesize($_FILES["image"]["tmp_name"]);
            if ($check === false) {
                echo json_encode('Le fichier n\'est pas une image.');
                return;
            }
    
            // Vérifiez si le fichier existe déjà
            if (file_exists($target_file)) {
                echo json_encode('Le fichier existe déjà.');
                return;
            }
    
            // Vérifier la taille de l'image
            if ($_FILES["image"]["size"] >  10000000) {
                echo json_encode('Désolé, votre fichier est trop volumineux.');
                return;
            }
    
            // Autoriser certains formats de fichiers
            if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
                echo json_encode('Désolé, seuls les fichiers JPG, JPEG, PNG & GIF sont autorisés.');
                return;
            }
    
            // Déplacer le fichier téléchargé vers le répertoire cible
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
                echo json_encode('Le fichier ' . htmlspecialchars($imageFileName) . ' a été téléchargé.');
                // Mettre à jour la base de données avec le chemin de l'image enregistrée
                $result = $this->db->update('images')
                    ->parametters(['img_couverture'])
                    ->where('Id', '=')
                    ->execute(array($target_file, $Id));
                if (!$result) {
                    echo json_encode('Échec de la mise à jour de la base de données.');
                }
            } else {
                echo json_encode('Désolé, une erreur s\'est produite lors du téléchargement de votre fichier.');
            }
        } else {
            echo json_encode('Aucune image n\'a été téléchargée.');
        }
    }
    
   
    
  public function update_image1() {
    if (isset($_FILES['image'])) {
        $Id = $_POST['Id'];
        $target_directory = "assets/Images/Users/";
      //  $pseudo = "Miary";
      //  $imageFileName = "test.jpg";
        // Générer un nom de fichier unique avec un UUID
        $imageFileName = uniqid() . '_' . basename($_FILES["image"]["name"]);
        $target_file = $target_directory . $imageFileName;
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Vérifier si le fichier est une image réelle
        $check = getimagesize($_FILES["image"]["tmp_name"]);
        if ($check === false) {
            echo json_encode('Le fichier n\'est pas une image.');
            return;
        }

        // Vérifiez si le fichier existe déjà
        if (file_exists($target_file)) {
            echo json_encode('Le fichier existe déjà.');
            return;
        }

        // Vérifier la taille de l'image
        if ($_FILES["image"]["size"] >  10000000) {
            echo json_encode('Désolé, votre fichier est trop volumineux.');
            return;
        }

        // Autoriser certains formats de fichiers
        if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif") {
            echo json_encode('Désolé, seuls les fichiers JPG, JPEG, PNG & GIF sont autorisés.');
            return;
        }

        // Déplacer le fichier téléchargé vers le répertoire cible
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            echo json_encode('Le fichier ' . htmlspecialchars($imageFileName) . ' a été téléchargé.');


            $result = $this->db->select('images')
            ->where('Id', '=')
            ->execute(array($Id));
        
        $updatedField = null;
        
        // Parcourir chaque champ img_* pour trouver le premier champ vide
        for ($i = 1; $i <= 7; $i++) {
            $imgField = "img_$i";
            if (empty($result[0]->$imgField)) {
                // Si le champ est vide, mettre à jour ce champ avec le nouveau fichier
                $updateResult = $this->db->update('images')
                    ->parametters([$imgField]) // Utilisation correcte de la méthode parameters
                    ->where('Id', '=')
                    ->execute(array($target_file, $Id)); // Utilisation de la variable liée dans la requête
                $updatedField = $imgField;
                break; // Sortir de la boucle une fois que le champ vide est trouvé
            }
        }
        
        // Vérifier si un champ a été mis à jour
        if ($updatedField) {
            echo "Mise à jour réussie pour le champ $updatedField avec l'image $target_file.";
        } else {
            echo "Aucun champ vide trouvé pour l'insertion de l'image.";
        }
        


           if ($updateResult === 0) {
            echo json_encode('Échec de la mise à jour de la base de données.');
        } else {
            echo json_encode("Mise à jour réussie pour le champ $updatedField avec l'image $imageFileName.");
        }
        } else {
            echo json_encode('Désolé, une erreur s\'est produite lors du téléchargement de votre fichier.');
        }
    } else {
        echo json_encode('Aucune image n\'a été téléchargée.');
    }
}

    
}


