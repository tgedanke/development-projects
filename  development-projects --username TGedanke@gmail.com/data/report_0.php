<?php
	//require_once "secureCheck.php";

    //include "dbConnect.php";

    require_once 'Spreadsheet/Excel/Writer.php';

/*$db_user = "munas_dba";
$db_pwd = "munas_dba";
$db_sid = "munas";
$db_conn = oci_connect("$db_user", "$db_pwd", "$db_sid");*/
 include_once "dbConnect.php";
$d = explode('.', date('d.m.Y'));				
$date_start=$_REQUEST[date_start] ? $_REQUEST[date_start] : strftime('%d.%m.%Y', mktime(0,0,0, $d[1], '01', $d[2]) );
$l = explode('.', $date_start);
if ($l[1]=='00'){
	$query = "select * from table(F_SELECT_REPORT_0('all'))";
} else {
	$query = "select * from table(F_SELECT_REPORT_0('{$date_start}'))";
}



$result = oci_parse($db_conn, $query);
oci_execute($result);

// Creating a workbook
$workbook = new Spreadsheet_Excel_Writer();

// sending HTTP headers
$workbook->send('Отчет по работе управления.xls');

// Creating a worksheet
$worksheet =& $workbook->addWorksheet('Отчет по работе управления');

// The actual data

//соответствие заголовков и полей
$fields['Мероприятие'] = 'EVENT_NAME';
$fields['Дата проведения'] = 'DATE_EVENT';
$fields['Ответственный'] = 'NAME_ANSWERABLE';



//формат

$format_title =& $workbook->addFormat();
$format_title->setBold();
$format_title->setColor('white'); 
$format_title->setFgColor(56);
$format_title->setAlign('center'); 
$format_title->setBorder(1);
$format_title->setBorderColor(22);

$format_data =& $workbook->addFormat();
$format_data->setBorder(1);
$format_data->setBorderColor(56);


$rowNo = 0;
$startColNo = 0;

$worksheet->setMerge($rowNo, 0, $rowNo, 2);
switch ($l[1]){
case 1: $m='январь'; break;
case 2: $m='февраль'; break;
case 3: $m='март'; break;
case 4: $m='апрель'; break;
case 5: $m='май'; break;
case 6: $m='июнь'; break;
case 7: $m='июль'; break;
case 8: $m='август'; break;
case 9: $m='сентябрь'; break;
case 10: $m='октябрь'; break;
case 11: $m='ноябрь'; break;
case 12: $m='декабрь'; break;
}
if ($l[1]=='00'){
$worksheet->write(0, 0, 'Отчет по работе управления по делам культуры мэрии города Череповца за: '.$l[2].' год', $format_data);
} else {
$worksheet->write(0, 0, 'Отчет по работе управления по делам культуры мэрии города Череповца за: '.$m.', '.$l[2].' года', $format_data);
}
//пишем заголовки
$rowNo++;

$worksheet->setColumn(0,4,30);

$startColNo = 0;
foreach ($fields as $f => $value) {
    if($value!='CLASS_NAME'){
	$worksheet->write($rowNo, $startColNo++, $f, $format_title);
    }
	};
    
$rowNo++;
$arr = array();
$first =0;

while ($row = oci_fetch_array($result, OCI_ASSOC)) {
if ($row['DATE_CANCELED']!=1) {
	$yes = 0;	
	if ($first == 0){
	 array_push($arr, $row);
	 $dt=$row['DATE_EVENT'];	
	 $first = 1;
	} else {
			$count = count($arr);
			for ($i = 0; $i < $count; $i++){
				if($row['EVENT_NAME']==$arr[$i]['EVENT_NAME'] && $row['NAME_ANSWERABLE']==$arr[$i]['NAME_ANSWERABLE'] && $row['CLASS_NAME']==$arr[$i]['CLASS_NAME']){						
					if ($dt!=$row['DATE_EVENT']){
					$arr[$i]['DATE_EVENT']=$arr[$i]['DATE_EVENT'].'; '.$row['DATE_EVENT'];
						
					}
					$dt=$row['DATE_EVENT'];
					$yes = 1;
					
				} 
				
				
			}
		if ($yes == 0) {
		array_push($arr, $row);
		
		}
	}
 }   
	
}
$state='';
for ($i = 0; $i < count($arr); $i++){
//пишем данные
    if ($arr[$i]['CLASS_NAME']!=$state){
		$state=$arr[$i]['CLASS_NAME'];	
		$worksheet->write($rowNo, 0, iconv("UTF-8", "windows-1251", $arr[$i]['CLASS_NAME']), $format_data);	
		$worksheet->setMerge($rowNo, 0, $rowNo, 2);
		$rowNo++;
		}
		  
		$startColNo = 0;
        foreach ($fields as $f => $value) {
		 if ($value!='CLASS_NAME'){ 
		   		   
		   
		   $worksheet->write($rowNo, $startColNo++, iconv("UTF-8", "windows-1251", $arr[$i][$value]), $format_data);
           
		  }
			};
		
        $rowNo++;
	
}


// Let's send the file
$workbook->close();

?>