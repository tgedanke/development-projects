Ext.define('Munas.store.EventStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.EventMod',
	//autoLoad : true,
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getEvent'
		}
	}
});
