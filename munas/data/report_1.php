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
$workbook->send('����� �� ������������.xls');

// Creating a worksheet
$worksheet =& $workbook->addWorksheet('����� �� ������������');

// The actual data

//������������ ���������� � �����
$fields['���� ����������'] = 'DATE_EVENT';
$fields['����� ������'] = 'TIME_EVENT';
$fields['�����'] = 'PLACE_NAME';
$fields['��������� �������'] = 'PRICE_TICKETS';
$fields['������������'] = 'EVENT_NAME';
$fields['����������'] = 'STATE_NAME';


//������

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
case 1: $m='������'; break;
case 2: $m='�������'; break;
case 3: $m='����'; break;
case 4: $m='������'; break;
case 5: $m='���'; break;
case 6: $m='����'; break;
case 7: $m='����'; break;
case 8: $m='������'; break;
case 9: $m='��������'; break;
case 10: $m='�������'; break;
case 11: $m='������'; break;
case 12: $m='�������'; break;
}
if ($l[1]=='00'){
$worksheet->write(0, 0, '����� �� ������������ � ������������� ����������� �������� ��: '.$l[2].' ���', $format_data);
} else {
$worksheet->write(0, 0, '����� �� ������������ � ������������� ����������� �������� ��: '.$m.', '.$l[2].' ����', $format_data);
}
//����� ���������
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
//����� ������
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