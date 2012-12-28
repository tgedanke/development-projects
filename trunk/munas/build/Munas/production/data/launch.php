<?php

class Response
{
    public $success = false;
    public $msg = '';
	public $username = '';
}
$response = new Response();
session_start();
//echo $_SESSION['user_key'];
if ( !empty( $_SESSION['user_login'] ) && (!empty( $_SESSION['user_key'] ) || $_SESSION['user_key']==0)) {
    
	$_SESSION['admin_key']=null;
	$response->success = true;
	$response->msg = $_SESSION['user_key'];
    $response->username =$_SESSION['user_name'];               
    
    } else {
	$_SESSION['admin_key']=null;
	$response->success = false;
	$response->msg='Доступ блокирован...';
	
	
	}
echo json_encode($response);
?>