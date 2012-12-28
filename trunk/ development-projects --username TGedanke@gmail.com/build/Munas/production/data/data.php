<?php
//завязка
session_start();
header("Content-type: text/plain; charset=utf-8");
error_reporting(0);
class Response
{
    public $success = false;
    public $msg = '';
}
$response = new Response();

//кульминация

if (!isset($_REQUEST['dbAct'])) {
    $response->msg = 'совсем не правильный запрос';
} else {
    $dbAct = $_REQUEST['dbAct'];
    //в case нужно сформировать строку sql запроса $query
    //если нужен paging установить $paging = true
    //можно задать сообщение, которое вернуть при успехе $response->msg = 'успех'

    $response->msg = 'ok';
	
    switch ($dbAct) {
        
		case 'getContacts':
               $query = "select * from table ( F_SELECT_S_CONTACTS() )";
            break;		
		case 'getUsers':
                $query = "select * from table ( F_SELECT_S_USERS() )";
            break;	
		case 'getRoles':
				$key_user=$_REQUEST[key_user] ? $_REQUEST[key_user] : 0;
                $query = "select * from table(F_SELECT_S_ROLES({$key_user}))";
			break;
		case 'setUsers':
				//$disable=$_POST[is_disable] ? $_POST[is_disable] : 0;
				//$query = "exec SP_S_USERS @USER_NAME='{$_POST[user_name]}', @LOGIN='{$_POST[login]}', @PASSWORD='{$_POST[password]}', @IS_DISABLE={$disable}";
			break;	
        case 'getState':
                $query = "select * from table(F_SELECT_S_CULTURAL_STATE())";
            break;
		case 'getClass':
				$query = "select * from table(F_SELECT_S_CLASS_EVENT())";
			break;
		case 'getEvent':
				$key =$_SESSION['user_key'];
				$d = explode('.', date('d.m.Y'));				
				$date_start=$_REQUEST[date_start] ? $_REQUEST[date_start] : strftime('%d.%m.%Y', mktime(0,0,0, $d[1], '01', $d[2]) );
				$l = explode('.', $date_start);
				if ($l[1]=='00'){
				$query = "select * from table(F_SELECT_CULTURAL_EVENT('all', {$key}))";
				} else {
				$query = "select * from table(F_SELECT_CULTURAL_EVENT('{$date_start}', {$key}))";
				}
				//echo $query;
			break;
		case 'getPlace':
				$key_state = $_REQUEST['key_state'] ? $_REQUEST['key_state'] : -1;
				$query = "select * from table(F_SELECT_S_PLACES({$key_state}))";
			break;
		case 'getDate':
				$key_event=$_REQUEST[key_event] ? $_REQUEST[key_event] : 0;
                $query = "select * from table(F_SELECT_DATE_EVENT({$key_event}))";
			break;
		case 'getReason':				
                $query = "select * from table(F_SELECT_S_REASON_CANCEL())";
			break;		
		case 'getClassEvent':
			$key_event=$_REQUEST[key_event];
			$query = "select * from table(F_SELECT_S_EVENT_IN_CLASS({$key_event}))";            
			break;
		case 'getStreet':			  
			$query = "select * from table(F_SELECT_S_STREET())";
			break;
		case 'getHouse':
			$key=$_REQUEST[key] ? $_REQUEST[key] : 0;
			$query = "select * from table(F_SELECT_S_HOUSE({$key}))";
			break;
		case 'getStreetHouse':			
			$key_house = $_REQUEST[key_house];
			$key_street = $_REQUEST[key_street];
			$query = "select * from table(F_SELECT_S_STREET_HOUSE({$key_house}, {$key_street}))";
			break;
		case 'getAns':
			$query = "select * from table(F_SELECT_S_ANSWERABLES())";
			break;	
		case 'getHist':
			$key_event=$_REQUEST[key_event] ? $_REQUEST[key_event] : 0;
            $query = "select * from table(F_SELECT_H_DATE_EVENT({$key_event}))";
			break;
		/*case 'GetWbsTotal':
			$ag = $_REQUEST['newAgent'] ? $_REQUEST['newAgent'] : $_SESSION['xAgentID'];
			if (!empty($_SESSION['AdmAgentID'])) {$ag =$_SESSION['AdmAgentID'];}
			$query = "exec wwwGetWbsTotal @dir='{$_POST[dir]}', @period='{$_POST[period]}',  @agentID={$ag} ";
			break;
		case 'GetAgents':
			$query = "exec wwwGetAgents";
			break;	*/
    }

    if (!isset($query)) {
        $response->msg = 'не правильный запрос';
    } else {
        //$query = iconv("UTF-8", "windows-1251", $query);
        $query = stripslashes($query);

        try {
            include "dbConnect.php";
			/*$db_user = "munas_dba";
			$db_pwd = "munas_dba";
			$db_sid = "munas";			
			$db_conn = oci_connect("$db_user", "$db_pwd", "$db_sid");*/
			//$curs = OCINewCursor($db_conn);
            $result = oci_parse($db_conn, $query);
			oci_execute($result); 
						
				/*$row = oci_fetch_assoc($result);
				var_dump($row);
				$r = oci_error();
				var_dump($r);*/
			//$result = mssql_query($query);
            if ($result) {

				for($i = 0; $i < /*mssql_num_fields($result)*/oci_num_fields($result); $i++){
					$response->fields[oci_field_name($result, $i)] = oci_field_type($result, $i);
				}
			
			
                while ($row = oci_fetch_array($result, OCI_ASSOC/*MSSQL_ASSOC*/)) {
                    foreach ($row as $f => &$value) {
					
						if((($response->fields[$f] == 'char')||($response->fields[$f] == 'text'))&&($value)){
							$value = /*iconv("windows-1251", "UTF-8",*/ $value/*)*/;
							
						}
                    }

                    $response->data[] = array_change_key_case($row);
                }

                //$response->dvs = 'превед';
                unset($response->fields);

				//paging
				if($paging){

                    //filtering
                    if(isset($_REQUEST['filter'])){
                      $filterParams = json_decode(stripslashes($_REQUEST['filter']), true);
                      $filterKey = strtolower($filterParams[0]['property']);
                      $filterValue = strtolower($filterParams[0]['value']);

                      $response->filterKey = $filterKey;
                      $response->filterValue = $filterValue;

                      include 'filterer.php';
                      $filterer = new Filterer();
                      $response->data = $filterer->filter($response->data, $filterKey, $filterValue);

                    }

                    //sorting
                    if(isset($_REQUEST['sort'])){
                      $sortParams = json_decode(stripslashes($_REQUEST['sort']), true);
                      $sortKey = strtolower($sortParams[0]['property']);
                      $sortDir = strtolower($sortParams[0]['direction']);

                      include 'multiSort.php';
                      $multisort = new multisort();
                      $response->data = $multisort->run($response->data, $sortKey, $sortDir);
                    }

                    //paging
		  			$page = $_REQUEST['page'];
        			$start = $_REQUEST['start'];
        			$limit = $_REQUEST['limit'];
					$response->total = count($response->data);
					$response->data = array_slice($response->data, $start, $limit);
				}
				oci_free_statement($result);
                //mssql_free_result($result);
                $response->success = true;
                
            } else {
                $response->msg = 'sql error: ' /*. iconv("windows-1251", "UTF-8", mssql_get_last_message())*/;
            }
        }
        catch (exception $e) {
            $response->msg = $e->getMessage();
        }
    }
}

//финал
function my_json_encode($arr)
{
    //convmap since 0x80 char codes so it takes all multibyte codes (above ASCII 127). So such characters are being "hidden" from normal json_encoding
    array_walk_recursive($arr, create_function('&$item, $key',
        'if (is_string($item)) $item = mb_encode_numericentity($item, array (0x80, 0xffff, 0, 0xffff), "UTF-8"); '));
    return mb_decode_numericentity(json_encode($arr), array(
        0x80,
        0xffff,
        0,
        0xffff), 'UTF-8');

}

if (extension_loaded('mbstring')) {
    echo my_json_encode($response);
} else {
    echo json_encode($response);
}
?>