<?php
class Loader 
{
	protected $folder; 
	public $whitelist;
	public $fname;
	public $ftype;
	public $fsize;
	public $fstatus;
	public $fnewname;
	
	
	function __construct($folder, $whitelist)
	{
		$this->folder = $folder;
		$this->whitelist = $whitelist;
	}
	function loads()
	{//если выбран файл
		if(isset($_POST['upload']))
		{
			$error = true;
			//проверка типа
			if(in_array(strtolower(substr($_FILES['uploadFile']['name'], 1+strrpos($_FILES['uploadFile']['name'],"."))),$this->whitelist) ) $error = false;
			if($error) die("Ошибка,  Вы не можете загружать файл этого типа"); 
			
			$uploadedFile = $this->folder.basename($_FILES['uploadFile']['name']);
			if(!empty($_FILES['uploadFile']['tmp_name']))
			{ 
				//переименуем для хранения
				$file_ext =  strtolower(strrchr($_FILES['uploadFile']['name'],'.'));
				$file_name = uniqid(rand(10000,99999));
				$uploadedFile  = $this->folder.$file_name.$file_ext;
				
				if(move_uploaded_file($_FILES['uploadFile']['tmp_name'],   $uploadedFile))
				{  
					$this->fname = $_FILES['uploadFile']['name'];
					$this->ftype = $_FILES['uploadFile']['type'];
					$this->fsize = round($_FILES['uploadFile']['size']/1024,2).' кб.';
					$this->fnewname	= $file_name.$file_ext;				
					return 'Файл загружен';
								
				}
				else   
				{
					return 'Во  время загрузки файла произошла ошибка';  
				}
			}
			else
			{  
				return 'Файл не  загружен';  
			}
			
		}
	}
	

}
	
class DBInsert
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

	function __construct($fname, $ftype, $fsize, $fnewname, $place, $hostname, $username, $password, $udatabase)
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

	function connDB()
	{
		 $db = mysql_connect($this->hostname, $this->username, $this->password)       
		 or die('connect to database failed');
		 
		 mysql_set_charset('cp1251'); // Устанавливаем нужную кодировку для отрисовки

		// Выбираем нужную БД
		mysql_select_db($this->udatabase)
				or die('db not found');
				
		//кодировки для записи в 1251 в бд
		mysql_query("SET NAMES cp1251");  
		mysql_query("SET CHARACTER SET 'cp1251'");
		mysql_query ("set character_set_client='cp1251'"); 
		mysql_query ("set character_set_results='cp1251'"); 
		mysql_query ("set collation_connection='cp1251_general_ci'");

	return $db;				
	}
	
	function insertDB()
	{
		$sql='';
		$db = $this->connDB();
		
		$query = ' CREATE TABLE IF NOT EXISTS `uploadfile` ( '. 
		 'uploadTime	DATETIME , '.
		'autor	VARCHAR(255), '.
		'autorFileName	VARCHAR(255), '.
		'realFileName	VARCHAR(255) NOT NULL, '.
		'type	VARCHAR(255) , '.
		'size	VARCHAR(255), '.
		'place	VARCHAR(255) NOT NULL ) DEFAULT CHARSET cp1251';
		mysql_query($query);
		 //вставляем
		$query = " INSERT INTO `uploadfile` VALUES (NOW(),'localload','".
			$this->fname ."','".$this->fnewname ."','" .$this->ftype ."','".$this->fsize ."','" . $this->place . "')"; //".$this->folder ."
		$result = mysql_query($query)
				or trigger_error(mysql_errno() . ' ' . mysql_error() . ' query1: ' . $sql);
		mysql_close($db); 
	
	}

		
	function prints( $fnname = '')
	{
		$fnname = ($fnname != '')?  'WHERE realFileName like \'' . $fnname .'\'' :'' ;
		$sql='';
		$db = $this->connDB();
		//достаем
		$inputtxt ='';

		$query = 'SELECT * FROM `uploadfile`' . $fnname;
		$result = mysql_query($query)
				or trigger_error(mysql_errno() . ' ' .	mysql_error() . ' query1: ' . $sql);

				$inputvals = array();
		// проверяем вернулась ли хотя бы 1 строка
		if (mysql_num_rows($result) > 0)
		{
			$i = 0;
			// вытаскиваем одну за другой строки, помещаем в $row
			while ($row = mysql_fetch_object($result)) 			// mysql_fetch_assoc($result)  -  строка в виде ассоциативного массива, mysql_fetch_num - порядковые номера колонок , mysql_fetch_array($result) и то и то
				{
				$inputvals[$i] = array('uploadTime' => $row->uploadTime,
											'autor' => $row->autor,
									 'realFileName' => $row->realFileName ,
									'autorFileName' => $row->autorFileName,
											 'size' => $row->size );
				$i++;
				}

		} 
		else 
		{
			$inputvals[0]= array ( 'err' => 'Таблица `uploadfile` пуста');

		}
	mysql_close($db);
	return $inputvals;
	}


}
	
	if (!ini_get('file_uploads')) 
	{	
	ini_set('file_uploads', '1');
	}
?>
