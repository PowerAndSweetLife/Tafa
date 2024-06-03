<?php
defined('BASEPATH') OR exit('No direct script access allowed');
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json");
header("Cache-Control: no-cache, no store , must-revalidate");
header("Pragma: no-cache");
header("Expires:0");
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/
$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
$route['test'] = 'Api/test_data';
$route['Insertion']= 'Api/insert_data';
$route['authentification']= 'Auth/authentification';
$route['resetPassword'] = 'resetPassword/resetPassword_data';
$route['users'] = 'recuperationdonneer/get_users';
$route['getusers'] = 'recuperationdonneer/users';
$route['usersBlocked'] = 'recuperationdonneer/usersBlocked';
$route['get_Apropos'] = 'recuperationsdesapropos/get_Apropos';
$route['get_users_contenu'] = 'recuperationsdesapropos/get_users_contenu';

$route['update_image'] = 'uploadimage/update_image';
$route['update_imagecouverture'] = 'uploadimage/update_imagecouverture';
$route['update_image1'] = 'uploadimage/update_image1/pseudo/imageFileName';
$route['delete_image'] = 'deleteimages/delete_image';
$route['Verification'] = 'verificationdonneer/verification';
$route['visiter'] = 'Notification/save_visit';
$route['sendNotification'] = 'Notification/sendNotification';
$route['resetPassword'] = 'resetPassword/resetPassword_data';
$route['logout'] = 'deconnexion/logout';
$route['Blocage'] = 'Blocage/bloquer';
$route['deblocage'] = 'Blocage/deblocage';
$route['updateEnligne'] = 'Auth/updateEnligne';

$route['insertlike'] = 'likeDislike/insertlike';
$route['insertdislike'] = 'likeDislike/insertdislike';

$route['getlikes'] = 'likeDislike/getlikes';
$route['getdislikesman'] = 'likeDislike/getdislikesman';

$route['check_matches'] = 'likeDislike/check_matches';
$route['matched_users'] = 'likeDislike/matched_users';

$route['getusercontenuMatch'] = 'recuperationdonneer/getusercontenuMatch';





$route['getDiscussion'] = 'Messenger/getDiscussion'; // Assurez-vous que cette route correspond à l'URL attendue par votre application

$route['getDiscussion/(:any)'] = 'Messenger/getDiscussion/$1';
$route['create'] = 'Messenger/create';
$route['markAsReads'] = 'Messenger/markAsReads';
$route['getUnreadMessageCount'] = 'Messenger/getUnreadMessageCount';




//$route['Notification/emit_new_notification/(:num)/(:num)'] = 'Notification/emit_new_notification/$visitedUserId/$visitorUserId';

$route['test'] = 'test/test';