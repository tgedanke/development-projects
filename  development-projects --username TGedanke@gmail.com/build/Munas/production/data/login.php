<?php
class Response
{
    public $success = false;
    public $msg = '';
	public $username = '';
}
$response = new Response();
//echo '1';
if ( !empty( $_POST['user'] )) {
   include_once "dbConnect.php";
    /*$db_user = "munas_dba";
	$db_pwd = "munas_dba";
	$db_sid = "munas";
	$db_conn = oci_connect("$db_user", "$db_pwd", "$db_sid");*/
	$query = "select * from table(f_check_s_users('{$_POST[user]}','{$_POST[password]}'))"; 
	//$query = "select * from table(f_check_s_users('ad','12'))"; 
	//$query = stripslashes($query);
	$result = oci_parse($db_conn, $query);
	oci_execute($result); 
    
   // $result=mssql_query($query);
	$row = oci_fetch_assoc($result);
	//echo ($row["LOGIN"]);
	//echo ($_POST['user']);
	
    if( $row["LOGIN"]!=$_POST['user'] ) {
	$response->success = false;
	$response->msg = 'Неверное имя пользователя или пароль...';
	//echo '111';
	}
        else {
           //$row = oci_fetch_assoc($result);
		  
           if ($row["IS_DISABLE"] == 1) { 
		   $response->success = false;
		   $response->msg='Доступ блокирован...';
		   }
                else {
                   session_start();
				   $_SESSION['user_login'] = $_POST['user'];
                   $_SESSION['user_key'] = $row['KEY'];
                   $_SESSION['user_name'] = /*iconv("windows-1251", "UTF-8", "{*/$row['USER_NAME']/*}")*/;
				   $_SESSION['key_state']=$row['KEY_STATE'];
                   $response->success = true;
				   $response->msg = $_SESSION['user_key']; 
				   $response->username = $_SESSION['user_name'];
				   //$response->key_state = $_SESSION['key_state'];
                }; 
        }; 
	oci_free_statement($result);	
    }
	
echo json_encode($response);
?>