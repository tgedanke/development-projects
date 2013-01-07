<html>
<head>

</head>
<body>
<form  enctype="multipart/form-data" action=""  method="post">
 <input  type="file" name="uploadFile"/>
 <input  type="submit" name="upload" value="Загрузить"/>
 </form>
<?php

include_once('uploadfile.php');

/*obj*/
//$a = new Loader (GetCWD()."/tmpfolder/", array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"),0);
//
$a = new Loader ("", array("gif", "jpeg", "jpg", "png","xls","xlsx","zip"),1);

$a->loads();


$dbins = new DBIsert ($a->fname, $a->ftype, $a->fsize, $a->fnewname, $a->flplace, 'localhost', 'root', '','test');
if ( strlen($dbins->fname) > 0) 
	{ $dbins->insertDB();
	}
	
/*view prop*/
	echo '<br>' .$a->fstatus;
	
	echo '<hr>';
	
/*view func*/	
  $dbins->prints();
  
  
  
  
/*	$fldr = '/tmp';
	$flsz = '20M';
	ini_set('upload_tmp_dir', $fldr);
	ini_set('upload_max_filesize', $flsz);
	ini_set('post_max_size', $flsz);*/
//			echo ini_get('upload_max_filesize');
//			echo ini_get('post_max_size');
	/* print_r($_FILES); */

 
  ?>

</body>

</html>
