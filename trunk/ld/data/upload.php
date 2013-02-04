<?php

include_once('Loader.php');
include_once('DBInsert.php');

	/*если загрузка на сервере запрещена, разрешим*/
			if (!ini_get('file_uploads')) 
			{	
				ini_set('file_uploads', '1');
			}
	
/*obj загрузчик */
$a = new Loader (GetCWD()."/tmpfolder/", array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"));

/* загружаем */
if( $a->loads())
	{
	InsBD ($a);
	}
	else 
	{
    echo '{"success": false}';
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

/*obj запись в БД и выборка из БД */
function InsBD ($b)
{
$orderNum = '7777';
$dbins = new DBInsert ($b->fname, $b->ftype, $b->fsize, $b->fnewname, $b->folder,$orderNum, '.', 'dvs', '','alert_f');

$res = false;

/*занесем в базу, что загрузили*/
if ( strlen($dbins->fname) > 0) 
	{ 
	$res = $dbins->insertDB();
	}
if ($res)
	{ /* доступные файлы */
	$dataurl = printData ($dbins->prints());

	echo '{"success": true, "file": "'. $dbins->fname .'" ,"dataurl": "'. $dataurl .'"}';
	}
else 
	{
    echo '{"success": false}';
	}
	
}	

	
/* 
вывод данных 
для универсальности разбираем массив тут.*/ 	
	function printData ( $resarray)
		{
		if (sizeof($resarray[0])>1)
			{
			$inputtxt = '<table>';
			foreach ($resarray as &$row) 
				{
					$inputtxt = $inputtxt . '<tr><td>' . $row['uploadTime']  . '</td>' .
					'<td>' . $row['autor'] . '</td>'.
					'<td>' .'<a href="downloadfile.php?fn='.$row['realFileName'].'"   target="_blank">' .$row['autorFileName']. '</a>' . '</td>'.
					'<td>' .$row['size'] . '</td>'.
					'</tr>';
				}
			unset($row);
			return $inputtxt . '</table>';
			}
		else
			{
			return $resarray[0]['err'];
			}
		}
	
 
 
  ?>