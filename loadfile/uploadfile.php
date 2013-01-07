<?php
class Loader 
{
	public $folder; 
	protected $whitelist;
	public $fname;
	public $ftype;
	public $fsize;
	public $fstatus;
	public $fnewname;
	public $fplace;
	public $flplace;
	
	function Loader($folder, $whitelist,$fplace)
	{
		$this->folder = $folder;
		$this->whitelist = $whitelist;
		$this->fplace = $fplace;
	}
	function loads()
	{
	if($this->fplace == 0) {$this->loadlocal();}
	if($this->fplace == 1) {$this->loadyandex();}
	}
	
	function loadlocal()
	{
		if(isset($_POST['upload']))
		{
			$error = true;
			if(in_array(strtolower(substr($_FILES['uploadFile']['name'], 1+strrpos($_FILES['uploadFile']['name'],"."))),$this->whitelist) ) $error = false;

			if($error) die("Ошибка,  Вы не можете загружать файл этого типа"); 
			$uploadedFile = $this->folder.basename($_FILES['uploadFile']['name']);
			
			if(!empty($_FILES['uploadFile']['tmp_name']))
			{ 
			//ini_set('memory_limit', '32M');
				$file_ext =  strtolower(strrchr($_FILES['uploadFile']['name'],'.'));
				$file_name = uniqid(rand(10000,99999));
				$uploadedFile  = $this->folder.$file_name.$file_ext;
				if(move_uploaded_file($_FILES['uploadFile']['tmp_name'],   $uploadedFile))
				{  
					$this->fname = $_FILES['uploadFile']['name'];
					$this->ftype = $_FILES['uploadFile']['type'];
					$this->fsize = round($_FILES['uploadFile']['size']/1024,2).' кб.';
					$this->fnewname	= $file_name.$file_ext;				
					$this->fstatus = 'Файл загружен localhost';
					$this->flplace = '/tmpfolder/';			
				}
				else   
				{
					$this->fstatus = 'Во  время загрузки файла произошла ошибка';  
				}
			}
			else
			{  
				$this->fstatus = 'Файл не  загружен';  
			}
			
		}
	}
function loadyandex()
{
	
	if(isset($_POST['upload']))
	{
		$error = true;
		if(in_array(strtolower(substr($_FILES['uploadFile']['name'], 1+strrpos($_FILES['uploadFile']['name'],"."))),$this->whitelist) ) $error = false;

		if($error) die("Ошибка,  Вы не можете загружать файл этого типа"); 
		$uploadedFile = $this->folder.basename($_FILES['uploadFile']['name']);
			
		if(!empty($_FILES['uploadFile']['tmp_name']))
		{ 
			//ini_set('memory_limit', '32M');
				$file_ext =  strtolower(strrchr($_FILES['uploadFile']['name'],'.'));
				$file_name = uniqid(rand(10000,99999));
				$uploadedFile  = $this->folder.$file_name.$file_ext;
			
				$login = 'mirrorYNDX@yandex.ru';
				$password = 'Dthjybrfnik';
				$filename = $uploadedFile;
				
					$cookie_file = 'cookie.txt';
				$user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.9.0.6) Gecko/2009011913 Firefox/3.0.6';
			 
				// логинимся в систему
				$ch = curl_init('https://passport.yandex.ru/passport?mode=auth');
			 
				$fields = array();
				$fields[] = "login=$login";
				$fields[] = "passwd=$password";
				$fields[] = "twoweeks=yes";
				curl_setopt($ch, CURLOPT_POSTFIELDS, implode('&', $fields));
				curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt($ch, CURLOPT_USERAGENT, $user_agent);
				curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
				curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER,  0);
				curl_setopt($ch, CURLOPT_POST, 1);
				$result = curl_exec($ch);
				$info = curl_getinfo($ch);
			 
				if ($info['http_code'] != 200) return false;
			 
				// запрашиваем сервер для загрузки файла
				$url = 'http://narod.yandex.ru/disk/getstorage/?rnd=' . (mt_rand( 0, 777777) + 777777);
			 
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_POST,  0);
				curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file);
				$result = curl_exec($ch);
				$info = curl_getinfo($ch);
			 
				if (preg_match('/"url":"(.*?)", "hash":"(.*?)", "purl":"(.*?)"/', $result, $m)) {
				  $upload_url = $m[1];
				  $hash = $m[2];
				  $purl = $m[3];
				} else {
					return false;
				}
				
				   // загружаем файл на сервер
				$url = $upload_url . '?tid=' . $hash;
				$fields = array();
				$fields['file'] = '@' . $filename;
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_REFERER, 'http://narod.yandex.ru/');
				curl_setopt($ch, CURLOPT_POST, 1);
				curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
				$result = curl_exec($ch);
				$info = curl_getinfo($ch);
			 
				if ($info['http_code'] != 200) return false;
			 
 //   print_r($info);
				// проверяем прогресс бар
				$url = $purl . '?tid=' . $hash . '&rnd=' . (mt_rand( 0, 777777) + 777777);
			 
				curl_setopt($ch, CURLOPT_URL, $url);
				curl_setopt($ch, CURLOPT_POST,  0);
				$result = curl_exec($ch);
			 
				if (!preg_match('/"status": "done"/', $result, $m)) {
				  return false;
				}
 
				// переходим на страницу и определяем ссылку
				$url = 'http://narod.yandex.ru/disk/last/';
				curl_setopt($ch, CURLOPT_URL, $url);
				$result = curl_exec($ch);
				curl_close($ch);
			 
				if (preg_match('/<span class=\'b\-fname\'><a href="(.*?)">/', $result, $m)) {
				  $fileURL = trim($m[1]);
				  return $fileURL;
				  	$this->fname = $_FILES['uploadFile']['name'];
					$this->ftype = $_FILES['uploadFile']['type'];
					$this->fsize = round($_FILES['uploadFile']['size']/1024,2).' кб.';
					$this->fnewname	= $file_name.$file_ext;				
					$this->fstatus = 'Файл загружен yandex';
					$this->flplace = $fileURL;
				}
			 
				return false;

		}		
	}
}
}
	
