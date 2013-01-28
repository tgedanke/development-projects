<?php
/*
вносит информацию о загруженом файле в базу данных и выбирает ее для просмотра
 $fname настаящее имя файла
 $ftype тип файла
 $fsize размер файла
 $fnewname имя, под которым файл хранится на сервере
 $place место хранения файла
 информация для подключения к БД
 $hostname имя хоста
 $username имя пользователя
 $password пароль
 $udatabase имя базы данных

*/	
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
/*подключение к БД*/
	function connDB()
	{
		 $db = mysql_connect($this->hostname, $this->username, $this->password)       
		 or die('connect to database failed');
		/* Устанавливаем нужную кодировку для отрисовки */
		/* mysql_set_charset('utf-8');*/
		/* Выбираем нужную БД */
		mysql_select_db($this->udatabase)
				or die('db not found');
		/*кодировки для записи в utf-8 в бд	*/	
		mysql_query("SET NAMES utf-8"); 
		/*		
		mysql_query("SET CHARACTER SET 'utf-8'");
		mysql_query ("set character_set_client='utf-8'"); 
		mysql_query ("set character_set_results='utf-8'"); 
		mysql_query ("set collation_connection='utf-8_general_ci'");
		*/		
	return $db;				
	}
	/*вставляет данные в таблицу, если таблица существует. если таблица не существует, то сначала создает ее*/
	function insertDB()
	{
		$sql='';
		/*открываем соединение*/
		$db = $this->connDB();
		/*создание таблицы, если ее не существует*/
		$query = ' CREATE TABLE IF NOT EXISTS `uploadfile` ( '. 
		 'uploadTime	DATETIME , '.
		'autor	VARCHAR(255), '.
		'autorFileName	VARCHAR(255), '.
		'realFileName	VARCHAR(255) NOT NULL, '.
		'type	VARCHAR(255) , '.
		'size	VARCHAR(255), '.
		'place	VARCHAR(255) NOT NULL ) DEFAULT CHARSET utf8';
		mysql_query($query);
		 /*вставляем данные*/
		$query = " INSERT INTO `uploadfile` VALUES (NOW(),'localload','".
			$this->fname ."','".$this->fnewname ."','" .$this->ftype ."','".$this->fsize ."','" . $this->place . "')"; //".$this->folder ."
		$result = mysql_query($query)
				or trigger_error(mysql_errno() . ' ' . mysql_error() . ' query1: ' . $sql);
		/*закрываем соединение*/
		mysql_close($db); 
	
	}

	/*выбирает данные из таблицы $fnname имя искомого файла. если оно не указана, выводятся все строки*/	
	function prints( $fnname = '')
	{
		/*условие, если указано имя файла*/
		$fnname = ($fnname != '')?  'WHERE realFileName like \'' . $fnname .'\'' :'' ;
		$sql='';
		/*подключение*/
		$db = $this->connDB();
		/*достаем данные*/
		/*массив результата запроса*/
		$inputvals = array();
		/*проверяем, существует ли таблица*/
		$query = 'SHOW TABLES LIKE \'uploadfile\'';
		$result = mysql_query($query);
		/*если существует , выполняем запрос*/
		if (mysql_num_rows($result) > 0) 
		{
			$query = 'SELECT * FROM `uploadfile`' . $fnname;
			$result = mysql_query($query)
				/*	or trigger_error(mysql_errno() . ' ' .	mysql_error() . ' query1: ' . $sql)*/;

					
			/* проверяем вернулась ли хотя бы 1 строка*/
			if (mysql_num_rows($result) > 0)
			{
				$i = 0;
				/* вытаскиваем одну за другой строки, помещаем в $row
				 mysql_fetch_assoc($result)  -  строка в виде ассоциативного массива, 
				 mysql_fetch_num - порядковые номера колонок ,
				 mysql_fetch_array($result) и то и то
				*/
				while ($row = mysql_fetch_object($result)) 			
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
		}
		else 
		{
			$inputvals[0]= array ( 'err' => 'Таблицы `uploadfile` нет');

		}
		
	/*закрываем соединение*/
	mysql_close($db);
	/*возвращаем значение*/
	return $inputvals;
	}


}
	
?>
