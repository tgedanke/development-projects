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
		$yaserver = 'https://webdav.yandex.ru';
		$yauser = 'mirrorYNDX';
		$yapass = '';
		$yadir = 'upload_files/';
		$uploadedFile = $_FILES['uploadFile']['tmp_name'];
		$fp = fopen($uploadedFile, 'r');
		
		//curl --user yandex_login:yandex_password -T file_name_to_upload https://webdav.yandex.ru
		//echo $uploadedFile;
		//system ("curl --user $yauser:$yapass -T $uploadedFile https://webdav.yandex.ru/upload_files/");

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://webdav.yandex.ru:443/upload_files/".$_FILES['uploadFile']['name']);
		//curl_setopt($ch, CURLOPT_USERPWD, $yauser.":".$yapass);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);   // no verify

    
		$headers = array(
		'PUT / HTTP/1.1',
		'Connection: Close\r\n\r\n', 
		'User-Agent: php class webdav_client $Revision: 1.7 $',
		'Authorization: Basic '. base64_encode("$yauser:$yapass"),
		'Content-length: ' . filesize($uploadedFile),
		'Content-type: application/octet-stream'
		);
		curl_setopt($ch, CURLOPT_HTTPHEADER,$headers); 

		curl_setopt($ch, CURLOPT_USERPWD, $yauser . ":" . $yapass);		
		curl_setopt($ch, CURLOPT_UPLOAD, 1);
		curl_setopt($ch, CURLOPT_INFILE, $fp);
		curl_setopt($ch, CURLOPT_INFILESIZE, filesize($uploadedFile));

		curl_exec($ch);

		$error_no = curl_errno($ch);
		curl_close ($ch);
		
        if ($error_no == 0) {
            echo 'File uploaded succesfully.';
        } else {
            echo 'File upload error. '.$error_no ;
        }
		fclose($fp);
// echo phpinfo();

/*

Собсно, что на нужно для счестья на примере яндекса:

curl --user юзер:пароль -o filename.ext https://webdav.yandex.ru/backup/filename.ext
curl --user юзер:пароль -T filename.ext https://webdav.yandex.ru/backup/
curl --user юзер:пароль -T {filename.ext,othername.ext} https://webdav.yandex.ru/backup/
curl --user юзер:пароль --request DELETE https://webdav.yandex.ru/backup/filename.ext

Здесь мы ковыряемся с файлами в папке backup. Согласно манам, при указании папки нужно осталять крайний слэш, стобы curl не терялся в догадках не файл ли это.

Вариант раз - забираем файл из облака. Имя файла указывается два раза - в URL'е (очевидно зачем, да?) и как имя выходного файла, т.к. иначе curl выплюнет файл на stdout.

Варианты два и три - заливаем файл в облако. В первом случае один файл, во втором несколько (и оба реактивные). Вообще, такая обработка нескольких файлов не относится конкретно к webdav, но пусть будет для галочки. Если файл с таким именем уже существует, он молча перезаписывается.

Ну и вариант четыре - удаление файла. Гуглом находятся и команды получения списка файлов, и переименования, но для моей задачи какбэ не требуется.
		
*/
	

		}
		
	}




	
}
	
	
?>
