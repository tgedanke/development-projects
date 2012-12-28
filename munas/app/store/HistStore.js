Ext.define('Munas.store.HistStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.HistMod',
	//autoLoad : true,
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getHist'
		}
	}
});
