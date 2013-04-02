Ext.define('Munas.store.DateStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.DateMod',
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
			dbAct : 'getDate'
		}
	}
});
