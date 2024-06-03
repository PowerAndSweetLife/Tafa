<?php 

class MessengerModel extends XModel
{
    public function traitementMessage()
    {
        // ...
    }

    public function getDiscussions($userID)
    {
        $res = DB::customSelect("SELECT user.id, user.status, pseudo, photo, message.idMessage, sender, receiver, lastMessage, lastSender, statusReceiver 
                                    FROM user 
                                    INNER JOIN message ON user.id = message.sender OR user.id = message.receiver 
                                    WHERE sender = ? 
                                    OR receiver = ? 
                                    ORDER BY lastUpdate DESC")  
                                ->executeMess([$userID, $userID]);
        return $res;
    }
    
    public function markAsReads($friendID, $userID)
    {
        $res = DB::customSelect("SELECT idMessage, lastSender, statusReceiver FROM message 
                                    WHERE (sender = ? AND receiver = ?)
                                    OR (sender = ? AND receiver = ?)") 
                                ->executeMess([$friendID, $userID, $userID, $friendID]);

        if (!empty($res)) {
            if ($res[0]->lastSender !== $userID && $res[0]->statusReceiver === 0) {
                DB::update("message")
                    ->parametters(["statusReceiver"])
                    ->where("idMessage","=")
                    ->execute([1, $res[0]->idMessage]);
            }

            DB::update("echange")
                ->parametters(["receiverRead"])
                ->where("idMessage","=")
                ->and("envoyeur", '=')
                ->execute([1, $res[0]->idMessage, $friendID]);
        }
    }

    public function getDiscussionCount($userID, $friendID)
    {
        $res = DB::customQuery("SELECT COUNT(echange.idEchange) AS count FROM echange 
            INNER JOIN message ON message.idMessage = echange.idMessage
            WHERE (message.sender = ? AND message.receiver = ? AND echange.envoyeur = ?) 
            OR (message.receiver = ? AND message.sender = ? AND echange.envoyeur = ?)") 
        ->executeMess([$userID, $friendID, $friendID, $userID, $friendID, $userID]);
        return $res[0]->count;
    }

    public function getDiscussion($userID, $friendID, $offset = 0, $limit = 10)
    {
        $res = DB::customSelect("SELECT * FROM echange 
            INNER JOIN message ON message.idMessage = echange.idMessage 
            WHERE (message.sender = ? AND message.receiver = ? AND echange.envoyeur = ?) 
            OR (message.receiver = ? AND message.sender = ? AND echange.envoyeur = ?) 
            ORDER BY dateSent DESC LIMIT ?, ?") 
            ->executeMess([$userID, $friendID, $friendID, $userID, $friendID, $userID, $offset, $limit]);
        return $res;
    }

    public function filterDiscussionsByPseudo($userID, $query)
    {
        $res = DB::customSelect("SELECT user.id, user.status, pseudo, photo, message.idMessage, sender, receiver, lastMessage, lastSender, statusReceiver 
                                    FROM user 
                                    INNER JOIN message ON user.id = message.sender OR user.id = message.receiver 
                                    WHERE (sender = ? OR receiver = ?) AND pseudo LIKE ? 
                                    ORDER BY lastUpdate DESC")  
                                ->executeMess([$userID, $userID, $query]);
        return $res;
    }

    public function getUnreadMessageCount($userID)
    {
        $res = DB::customSelect("SELECT COUNT(idMessage) AS count FROM message WHERE receiver = ? AND statusReceiver = 0") 
                                ->executeMess([$userID]);
        return $res[0]->count;
    }

    public function create($message, $sender, $receiver, $type="message", $pieceJointe="")
    {
        $res = DB::select("*")->from("message")
            ->where("sender", "=")
            ->and("receiver", "=")
            ->or("sender", "=")
            ->and("receiver", "=")
            ->execute([$sender, $receiver, $receiver, $sender]);

        if(empty($res)) {
            $id = DB::insert("message")
            ->parametters(["sender","receiver", "lastSender","lastMessage"])
            ->output()
            ->execute([$sender, $receiver, $sender, $message]);

            $idEchange = DB::insert("echange")
            ->parametters(["idMessage", "contenuMessage", "dateSent", "type", "pieceJointe", "envoyeur", "receiverRead"])
            ->output()
            ->execute([$id, $message, date("Y-m-d H:i:s"), $type, $pieceJointe, $sender, 0]);
        } else {
            DB::update("message")
                ->parametters(["lastSender","lastMessage","lastUpdate", "statusReceiver"])
                ->where("sender","=")
                ->and("receiver","=")
                ->or("sender", "=")
                ->and("receiver", "=")
                ->execute([$sender, $message, date("Y-m-d H:i:s"), 0, $sender, $receiver, $receiver, $sender]);

            $idEchange = DB::insert("echange")
            ->parametters(["idMessage", "contenuMessage", "dateSent", "type", "pieceJointe", "envoyeur", "receiverRead"])
            ->output()
            ->execute([$res[0]->idMessage, $message, date("Y-m-d H:i:s"), $type, $pieceJointe, $sender, 0]);
        }
        return $idEchange;
    }
}

?>
