<?php 

class Messenger extends ApiController
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model("MessengerModel","messenger");
        $this->load->model("NotificationModel","notification");
        $this->load->model("UserModel","user");
        $this->load->library('image_lib', 'image_lib');
    }

    private function getAllDiscussions($max = 0, $page = null)
    {
        $userID = $this->getAuthenticatedUserID(); // Fetch authenticated user ID
        $data = $this->messenger->getDiscussions($userID);
        $notifications = $this->notification->getLastNotificationByUser($userID);
        $admin = $this->user->getAdminForNotif();
        
        $tab = [];
        $j = 0;

        for ($i=0; $i < count($data); $i++) { 
            if($data[$i]->id != $userID) {
                $tab[$j] = $data[$i];
                $j++;
            }
        }

        $offset = $this->calculateOffset($max, $page);

        $discussions = [
            'admin' => $admin, 
            'notification' => $notifications, 
            'discussions' => array_slice($tab, $offset, 2)
        ];

        return $discussions;
    }

    private function calculateOffset($max, $page)
    {
        if ($max == 0) {
            return (!is_null($page)) ? (($page * 2) + MEMBRE_LIMIT) : ((0 * 2) + MEMBRE_LIMIT);
        } else {
            return (!is_null($page)) ? (($page * 2) + (int) $max) : ((0 * 2) + (int) $max);
        }
    }

    private function getAuthenticatedUserID()
    {
        // Implement your method to get the authenticated user ID
        return $_SESSION['userID'];
    }

    public function getDiscussions()
    {
        $discussions = [];

        $max = (int) $_POST['max'] ?? MEMBRE_LIMIT;
        $page = $_POST['page'] ?? null;
        
        $discussions = $this->getAllDiscussions($max, $page);

        echo json_encode($discussions);
    }

    public function getDiscussion($page=0)
    {
        $pseudo = $_GET["pseudo"];
        $userID = $this->getAuthenticatedUserID();

        $friend = $this->user->findOne("pseudo", $pseudo);
        unset($friend->password, $friend->confirm_inscription);

        $friendID = (int) $friend->id;
        $this->messenger->markAsReads($friendID, $userID);
        $messageCount = $this->messenger->getDiscussionCount($userID, $friendID);

        if ($friend->id != -5256761825) {
            $offset = ($page * 10);
            $n_pages = ceil($messageCount / 10);

            $messages = $this->messenger->getDiscussion($userID, $friendID, $offset);
        } else {
            $this->notification->updateUserUnview($userID);
            
            $messageCount = $this->notification->notificationCount();
            $offset = $page;
            $n_pages = $messageCount;

            $messages = $this->notification->getForMessage($offset);
        }

        echo json_encode([
            "messages" => $messages,
            "friend" => $friend,
            "n_pages" => $n_pages,
            "currentPage" => $page,
        ]);
    }

    public function getDiscussionsPaginate()
    {
        $result = $this->getAllDiscussions($_POST['max'], $_POST['page']);
        echo json_encode($result);
    }

    public function filterDiscussionByPseudo()
    {
        $query = trim($_POST['query']);
        $userID = $this->getAuthenticatedUserID();

        if ($query === "") {
            $discussions = $this->getAllDiscussions($_POST['max'] ?? MEMBRE_LIMIT);
        } else {
            $data = $this->messenger->filterDiscussionsByPseudo($userID, "%$query%");

            $discussions = [];
            $j = 0;
            for ($i=0; $i < count($data); $i++) { 
                if($data[$i]->id != $userID) {
                    $discussions[$j] = $data[$i];
                    $j++;
                }
            }
        }

        echo json_encode($discussions);
    }

    public function markAsReads()
    {
        $friendID = (int)$_POST['friendID'];
        $userID = $this->getAuthenticatedUserID();
        $this->messenger->markAsReads($friendID, $userID);
        echo json_encode(["success" => true]);
    }

    public function getUnreadMessageCount()
    {
        $userID = $this->getAuthenticatedUserID();
        echo json_encode(["unread" => $this->messenger->getUnreadMessageCount($userID)]);
    }

    public function create()
    {
        $userID = $this->getAuthenticatedUserID();
        $friendID = (int)$_POST['friendId'];
        $message = "";

        $contenuMessage = htmlspecialchars(trim($_POST['message']));

        if ($_FILES["messengerImage"]['size'] > 0) {
            $filename = "message-". $_SESSION['pseudo'] ."-". time() .".". FileManager::get_extension($_FILES["messengerImage"]);
            $dest = dirname(dirname(dirname(__DIR__))) . DIRECTORY_SEPARATOR . "assets" . DIRECTORY_SEPARATOR . "images" . DIRECTORY_SEPARATOR . "message" . DIRECTORY_SEPARATOR;

            if (move_uploaded_file($_FILES["messengerImage"]["tmp_name"], $dest.$filename)) {
                $message = $this->messenger->create("Un fichier a été partagé.", $userID, $friendID, "pieceJointe", $filename);
            }

            $this->resizeImage($dest, $filename);
        }

        if($contenuMessage !== "") {
            $message = $this->messenger->create($contenuMessage, $userID, $friendID);
        }

        $discussions = $this->getAllDiscussions($_POST['max'] ?? MEMBRE_LIMIT);

        echo json_encode([
            "success" => true,
            "inserted" => $message,
            "discussions" => $discussions,
        ]);
    }

    private function resizeImage($dest, $filename)
    {
        $config['image_library'] = 'gd2';
        $config['source_image'] = $dest.$filename;
        $config['create_thumb'] = FALSE;
        $config['maintain_ratio'] = TRUE;
        $config['width']    = 1500;
        $config['height']   = 1500;
        $config['quality']  = '98%';

        $this->image_lib->clear();
        $this->image_lib->initialize($config);
        $this->image_lib->resize();
    }
}
?>
