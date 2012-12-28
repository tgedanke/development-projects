Ext.define('Munas.store.ContStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.ContMod',
	autoLoad : true,
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getContacts'
		}
	}
});
