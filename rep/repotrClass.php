<?php
class field
{
public $key; /*Ключ*/
	public $keyColumn; /*Ключ столбца*/
	public $fildView; /*Имя поля в представлении*/
	public $fWidth; /*Ширина столбца*/
	public $fHeight; /*Высота строки*/
	public $borderL; /*Граница_л*/
	public $order;/*Сортировка (0 не сорт, 1 каким по счету в сортировке) */
	public $group;/*Группировка до 3 полей*/
	public $fontSize; /*Шрифт размер*/
	public $nameView;/*Имя представления ( вьюшки с данными)*/
	public $keyTemplate; /*Ключ шаблона*/
	public $fColumn; /*Колонка*/
	public $fRow; /*Строка*/
	public $borderR; /*Граница_пр*/
	public $borderB; /*Граница_н*/
	public $borderT; /*Граница_в*/
	public $fType;/*Тип_поля (1 шапк, 0 данные из вью, 2 вычисл понле формула) */

	function __construct($key,$keyColumn,$fildView,$fWidth,$fHeight,$borderL,$order,$group,$fontSize,$nameView,$keyTemplate,$fColumn,$fRow,$borderR,$borderB,$borderT,$fType)
	{
	$this->key = $key;
		$this->keyColumn = $keyColumn;
		$this->fildView = $fildView;
		$this->fWidth = $fWidth;
		$this->fHeight = $fHeight;
		$this->borderL = $borderL;
		$this->order = $order;
		$this->group = $group;
		$this->fontSize = $fontSize ;
		$this->nameView = $nameView ;
		$this->keyTemplate = $keyTemplate;
		$this->fColumn = $fColumn;
		$this->fRow = $fRow;
		$this->borderR = $borderR;
		$this->borderB = $borderB;
		$this->borderT = $borderT;
		$this->fType = $fType;
	}
}

function connDB()
{
	$db_user = "AIS_MUNAS";
	$db_pwd = "1";
	$db_sid = "mun";			
	$db_conn = oci_connect($db_user, $db_pwd, $db_sid);
	return $db_conn;				
}


	
function initClass($keys)	
{
$repmass = array();
	$db = connDB();
	$query = "select * from REPORTS t where KEY = {$keys}";
	$result = oci_parse($db, $query);
	oci_execute($result);
	$i=0;
	while ($row = oci_fetch_array($result, OCI_ASSOC))
		{
		$repmass[$i] = new field ($keys, $row["KEY_COLUMN"], $row["FIELD_VIEW"], $row["F_WIDTH"], $row["F_HEIGHT"],
		$row["BORDER_L"], $row["ORDER"], $row["GROUP"], $row["FONT_SIZE"], $row["NAME_VIEW"], $row["KEY_TEMPLATE"], 
		$row["F_COLUMN"],$row["F_ROW"],$row["BORDER_R"],$row["BORDER_B"],$row["BORDER_T"],$row["F_TYPE"]);
		$i++;	
		} 
	oci_close($db);
return $repmass;	
}
	
function getDataView($in)
{
	$db = connDB();
	$datavals = array();
	$query = "select * from {$in} v";
	$result = oci_parse($db, $query);
	oci_execute($result);
	$i=0;
	while ($row = oci_fetch_array($result, OCI_BOTH))
		{ $j=0;
			foreach ($row as $item)
			{
			$datavals[$i][$j] = ($item !== null ? htmlentities($item, ENT_QUOTES) : "");
			
			$j++;
			}
		$i++;	
		}
	oci_close($db);	
	return $datavals;
}
/*собираем данные для отчета*/
$keys = 1;
$resArray = initClass($keys);
$resArrayData = array();
$i=0;
foreach ($resArray as $item)
{
$resArrayData[$i] = getDataView($item->nameView);
$i++;
}
/*пока просмотр*/
echo '---------------<br>';
$i=0;
	foreach ($resArray as $item)
	{
		echo $item->nameView . '<hr>';
		
			foreach ($resArrayData[$i]  as $data => $mass)
			{
				echo '<br>';
				foreach ($mass  as $element => $vals)
				{
					echo $vals . '|';
				}
			}
		$i++;
	}
echo '<br>---------------';


 
?>