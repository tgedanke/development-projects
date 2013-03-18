<?php

include_once('Loader.php');
include_once('DBInsert.php');
/*если загрузка на сервере запрещена, разрешим*/
if (!ini_get('file_uploads')) 	{	ini_set('file_uploads', '1');
	}

$orderN = $_POST['orderNum'];
$usID = $_POST['userID'];
$act = $_POST['act'];	
	

if ($act == 'ins')
{
	/*obj загрузчик */
	$a = new Loader (GetCWD()."/tmpfolder/", array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"));
	/* загружаем */
	$a->maxUploadFileSize = 1024*1024*2;//размер загружаемого файла в байтах !!!!
	$res=$a->loads();
	$msg='';
	if( $res >0)
		{
		InsBD ($a,$orderN,$usID);
		}
		else 
		{
		switch ($res) {
      case -1:
          $msg = "файлы этого типа загружать зпрещено";
		  break;
      case -2:
          $msg =  "превышен размер файла " . $a->maxUploadFileSize ."<".$a->fsize;
		  break;
      default:
          $msg =  "ошибка загрузки";
	}
		
		echo "{'success': false, 'res':'".$msg."'}";
		}
	/*
	$a = new Loader ('https://webdav.yandex.ru', array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"));
	if ( $a->LoadYandex())
		{
		echo '{"success": true, "file": "'. $a->fname .'" }';
		}
		else 
		{
		echo '{"success": false}';
		}
	*/
}
else
{
	if ($act == 'del')
	{
	$dbins = new DBInsert ('', '', '', '', '', $orderN, $usID, '.', 'dvs', '','alert_f');
	$res = false;
	if (( strlen($dbins->orderNum) > 0)&&( strlen($dbins->userID) > 0))
		{
		$res = $dbins->delDB();
		}
	if ($res)
		{
		if (sizeof($res[0])>1)
			{
			$a = new Loader (GetCWD()."/tmpfolder/", array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"));
			$a->fnewname = $res[0]['RealDelName'];
			$del = $a->delFile();
			if ($del)
				{
				echo "{'success': true, 'file': '". $res[0]['AutorDelName'] ."'}";
				}
			else
				{
				echo "{'success': false, 'res':''}";
				}
			}
		else {
			echo "{'success': false, 'res':''}";
			}
		}
	else 
		{
		echo "{'success': false, 'res':''}";
		}
	}
	
	else
	{
		if ($act == 'onl')
		{
		$dbins = new DBInsert ('', '', '', '', '', $orderN, $usID, '.', 'dvs', '','alert_f');
		$res = false;
		if (( strlen($dbins->orderNum) > 0)&&( strlen($dbins->userID) > 0))
			{
			$res = $dbins->prints();
			}
		if (sizeof($res[0])>1)
			{
			$btn =  ($dbins->userID!=$usID)?"n":"y";
			echo "{'success': true, 'file': '". $dbins->fname.'('.$dbins->fsize.')' ."' ,'dataurl': '". $dbins->fnewname."', 'delbtn':".$btn."}";
			}
		else {
			echo "{'success': false, 'res':''}";
			}
		
		
		}
	}
}		

		
		
		
	/*obj запись в БД и выборка из БД */
function InsBD ($b,$orderNum,$userID)
{
	$dbins = new DBInsert ($b->fname, $b->ftype, $b->fsize, $b->fnewname, $b->folder, $orderNum, $userID, '.', 'dvs', '','alert_f');
	$res = false;
	/*занесем в базу, что загрузили*/
	if ( strlen($dbins->fname) > 0) 
		{ 
		$res = $dbins->insertDB();
		}
	if ($res)
		{ 
		$resarray = $dbins->prints();
		if (sizeof($resarray[0])>1)
			{
			//echo "{'success': true, 'file': '". $resarray[0]['AutorFileName'].'('.$resarray[0]['FSize'].')' ."' ,'dataurl': '". $resarray[0]['RealFileName'] ."'}";
			echo "{'success': true, 'file': '". $dbins->fname.'('.$dbins->fsize.')' ."' ,'dataurl': '". $dbins->fnewname."'}";
			}
		else {
			echo "{'success': false}";
			}
		}
	else 
		{
		echo "{'success': false}";
		}
}	


 
  ?>