Ext.define('Munas.store.DateStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.DateMod',
	//autoLoad : true,
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getDate'
		}
	}
});
