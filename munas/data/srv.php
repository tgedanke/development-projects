<?php
session_start();
header("Content-type: text/plain; charset=utf-8");
error_reporting(0);
class Response
{
    public $success = false;
    public $msg = '';
	public $key = '';
}
$response = new Response();

    $dbAct = $_REQUEST['dbAct'];
    include "dbConnect.php";
	/*$db_user = "munas_dba";
	$db_pwd = "munas_dba";
	$db_sid = "munas";
	
    $db_conn = ocilogon( "$db_user", "$db_pwd", "$db_sid" );	*/
    switch ($dbAct) {
        
		case 'setState':
				$in_var_1 = $_REQUEST['key'];
				$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				$in_var_6 = stripslashes($_REQUEST['name']);
				$in_var_7 = $_REQUEST['key_street_house']; 
 				
				$query = "begin p_s_cultural_state(p_key=>:b_key,p_name=>:b_name,p_key_street_house=>:b_key_street_house,p_description=>:b_description,p_user_update=>:b_user_update,p_session_update=>:b_session_update,type_modify=>:b_type_modify,rez=>:b_rez); commit; end;";
				//$query = stripslashes($query);
				
				$result = OCIParse($db_conn, $query); 
				OCIBindByName($result, ":b_key", $in_var_1);
				OCIBindByName($result, ":b_description", $in_var_2);
				OCIBindByName($result, ":b_user_update", $in_var_3);
				OCIBindByName($result, ":b_session_update", $in_var_4);
				OCIBindByName($result, ":b_type_modify", $in_var_5);
				
				OCIBindByName($result, ":b_name", $in_var_6);
				OCIBindByName($result, ":b_key_street_house", $in_var_7);
				
				
            break;
		case 'setEvent':
				$in_var_1 = $_REQUEST['key'];
				$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				$in_var_6 = stripslashes($_REQUEST['name']);
				$in_var_7 = $_REQUEST['key_cultural_state']? $_REQUEST['key_cultural_state'] : 0; 
 				$in_var_8 = stripslashes($_REQUEST['duration']);
				$in_var_9 = stripslashes($_REQUEST['price_tickets']);
				if (!$_REQUEST['canceled']) {$in_var_10=0;} else {$in_var_10=1;}
				if (!$_REQUEST['key_reason_cancel']) {$in_var_11='null';} else {$in_var_11=$_REQUEST['key_reason_cancel'];}
				$in_var_12 = $_REQUEST['key_answerables'] ? $_REQUEST['key_answerables'] : 0;
				$query = "begin p_cultural_event(p_key=>{$in_var_1},p_name=>'{$in_var_6}',P_KEY_CULTURAL_STATE=>{$in_var_7},P_KEY_ANSWERABLES=>{$in_var_12},P_DURATION=>'{$in_var_8}',P_PRICE_TICKETS=>'{$in_var_9}',P_CANCELED=>{$in_var_10},P_KEY_REASON_CANCEL=>{$in_var_11},p_description=>'{$in_var_2}',p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";
				//echo $query;			
				$result = OCIParse($db_conn, $query); 
				
            break;
		case 'setPlace':
				$in_var_1 = $_REQUEST['key'];
				//$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];;
				
				$in_var_6 = stripslashes($_REQUEST['name']);
				$in_var_7 = $_REQUEST['key_state']; 
 				
				$query = "begin p_s_places(p_key=>:b_key,p_name=>:b_name,p_key_state=>:b_key_state,p_user_update=>:b_user_update,p_session_update=>:b_session_update,type_modify=>:b_type_modify,rez=>:b_rez); commit; end;";
								
				$result = OCIParse($db_conn, $query); 
				OCIBindByName($result, ":b_key", $in_var_1);
				//OCIBindByName($result, ":b_description", $in_var_2);
				OCIBindByName($result, ":b_user_update", $in_var_3);
				OCIBindByName($result, ":b_session_update", $in_var_4);
				OCIBindByName($result, ":b_type_modify", $in_var_5);
				
				OCIBindByName($result, ":b_name", $in_var_6);
				OCIBindByName($result, ":b_key_state", $in_var_7);
            break;
		case 'setDate':
				$in_var_1 = $_REQUEST['key'];
				$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				$in_var_6 = $_REQUEST['key_event'];
				$in_var_7 = $_REQUEST['key_place']; 
 				$in_var_8 = $_REQUEST['date_event'];
				$in_var_9 = $_REQUEST['time_event']; 
				if (!$_REQUEST['canceled']) {$in_var_10=0;} else {$in_var_10=1;}
				if (!$_REQUEST['key_reason_cancel']) {$in_var_11='null';} else {$in_var_11=$_REQUEST['key_reason_cancel'];}
				$query = "begin p_date_event(p_key=>{$in_var_1},p_key_event=>{$in_var_6},p_key_place=>{$in_var_7},p_date_event=>'{$in_var_8}',p_time_event=>'01.01.0001 {$in_var_9}',p_description=>'{$in_var_2}',p_user_update=>{$in_var_3},p_session_update=>111,type_modify=>'{$in_var_5}',p_canceled=>{$in_var_10},p_key_reason_cancel=>{$in_var_11},rez=>:b_rez); commit; end;";
				//echo $query;
				$result = OCIParse($db_conn, $query); 				
            break;
		case 'setReason':
				$in_var_1 = $_REQUEST['key'];
				//$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				$in_var_6 = $_REQUEST['name'];				 				
				$query = "begin p_s_reason_cancel(p_key=>{$in_var_1},p_name=>'{$in_var_6}',p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";
				//echo $query;
				$result = OCIParse($db_conn, $query); 				
            break;	
		case 'setContacts':
				$in_var_1 = $_REQUEST['key'];
				$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				$in_var_6 = $_REQUEST['key_state'];
				$in_var_7 = stripslashes ($_REQUEST['owner_name']);
				$in_var_8 = stripslashes ($_REQUEST['phone']);
				$in_var_9 = stripslashes ($_REQUEST['email']);
				$in_var_10 = stripslashes ($_REQUEST['appointment']);
				$in_var_11 = stripslashes ($_REQUEST['address']);
				$query = "begin p_s_contacts(p_key=>{$in_var_1},p_key_state=>{$in_var_6},p_owner_name=>'{$in_var_7}',p_phone=>'{$in_var_8}',p_email=>'{$in_var_9}',p_appointment=>'{$in_var_10}',p_address=>'{$in_var_11}',p_description=>'{$in_var_2}',p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";
				$result = OCIParse($db_conn, $query);
			break;
		case 'setClassEvent':
				$in_var_1 = $_REQUEST['key'];
				//$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				$in_var_6 = $_REQUEST['key_class'];
				$in_var_7 = $_REQUEST['key_event'];
				
				$query = "begin p_s_events_in_class(p_key=>{$in_var_1},p_key_class=>{$in_var_6},p_key_event=>{$in_var_7},p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";
				
				$result = ociparse($db_conn, $query);
			break;
		case 'delClassEvent':
				$in_var_1 = $_REQUEST['key'];
				//$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				//$in_var_6 = $_REQUEST['key_class'];
				$in_var_7 = $_REQUEST['key_event'];
				$query = "begin p_s_events_in_class(p_key=>{$in_var_1},p_key_class=>-1,p_key_event=>{$in_var_7},p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";				
				
				$result = ociparse($db_conn, $query);
			break;
		case 'setClass':
				$in_var_1 = $_REQUEST['key'];
				$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				
				$in_var_6 = stripslashes ($_REQUEST['name']);
				$query = "begin p_s_class_cultural_event(p_key=>{$in_var_1},p_name=>'{$in_var_6}',p_description=>'{$in_var_2}',p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";				
				
				$result = ociparse($db_conn, $query);
			break;
		case 'setRole':
				$in_var_1 = $_REQUEST['key'];
				//$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				
				$in_var_6 = $_REQUEST['key_user'];
				$in_var_7 = $_REQUEST['key_role'];
				$query = "begin p_s_users_in_roles(p_key=>{$in_var_1},p_key_user=>{$in_var_6},p_key_role=>{$in_var_7},p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";				
				//echo $query;
				$result = ociparse($db_conn, $query);
			break;	
		case 'setUser':
				$in_var_1 = $_REQUEST['key'];
				//$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				
				$in_var_6 = $_REQUEST['login'];
				$in_var_7 = $_REQUEST['password'];
				$in_var_8 = $_REQUEST['user_name'];
				$in_var_9 = $_REQUEST['is_disable'] ? $_REQUEST['is_disable'] : 0;
				$in_var_10 = $_REQUEST['key_state'];
				
				$query = "begin p_s_users(p_key=>{$in_var_1},p_login=>'{$in_var_6}',p_password=>'{$in_var_7}',p_user_name=>'{$in_var_8}',p_is_disable=>{$in_var_9},p_key_state=>{$in_var_10},p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";				
				//echo $query;
				$result = ociparse($db_conn, $query);
			break;
		case 'setAns':
				$in_var_1 = $_REQUEST['key'];
				//$in_var_2 = stripslashes ($_REQUEST['description']);
				$in_var_3 = $_SESSION['user_key'];
				$in_var_4 = 111;
				$in_var_5 = $_REQUEST['type_modify'];
				
				
				$in_var_6 = $_REQUEST['name_answerable'];
				
				$query = "begin p_s_answerables(p_key=>{$in_var_1},p_name_answerable=>'{$in_var_6}',p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";				
				//echo $query;
				$result = ociparse($db_conn, $query);
			break;		
   }
   
		
	OCIBindByName($result, ":b_rez", $out_var, 32); // 32 is the return length 
	OCIExecute($result, OCI_DEFAULT); 
	
	
	
	if ($out_var == false) 
	 {
	$response->success = false;
	$response->msg = 'false';
	
	}
        else {
           
                   
                   $response->success = true;
				   $response->msg = 'true'; 
				   $response->key = $out_var;
				  
                
        }; 
	oci_free_statement($result);	
   
	
echo json_encode($response);
?>