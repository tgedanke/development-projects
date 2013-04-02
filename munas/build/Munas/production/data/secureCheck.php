<?php
session_start();
if (!isset($_SESSION['user_login']) || !isset($_SESSION['user_key']) || !isset($_SESSION['user_name']))
    {    
    exit;
    };
include "dbConnect.php";			
$in_var_usr = $_SESSION['user_key'];
$in_var_act = $_POST['dbAct'];				
$query = "begin p_s_roles_check(p_key=>{$in_var_usr}, p_name=>'{$in_var_act}',rez=>:b_rez); commit; end;";

$result = ociparse($db_conn, $query);
OCIBindByName($result, ":b_rez", $out_var, 10); // 32 is the return length 
OCIExecute($result, OCI_DEFAULT); 
if ($out_var == 0) 
	 {	 
	 exit;	
	}	

?>
