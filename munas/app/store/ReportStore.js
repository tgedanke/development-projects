Ext.define('Munas.store.ReportStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.ReportMod',
	autoLoad : true,
	/*proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getStreet'
		}
	},*/
	data : [{
			report_name : 'Отчет по работе управления по делам культуры',
			key : 0
		}, {
			report_name : 'Отчет по мероприятиям в муниципальных учреждениях культуры',
			key : 1
		}
	]
});
