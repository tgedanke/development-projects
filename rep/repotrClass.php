<?php
//header("Content-type: text/plain; charset=utf-8"); 
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
  
require_once 'Spreadsheet/Excel/Writer.php';
require_once 'MPDF56/mpdf.php';
require_once 'html_to_doc/html_to_doc.inc.php' ;

  
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
	$query = "select * from REPORTS t where KEY_TEMPLATE = {$keys} order by KEY_COLUMN ";
	$result = oci_parse($db, $query);
	oci_execute($result);
	$i=0;
	while ($row = oci_fetch_array($result, OCI_ASSOC))
		{
		$repmass[$i] = new field ($keys, $row["KEY_COLUMN"], $row["FIELD_VIEW"], $row["F_WIDTH"], $row["F_HEIGHT"],
		$row["BORDER_L"], $row["ORDER"], $row["T_GROUP"], $row["FONT_SIZE"], $row["NAME_VIEW"], $row["KEY_TEMPLATE"], 
		$row["F_COLUMN"],$row["F_ROW"],$row["BORDER_R"],$row["BORDER_B"],$row["BORDER_T"],$row["F_TYPE"]);
		$i++;	
		} 
	oci_close($db);
return $repmass;	
}

function getDataView($in,$fv,$gr)
{//данные из вью	
	$db = connDB();
	$datavals = array();
	$query = "select {$fv} from {$in} {$gr}";
	$result = oci_parse($db, $query);
	oci_execute($result);
	$i=0;
	while ($row = oci_fetch_array($result, OCI_NUM))
		{ 
			foreach ($row as $item)
			{
			$datavals[$i] = $item;
			
			}
		$i++;	
		}
	oci_close($db);	
	return $datavals;
}

function addvals ($where, $that)
	{//склеивает строки с запятой
	return (strlen($where)>0)?($where.', '.$that):($that);
	}
	
function forGroupAndOrder ($resAr)
{//для запроса список условий для группировки и сортировки
$i=0;
$j=0;//счетчик для массива
$ord=$gr='';
$groupd = array();
$returnval = array();
foreach ($resAr as $item)
	{
		if ((int)$item->group > 0) {
			$gr = addvals ($gr,$item->fildView);
			$groupd[$j]=$i;
			$j++;
			}
		if (((int)$item->order > 0)&& ($item->order <>$item->group) ){
			$ord = addvals ($ord,$item->fildView);
			}
	$i++;
		
	}
	$ord = ((strlen($gr)>0)&& (strlen($ord)>0))? addvals($gr,$ord):((strlen($gr)>0)?$gr:$ord );
	$ord = (strlen($ord)>0)?('order by '.$ord):'';
	$returnval[0]=$ord;
	$returnval[1]=$gr;
	$returnval[2]=$groupd;
	return $returnval;
}



