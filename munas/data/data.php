<?php
require_once "secureCheck.php";
session_start();
header("Content-type: text/plain; charset=utf-8");
error_reporting(0);
class Response
{
    public $success = false;
    public $msg = '';
}
$response = new Response();

if (!isset($_POST['dbAct'])) {
    $response->msg = 'совсем не правильный запрос';
} else {
    $dbAct = $_POST['dbAct'];
    $response->msg = 'ok';
	
    switch ($dbAct) {
	
        case 'getAgeLimit':
			$query = "select * from table(F_SELECT_S_AGE_LIMIT())";		
			
			break;
		case 'getContacts':
               $query = "select * from table ( F_SELECT_S_CONTACTS() )";
            break;		
		case 'getUsers':
                $query = "select * from table ( F_SELECT_S_USERS() )";
            break;	
		case 'getRoles':
				$key_user=$_POST[key_user] ? $_POST[key_user] : 0;
                $query = "select * from table(F_SELECT_S_ROLES({$key_user}))";
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
				$date_start=$_POST[date_start] ? $_POST[date_start] : strftime('%d.%m.%Y', mktime(0,0,0, $d[1], '01', $d[2]) );
				$l = explode('.', $date_start);
				if ($l[1]=='00'){
				$query = "select * from table(F_SELECT_CULTURAL_EVENT('all', {$key}))";
				} else {
				$query = "select * from table(F_SELECT_CULTURAL_EVENT('{$date_start}', {$key}))";
				};
				if(isset($_POST['filter'])){
				$query = "select * from table(F_SELECT_FILTER_EVENT('all', {$key}))";
				$paging = true;
				};				
			break;
		case 'getPlace':
				$key_state = $_POST['key_state'] ? $_POST['key_state'] : -1;
				$query = "select * from table(F_SELECT_S_PLACES({$key_state}))";
			break;
		case 'getDate':
				$key_event=$_POST[key_event] ? $_POST[key_event] : 0;
                $query = "select * from table(F_SELECT_DATE_EVENT({$key_event}))";
			break;
		case 'getReason':				
                $query = "select * from table(F_SELECT_S_REASON_CANCEL())";
			break;		
		case 'getClassEvent':
			$key_event=$_POST[key_event];
			$query = "select * from table(F_SELECT_S_EVENT_IN_CLASS({$key_event}))";            
			break;
		case 'getStreet':			  
			$query = "select * from table(F_SELECT_S_STREET())";
			break;
		case 'getHouse':
			$key=$_POST[key] ? $_POST[key] : 0;
			$query = "select * from table(F_SELECT_S_HOUSE({$key}))";
			break;
		case 'getStreetHouse':			
			$key_house = $_POST[key_house];
			$key_street = $_POST[key_street];
			$query = "select * from table(F_SELECT_S_STREET_HOUSE({$key_house}, {$key_street}))";
			break;
		case 'getAns':
			$query = "select * from table(F_SELECT_S_ANSWERABLES())";
			break;	
		case 'getHist':
			$key_event=$_POST[key_event] ? $_POST[key_event] : 0;
            $query = "select * from table(F_SELECT_H_DATE_EVENT({$key_event}))";
			break;
		case 'getPhoto':
			$key_event = $_POST['key_event'];			
			$query = "select * from table(F_SELECT_FOTO_FOR_EVENT({$key_event}))";			
			break;		
    }

    if (!isset($query)) {
        $response->msg = 'не правильный запрос';
    } else {
        $query = stripslashes($query);

        try {
            include "dbConnect.php";			
            $result = oci_parse($db_conn, $query);
			oci_execute($result); 
			
            if ($result) {

				for($i = 0; $i < oci_num_fields($result); $i++){
					$response->fields[oci_field_name($result, $i)] = oci_field_type($result, $i);
				}
			
			
                while ($row = oci_fetch_array($result, OCI_ASSOC)) {
                    foreach ($row as $f => &$value) {
					
						if((($response->fields[$f] == 'char')||($response->fields[$f] == 'text'))&&($value)){
							$value = $value;
							
						}
                    }

                    $response->data[] = array_change_key_case($row);
                }
                
                unset($response->fields);

				//paging
				if($paging){

                    //filtering
                    if(isset($_POST['filter'])){
                      $filterParams = json_decode(stripslashes($_POST['filter']), true);
                      $filterKey = strtolower($filterParams[0]['property']);
                      $filterValue = strtolower($filterParams[0]['value']);

                      $response->filterKey = $filterKey;
                      $response->filterValue = $filterValue;

                      include 'filterer.php';
                      $filterer = new Filterer();
                      $response->data = $filterer->filter($response->data, $filterKey, $filterValue);

                    }

                    //sorting
                    if(isset($_POST['sort'])){
                      $sortParams = json_decode(stripslashes($_POST['sort']), true);
                      $sortKey = strtolower($sortParams[0]['property']);
                      $sortDir = strtolower($sortParams[0]['direction']);

                      include 'multiSort.php';
                      $multisort = new multisort();
                      $response->data = $multisort->run($response->data, $sortKey, $sortDir);
                    }

                    //paging
		  			$page = $_POST['page'];
        			$start = $_POST['start'];
        			$limit = $_POST['limit'];
					$response->total = count($response->data);
					$response->data = array_slice($response->data, $start, $limit);
				}
				oci_free_statement($result);
                
                $response->success = true;
                
            } else {
                $response->msg = 'sql error: ' ;
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