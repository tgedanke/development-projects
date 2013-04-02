Ext.define('Munas.store.EventStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.EventMod',
	remoteFilter: true,
	proxy : {
		type : 'ajax',		
		url : 'data/data.php',
		actionMethods: 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getEvent'
		}
	}
});
