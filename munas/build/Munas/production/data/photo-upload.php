<?php
require_once "secureCheck.php";
session_start();
error_reporting(0);
   class Response
{
    public $success = false;
    public $msg = '';
	
}
$response = new Response();




   if( isset ($_FILES['photo']) && $_POST['dbAct']=='setPhoto' ) {
	$imageinfo = getimagesize($_FILES['photo']['tmp_name']);
	if($imageinfo['mime'] != 'image/jpeg') { 
			$response->success = false;
			$response->msg = 'Извините, можно загружать только JPEG';
			echo json_encode($response);
			exit;
		};
	if(round($_FILES['photo']['size']/1024,2)> 1000){
		$response->success = false;
		$response->msg = 'Файл больше разрешенного размера!';
		echo json_encode($response);
		exit;
		};
	$blacklist = array(".php", ".phtml", ".php3", ".php4");
	foreach ($blacklist as $item) {
		if(preg_match("/$item\$/i", $_FILES['userfile']['name'])) {			
			$response->success = false;
			$response->msg = 'Неразрешено загружать файлы PHP!';
			echo json_encode($response);
			exit;
		}
	};	
	
      include('classSimpleImage.php');
      $image = new SimpleImage();
      $image->load($_FILES['photo']['tmp_name']);
	  /*if (!is_dir('../media/'))
		{		
		chdir ("../");
		mkdir ('media', 0644);
		};*/
	  $folder = '../media/';
	  $file_ext =  strtolower(strrchr($_FILES['photo']['name'],'.'));
      $file_name = uniqid(rand(10000,99999));
	  $file1 = '1';
	  $file2 = '2';
	  $file3 = '3';
	  
	  $image->resize(548, 308);      
	  $image->save($folder.$file_name.$file1.$file_ext);
	  $image->resize(264, 148);
	  $image->save($folder.$file_name.$file2.$file_ext);
	  $image->resize(130,73);
	  $image->save($folder.$file_name.$file3.$file_ext);
	  
	include "dbConnect.php";  
	
		$in_var_1 = $_POST['key'];				
		$in_var_3 = $_SESSION['user_key'];
		$in_var_4 = 111;
		$in_var_5 = $_POST['type_modify'];
		$in_var_6 = $_POST['key_event'];				
		$in_var_7 = $file_name.$file1.$file_ext;
		$in_var_8 = $file_name.$file2.$file_ext;
		$in_var_9 = $file_name.$file3.$file_ext;
				
		$query = "begin p_s_photo(p_key=>{$in_var_1},p_key_event=>{$in_var_6},p_url_big_foto=>'{$in_var_7}', p_url_medium_foto=>'{$in_var_8}', p_url_small_foto=>'{$in_var_9}',p_user_update=>{$in_var_3},p_session_update=>{$in_var_4},type_modify=>'{$in_var_5}',rez=>:b_rez); commit; end;";				
		
		$result = ociparse($db_conn, $query);   
   
 
OCIBindByName($result, ":b_rez", $out_var, 32); // 32 is the return length 
OCIExecute($result, OCI_DEFAULT); 
	
oci_free_statement($result);
	
	if ($out_var == false) 
	 {
	$response->success = false;
	$response->msg = 'false';
	echo json_encode($response);
	}
        else {           
                   
                   $response->success = true;
				   $response->msg = 'true'; 				  
                   echo json_encode($response);
        }; 

	
} else {
   $response->success = false;
   $response->msg = 'Ошибка загрузки!'; 
   echo json_encode($response);
   }   
	

?>