class DBIsert
{
	public $fname;
	public $ftype;
	public $fsize;
	public $fnewname;
	public $place;
	protected $hostname;
	protected $username;
	protected $password;
	protected $udatabase;

	function DBIsert($fname, $ftype, $fsize, $fnewname, $place, $hostname, $username, $password, $udatabase)
	{
		$this->fname = $fname;
		$this->ftype = $ftype;
		$this->fsize = $fsize;
		$this->fnewname = $fnewname;
		$this->place = $place;
		$this->hostname = $hostname;
		$this->username = $username;
		$this->password = $password;
		$this->udatabase = $udatabase;
	}

	function insertDB()
	{
		$sql='';
		 $db = mysql_connect($this->hostname, $this->username, $this->password)       
		 or die('connect to database failed');
		// Выбираем нужную БД
		mysql_select_db($this->udatabase)
				or die('db not found');
		 
		$query = ' CREATE TABLE IF NOT EXISTS `uploadfile` ( '. 
		 'uploadTime	DATETIME , '.
		'autor	VARCHAR(255), '.
		'autorFileName	VARCHAR(255), '.
		'realFileName	VARCHAR(255) NOT NULL, '.
		'type	VARCHAR(255) , '.
		'size	VARCHAR(255), '.
		'place	VARCHAR(255) NOT NULL ) DEFAULT CHARSET cp1251';
		mysql_query($query);
		//кодировки для записи в 1251 в бд
		mysql_query("SET NAMES cp1251");  
		mysql_query("SET CHARACTER SET 'cp1251'");
		mysql_query ("set character_set_client='cp1251'"); 
		mysql_query ("set character_set_results='cp1251'"); 
		mysql_query ("set collation_connection='cp1251_general_ci'");
		 
		$query = " INSERT INTO `uploadfile` VALUES (NOW(),'webload','".
			$this->fname ."','".$this->fnewname ."','" .$this->ftype ."','".$this->fsize ."','" . $this->place . "')"; //".$this->folder ."
		$result = mysql_query($query)
				or trigger_error(mysql_errno() . ' ' . mysql_error() . ' query1: ' . $sql);
		mysql_close($db); 
	
	}

		
	function prints()
	{
		$sql='';
		 $db = mysql_connect($this->hostname, $this->username, $this->password)       
		 or die('connect to database failed');

		 mysql_set_charset('cp1251'); // Устанавливаем нужную кодировку для отрисовки
		 
		// Выбираем нужную БД
		mysql_select_db($this->udatabase)
				or die('db not found');

						$query = 'SELECT * FROM `uploadfile`';
		$result = mysql_query($query)
				or trigger_error(mysql_errno() . ' ' . 
					mysql_error() . ' query1: ' . $sql);

		 
		// проверяем вернулась ли хотя бы 1 строка
		if (mysql_num_rows($result) > 0) {
		echo '<table>';
			// вытаскиваем одну за другой строки, помещаем в $row
			while ($row = mysql_fetch_object($result)) 			// mysql_fetch_assoc($result)  -  строка в виде ассоциативного массива, mysql_fetch_num - порядковые номера колонок , mysql_fetch_array($result) и то и то
				{
				echo '<tr><td>' . $row->uploadTime  . '</td>', 
				'<td>' . $row->autor . '</td>',
				'<td>' .'<a href="downloadfile.php?fn='.$row->realFileName.'"   target="_blank">' .$row->autorFileName. '</a>' . '</td>',
				'<td>' .$row->size . '</td>',
				'</tr>';
				}
			echo '</table>';	
			} else {
			echo 'Таблица `uploadfile` пуста';
		}
		mysql_close($db); 
	}


}
	
	if (!ini_get('file_uploads')) 
	{	
	ini_set('file_uploads', '1');
	}
?>
