Ext.define('Munas.store.StateStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.StateMod',
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
			dbAct : 'getState'
		}
	}
});
