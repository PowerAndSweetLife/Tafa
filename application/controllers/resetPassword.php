<?php
defined('BASEPATH') or exit('No direct script access allowed');

header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Exires:0");

class resetPassword extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        require_once APPPATH . 'core/Database.class.php';
        $this->db = new Database();
    }
    public function resetPassword_data()
    {
        $data = json_decode(file_get_contents('php://input'), true);

        // Vérifier si l'e-mail a été envoyé
        if (isset($data['Email'])) {
            $Email = $data['Email'];
            // Generate a JWT token with the user's email as payload

            $db = new Database();
            // Générer un nouveau mot de passe aléatoire
            $newPassword = $this->generateRandomPassword();


            // Effectuez une requête pour vérifier les informations d'authentification
            $result = $db->select('inscription')
                ->where('Email', '=')
                ->execute([$Email]);

            // Vérifiez si l'authentification a réussi et s'il y a des données d'utilisateur
            if ($result && count($result) > 0) {
                echo json_encode(array('success' => true, 'message' => 'Un e-mail de réinitialisation de mot de passe a été envoyé à ' . $Email));
                // Mettre à jour le mot de passe dans la base de données
                $db->update('inscription')
                    ->parametters(['Mots_de_passe'])
                    ->where('Email', '=')
                    ->execute([($newPassword), $Email]);

                // Envoyer le token et le nouveau mot de passe à l'e-mail de l'utilisateur
                $this->sendPasswordResetEmail($Email, $newPassword);
            } else {
                // L'authentification a échoué
                echo json_encode(array('success' => false, 'message' => 'Adresse e-mail incorrect.'));
            }
        } else {
            // Les données de l'e-mail sont manquantes
            echo json_encode(array('success' => false, 'message' => 'Veuillez fournir une adresse e-mail pour réinitialiser le mot de passe.'));
        }
    }
    private function generateRandomPassword()
    {
        // Générer un mot de passe aléatoire de 8 caractères
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $password = '';
        for ($i = 0; $i < 8; $i++) {
            $index = rand(0, strlen($characters) - 1);
            $password .= $characters[$index];
        }
        return $password;
    }
    private function sendPasswordResetEmail($Email, $newPassword)
    {
        $this->load->library('email');

        $config['protocol'] = 'smtp';
        $config['smtp_host'] = 'localhost';
        $config['smtp_port'] = 1025;

        $this->email->initialize($config);
        $this->email->set_newline("\r\n");

        $this->email->from('tafa@gmail.com', 'Tafa');
        $this->email->to($Email);
        $this->email->subject('Réinitialisation de votre mot de passe');
        $this->email->message("Bonjour,\n\nVous avez demandé une réinitialisation de votre mot de passe.\n\nVotre nouveau mot de passe est : $newPassword\n\nVeuillez utiliser ce nouveau mot de passe pour vous connecter à votre compte.\n\nCordialement,\nVotre équipe de support.");

        if ($this->email->send()) {
            return true;
        } else {
            return false;
        }

    }
}
