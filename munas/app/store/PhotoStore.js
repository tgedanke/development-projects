Ext.define('Munas.store.PhotoStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.PhotoMod',
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
			dbAct : 'getPhoto'
		}
	}
});