function printExcel($resAr, $resArData, $groupd)
{	
	
/*пишем в эксель*/
// Creating a workbook
$workbook = new Spreadsheet_Excel_Writer();
$workbook->setTempDir(ini_get('upload_tmp_dir'));
// sending HTTP headers
$workbook->send('Отчет.xls');
// Creating a worksheet
$worksheet =& $workbook->addWorksheet(iconv( "UTF-8", "windows-1251",'Отчет'));

// The format data
$format_d = array();// The format data
$r = 0;//пишем в эту строку не с 0, для красоты, отступ $o
$o = 1;// отступ 
$c = 0;//и эту колонку
$i = 0;
$maxr=0;//кол-во строк, без учета заголовка для выводда кол-ва внизу 

	foreach ($resAr as $item)
	{
	//задаем стили для данного объекта
	$format_d[$i] =& $workbook->addFormat();
	$format_d[$i]->setLeft($item->borderL);//Граница_л
	$format_d[$i]->setTop($item->borderT);//Граница_в
	$format_d[$i]->setBottom($item->borderB);//Граница_н
	$format_d[$i]->setRight($item->borderR);//Граница_пр
	$format_d[$i]->setSize($item->fontSize);//Шрифт размер
	$cc=0;
	$item->fWidth = round(8.43*$item->fWidth/64);//тк в табличке ширина столбца в пикселах, а в екселе в пунктах, при том, что 8,43 пункта = 64 пикселя, переведем в пункты
	
		if ($item->fType == 0)//шапка таблички
		{
			$r=$o;
			$c++;
			$item->fWidth = ($item->fWidth >= (strlen($item->fildView)+10))? $item->fWidth :(strlen($item->fildView)+10);//на случай, если текст длиннее +зазор 10 букв
			$worksheet->setColumn($c,$c,$item->fWidth);//Ширина столбца
			$worksheet->setRow($r,$item->fHeight); //Высота строки
			$worksheet->write($r, $c, iconv( "UTF-8", "windows-1251", $item->fildView ),$format_d[$i] );
			$colGroup = (int)$item->fgroup;//надо ли группировать шапку?
			if ($colGroup > 1)//растянем шапку на нужное кол-во столбцов
				{
				$worksheet->mergeCells ($r,$c,$r+$colGroup,$c);
				}
			$r++;
		}
		if (($item->fType == 1)&&((int)$item->group == 0))//данные кроме столбцов группировки
		{
			if($r>$o+1){$r=$o+1; $c++;}
				foreach ($resArData[$i]  as $element => $vals)
				{ 
			$item->fWidth = ($item->fWidth >= (strlen($vals)+10))? $item->fWidth :(strlen($vals)+10);//на случай, если текст длиннее +зазор 10 букв
			$worksheet->setColumn($c,$c,$item->fWidth);//Ширина столбца
					$worksheet->write($r, $c, iconv( "UTF-8", "windows-1251", $vals ),$format_d[$i]);
					$worksheet->setRow($r,$item->fHeight); //Высота строки
					if (!in_array (($r-$o-1),$groupd[1])){$cc ++;}//считаем строки в кахдом столбце. проверка является ли данная строка группир. -отступ и -1 - из-за заголовка
					$r++;
				}

			$maxr = ($maxr > $cc)? $maxr : $cc;
		}
		if ($item->fType == 2)//кол-во
		{
		$vl=iconv( "UTF-8", "windows-1251", $item->fildView );
		$worksheet->write($r, $item->fColumn, ((strtolower($vl)!= 'count')? $vl :$maxr ),$format_d[$i] );
		$worksheet->setRow($r,$item->fHeight); //Высота строки
		
		if($item->fColumn > 1){$r++;}
		}	
		$i++;
	}
	for ($j=0;$j<count($groupd[1]);$j++)//объединить ячейки группир.
	{
	$worksheet->mergeCells (($groupd[1][$j]+$o+1),1,($groupd[1][$j]+$o+1),$c);
	}
	

	
$workbook->close();

}


function getHTMLforPdfDoc($resAr, $resArData, $groupd)//формирует текст в html
{
$html='';
$th='';
$lastrow='';
$rows='';
$maxlen=0;
$i=0;
$style='';
$fCol='';
foreach ($resAr as $item)
	{
	$borl='border-left: '.(int)$item->borderL .'px solid; ';//Граница_л  
	$bort='border-top: '.(int)$item->borderT .'px solid; ';//Граница_в
	$borb='border-bottom: '.(int)$item->borderB .'px solid; ';//Граница_н
	$borr='border-right: '.(int)$item->borderR .'px solid; ';//Граница_пр
	$fonts='font-size: '.(int)$item->fontSize .'px; ';//Шрифт размер
	$hei='height: '.(int)$item->fHeight.'px; ';
	$wid='width: '.(int)$item->fWidth.'px; ';
	$style=$borl.$bort.$borb.$borr.$fonts.$hei.$wid;
	
	
	if ($item->fType == 0)//шапка таблички
		{
		
		$th= $th.'<td style="'.$style.'">'.iconv( "UTF-8", "windows-1251", $item->fildView ).'</td>';
		}
	if ($item->fType == 2)//кол-воили что-то еще таблички
		{
		//$maxlen;
		$fCol=$item->fColumn;
		if ((int)$fCol<2)
			{
			$fCol=iconv( "UTF-8", "windows-1251", $item->fildView );
			}
		else 
			{
			$fCol=$maxlen-1;
			}
			$lastrow= $lastrow.'<td style="'.$style.'">'.$fCol.'</td>';	
		}
	if ($item->fType == 1)//данные
		{
		$maxlen=(strlen($resArData[$i])>$maxlen)?strlen($resArData[$i]):$maxlen;
		}
	$i++;	
	}
	
$txt='';
for ($i = 0; $i <= $maxlen; $i++) 
	{
	$txt='';
	$isgroup=0;
	for ($j=0; $j < count($resAr);$j++)
		{
			$borl='border-left: '.(int)$resAr[$j]->borderL .'px solid; ';//Граница_л  
			$bort='border-top: '.(int)$resAr[$j]->borderT .'px solid; ';//Граница_в
			$borb='border-bottom: '.(int)$resAr[$j]->borderB .'px solid; ';//Граница_н
			$borr='border-right: '.(int)$resAr[$j]->borderR .'px solid; ';//Граница_пр
			$fonts='font-size: '.(int)$resAr[$j]->fontSize .'px; ';//Шрифт размер
			$hei='height: '.(int)$resAr[$j]->fHeight.'px; ';
			$wid='width: '.(int)$resAr[$j]->fWidth.'px; ';
			$style=$borl.$bort.$borb.$borr.$fonts.$hei.$wid;

		
			if (($resAr[$j]->fType == 1)&&((int)$resAr[$j]->group == 0))//данные кроме столбцов группировки
			{
			if (strlen($resArData[$j][$i])>0)
				{
				if (in_array($i, $groupd[1], true))
					{
					if($isgroup==0)
						{
						$txt=$txt.'<td style="'.$style.'" colspan='.count($resAr).'>'.iconv( "UTF-8", "windows-1251",$resArData[$j][$i]).'</td>';
						$isgroup++;
						}
					}
				else
					{	
					$txt=$txt.'<td style="'.$style.'">'.iconv( "UTF-8", "windows-1251",$resArData[$j][$i]).'</td>';
					}
				}
			}
		}
	$txt=(strlen($txt)>0)?('<tr>'.$txt.'</tr>'):$txt;
	$rows=$rows.$txt;	
	}
$th='<tr>'.$th.'</tr>';
$lastrow='<tr>'.$lastrow.'</tr>';
	
$html= '<table style="border-collapse: collapse;">'.$th.$rows.$lastrow.'</table>';
return $html;




}

