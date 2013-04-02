Ext.define('Munas.store.HistStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.HistMod',
	//autoLoad : true,
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		actionMethods: 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getHist'
		}
	}
});
