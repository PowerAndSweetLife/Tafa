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
            $Email = trim($data['Email']);
            // Generate a JWT token with the user's email as payload

            $db = new Database();
            // Générer un nouveau mot de passe aléatoire
            $newPassword = $this->generateRandomPassword();
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            // Effectuez une requête pour vérifier les informations d'authentification
            $result = $db->select('user')
                ->where('email', '=')
                ->execute([$Email]);

            // Vérifiez si l'authentification a réussi et s'il y a des données d'utilisateur
            if ($result && count($result) > 0) {
                echo json_encode(array('success' => true, 'message' => 'Un e-mail de réinitialisation de mot de passe a été envoyé à ' . $Email));
                // Récupérer l'ID de l'utilisateur correspondant à l'e-mail
                $user = $result[0]; // Supposons que la première ligne correspond à l'utilisateur
                $userId = $user['id']; // Assurez-vous que 'id' correspond au nom de la colonne contenant l'ID dans votre table d'utilisateurs
                $resetPasswordCheck = $db->select('resetpassword')
                    ->where('user_id', '=')
                    ->execute([$userId]);

                if ($resetPasswordCheck && count($resetPasswordCheck) > 0) {
                    // L'ID de l'utilisateur existe déjà dans la table resetpassword, donc effectuer une mise à jour
                    $db->update('resetpassword')
                        ->parametters(['new_password', 'created_at'])
                        ->where('user_id', '=')
                        ->execute([$hashedPassword, time(), $userId]);
                } else {
                    // L'ID de l'utilisateur n'existe pas dans la table resetpassword, donc insérer de nouvelles données
                    $resetPasswordData = array(
                        'user_id' => $userId,
                        'new_password' => $hashedPassword,
                        'created_at' => time()
                    );
                    $db->insert('resetpassword', $resetPasswordData);
                }
                // Mettre à jour le mot de passe dans la base de données
                $db->update('user')
                    ->parametters(['password'])
                    ->where('email', '=')
                    ->execute([($hashedPassword), $Email]);
                $db->select('resetpassword')
                    ->
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

        $this->email->from('niryinfo@gmail.com', 'Tafa');
        $this->email->to($Email);
        $this->email->subject('Réinitialisation de mot de passe sur la plateforme tafa.mg');
        $this->email->message("<p>
        Voici votre <strong> nouveau mot de passe temporaire : </strong> <code>" . $newPassword . "</code> <br>
        <strong> Vous ne pourrez l'utiliser que pour une seule connexion, après quoi elle se désagrégera.</strong>
        Une fois connecter à votre compte, nous vous prions donc de <strong>changer votre mot de passe</strong>. 
    </p>");

        if ($this->email->send()) {
            return true;
        } else {
            return false;
        }
    }
}
