<html>
<head>
</head>
<body>
<?php
   
$file = ("tmpfolder/".$_GET['fn']."");
header ("Content-Type: application/octet-stream");
header ("Accept-Ranges: bytes");
header ("Content-Length: ".filesize($file)); 
header ("Content-Disposition: attachment; filename=".$file);  
readfile($file);
//---а
?>

</body>

</html>
