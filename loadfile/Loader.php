<?php
/*
	загружает файл на локальный ресурс 
	 $folder имя каталога на сервере 
	 $whitelist список разрешенных расширений
	 $fname имя файла
	 
	 возвращаемые:
	 $ftype тип зпгруженого файла
	 $fsize размер файла
	 $fnewname имя, под которым файл загружен 

*/
class Loader 
{
	protected $folder; 
	public $whitelist;
	public $fname;
	public $ftype;
	public $fsize;
	public $fnewname;
	
	
	function __construct($folder, $whitelist)
	{
		$this->folder = $folder;
		$this->whitelist = $whitelist;
	}
	
	/* загружает файл на диск, возвращает статус загрузки*/
	function loads()
	{	
	/*если выбран файл*/
		if(isset($_POST['upload']))
		{	
		/*если загрузка на сервере запрещена, разрешим*/
			if (!ini_get('file_uploads')) 
			{	
				ini_set('file_uploads', '1');
			}
		
			$error = true;
			
			/*проверка типа файла. если его расширение не содержится в $whitelist, возвращается ошибка*/
			if(in_array(strtolower(substr($_FILES['uploadFile']['name'], 1+strrpos($_FILES['uploadFile']['name'],"."))),$this->whitelist) ) $error = false;
			if($error) die("Ошибка,  Вы не можете загружать файл этого типа"); 
			
			/*$uploadedFile путь для загрузки + имя файла*/
			$uploadedFile = $this->folder.basename($_FILES['uploadFile']['name']);
			if(!empty($_FILES['uploadFile']['tmp_name']))
			{ 
				/*генерация случайного имени для загрузки файла для хранения */
				$file_ext =  strtolower(strrchr($_FILES['uploadFile']['name'],'.'));
				$file_name = uniqid(rand(10000,99999));
				$uploadedFile  = $this->folder.$file_name.$file_ext;
				
				/*перемещает загруженый файл в указаное место*/
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
	function LoadYandex ()
	{
		if(isset($_POST['upload']))
		{	
		$server = 'ssl://webdav.yandex.ru';
		$port = 443;
		$user = 'mirrorYNDX';
		$pass = '';
		
		$fp = fsockopen($server, $port, $errno, $errstr, 30);

		if (!$fp) 
			{
			echo "$errstr ($errno)<br />\n";
			} 
		else 	
			{
			// try to open the file ...
					$filename = $_FILES['uploadFile']['name'];
					$path = "/".$_FILES['uploadFile']['name'];
            
				$out = "PUT / HTTP/1.1";
				$out .= "Host: webdav.yandex.ru";
				//$out .= "Connection: Close\r\n\r\n"; //= sprintf('Connection: Keep-Alive');
				$out .= 'User-Agent: php class webdav_client $Revision: 1.7 $';
				$out .= 'Authorization: Basic '. base64_encode("$user:$pass");
				// add more needed header information ...
 				$out .= 'Content-length: ' . filesize($filename);
				$out .= 'Content-type: application/octet-stream';
				fwrite($fp, $out);
				while (!feof($fp)) {
					echo fgets($fp, 128);
				}

			
        
			fclose($fp);
			}

		}
	}




	
}
	
	
?>
