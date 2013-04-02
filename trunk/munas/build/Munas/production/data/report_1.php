<?php
	//require_once "secureCheck.php";

    require_once 'Spreadsheet/Excel/Writer.php';



if ($_REQUEST['dbAct']!='getReport'){
exit;
}

 include_once "dbConnect.php";

$d = explode('.', date('d.m.Y'));				
$date_start=$_REQUEST[date_start] ? $_REQUEST[date_start] : strftime('%d.%m.%Y', mktime(0,0,0, $d[1], '01', $d[2]) );
$l = explode('.', $date_start);
if ($l[1]=='00'){
	$query = "select * from table(F_SELECT_REPORT_1('all'))";
} else {
	$query = "select * from table(F_SELECT_REPORT_1('{$date_start}'))";
}

$result = oci_parse($db_conn, $query);
oci_execute($result);

// Creating a workbook
$workbook = new Spreadsheet_Excel_Writer();

// sending HTTP headers
$workbook->send('Отчет по мероприятиям.xls');

// Creating a worksheet
$worksheet =& $workbook->addWorksheet('Отчет по мероприятиям');

// The actual data

//соответствие заголовков и полей
$fields['Дата проведения'] = 'DATE_EVENT';
$fields['Время начала'] = 'TIME_EVENT';
$fields['Место'] = 'PLACE_NAME';
$fields['Стоимость билетов'] = 'PRICE_TICKETS';
$fields['Наименование'] = 'EVENT_NAME';
$fields['Учреждение'] = 'STATE_NAME';


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

$worksheet->setMerge($rowNo, 0, $rowNo, 4);
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
$worksheet->write(0, 0, 'Отчет по мероприятиям в муниципальных учреждениях культуры за: '.$l[2].' год', $format_data);
} else {
$worksheet->write(0, 0, 'Отчет по мероприятиям в муниципальных учреждениях культуры за: '.$m.', '.$l[2].' года', $format_data);
}
//пишем заголовки
$rowNo++;

$worksheet->setColumn(0,4,30);

$startColNo = 0;
foreach ($fields as $f => $value) {
    if($value!='STATE_NAME'){
	$worksheet->write($rowNo, $startColNo++, $f, $format_title);
    }
	};
    
$rowNo++;

$arr = array();
$first =0;

while ($row = oci_fetch_array($result, OCI_ASSOC)) {

	$yes = 0;	
	if ($first == 0){
	 array_push($arr, $row);
	 $first = 1;
	} else {
			$count = count($arr);
			for ($i = 0; $i < $count; $i++){
				if($row['PLACE_NAME']==$arr[$i]['PLACE_NAME'] && $row['TIME_EVENT']==$arr[$i]['TIME_EVENT'] && $row['EVENT_NAME']==$arr[$i]['EVENT_NAME']){
					$arr[$i]['DATE_EVENT']=$arr[$i]['DATE_EVENT'].'; '.$row['DATE_EVENT'];	
					$yes = 1;
				} 
					
				
			}
		if ($yes == 0) {
	array_push($arr, $row);
	}
	}
      
	
}
$state='';
for ($i = 0; $i < count($arr); $i++){
//пишем данные
    if ($arr[$i]['STATE_NAME']!=$state){
		$state=$arr[$i]['STATE_NAME'];	
		$worksheet->write($rowNo, 0, iconv("UTF-8", "windows-1251", $arr[$i]['STATE_NAME']), $format_data);	
		$worksheet->setMerge($rowNo, 0, $rowNo, 4);
		$rowNo++;
		}
		  
		$startColNo = 0;
        foreach ($fields as $f => $value) {
		 if ($value!='STATE_NAME'){ 
		   		   
		   
		   $worksheet->write($rowNo, $startColNo++, iconv("UTF-8", "windows-1251", $arr[$i][$value]), $format_data);
           
		  }
			};
		
        $rowNo++;
	
}

// Let's send the file
$workbook->close();

?>