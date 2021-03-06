Ext.define('Munas.store.ClassEventStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.ClassEventMod',
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		actionMethods: 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getClassEvent'
		}
	}
});
