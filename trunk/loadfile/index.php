<html>
<head>
<!-- страницу отображать в кодировке utf8 -->
<meta http-equiv="content-type" content="text/html; charset=utf-8" />

</head>
<body>
<form  enctype="multipart/form-data" action=""  method="post">
 <input  type="file" name="uploadFile"/>
 <input  type="submit" name="upload" value="Загрузить"/>
 </form>
<?php

include_once('Loader.php');
include_once('DBInsert.php');

/*obj загрузчик */
$a = new Loader (GetCWD()."/tmpfolder/", array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"));
/* загружаем */
echo $a->loads();
/*obj запись в БД и выборка из БД */
$dbins = new DBInsert ($a->fname, $a->ftype, $a->fsize, $a->fnewname, '/tmpfolder/', 'localhost', 'root', '','test');

/*занесем в базу, что загрузили*/
if ( strlen($dbins->fname) > 0) 
	{ 
	$dbins->insertDB();
	}
	
/* инфо о загрузке*/

	
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
	
/* доступные файлы */	
 echo printData ($dbins->prints());
 
 echo '<hr>';
 /*или так */
 echo printData ($dbins->prints($a->fnewname));
  ?>

</body>

</html>
