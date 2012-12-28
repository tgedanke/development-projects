Ext.define('Munas.store.ClassEventStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.ClassEventMod',
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getClassEvent'
		}
	}
});
