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
	
	
	function Loader($folder, $whitelist)
	{
		$this->folder = $folder;
		$this->whitelist = $whitelist;
	}
	function loads()
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
					$this->fstatus = 'Файл загружен';
								
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