function printPDF($resAr, $resArData, $groupd)
{
$html = getHTMLforPdfDoc($resAr, $resArData, $groupd);

$mpdf = new mPDF('utf-8', 'A4', '8', '', 10, 10, 7, 7, 10, 10); //задаем формат, отступы и.т.д.
$mpdf->charset_in = 'cp1251'; //не забываем про русский

$stylesheet = '';//'table {text-align: center;font-size: 20pt;width: 100%;}';//file_get_contents('style.css'); //подключаем css
$mpdf->WriteHTML($stylesheet, 1);

$mpdf->list_indent_first_level = 0;
$mpdf->WriteHTML($html, 2); //формируем pdf
$mpdf->Output('mpdf.pdf', 'I');


}

function printDOC($resAr, $resArData, $groupd)
{
$html = getHTMLforPdfDoc($resAr, $resArData, $groupd);


header("Content-type: application/vnd.ms-word");
header("Content-Disposition: attachment;Filename=отчет.doc");

echo  $html;

}

/*собираем данные для отчета*/
$keys = 0;
$resArray = initClass($keys);
$resArrayData = array();
//сортировка-группировка
$groupdata = array();//массив с номерами эл-в для группировки
$res=array();
$res=forGroupAndOrder ($resArray);
$groups = $res[0];
$orders = $res[1];
$groupdata[0]=$res[2];
$groupdata[1]=array();	
$i=0;
foreach ($resArray as $item)
	{
		$resArrayData[$i] = array();
		if ($item->fType == 1)
		{
			$resArrayData[$i] = getDataView($item->nameView,$item->fildView, $order );
		}
	$i++;
	}
	
//если есть группировка count($grouprow),
if(strlen($groups)>0)
{
foreach ($groupdata[0] as $item)//если не по1 полю группировка
	{
		$vals='';
		$counts=0;
		$i=0;
		foreach ($resArrayData[(int)$item]  as $elem)//вставляем сгрупированые названия вмассивы, ткт вставить потом строки в эксель в Spreadsheet_Excel_Writer низя
		{
			if ($elem != $vals)
			{ 
				$vals=$elem;
				// вставить $vals в [$i+$counts] строку 
				for ($j=0; $j<count($resArrayData); $j++)
				{ 
				if (($j != (int)$item) && ($resArray[$j]->fType == 1))
					{ 
						array_splice($resArrayData[$j], ($i+$counts), 0, $vals);
						$groupdata[1][count($groupdata[1])]=(int)($i+$counts);
					}
				}
				$counts++;
			}
			$i++;
		}
	}

}
	//$pr= printExcel($resArray, $resArrayData, $groupdata);
//$pr= printPDF($resArray, $resArrayData, $groupdata);
$pr= printDOC($resArray, $resArrayData, $groupdata);
?>