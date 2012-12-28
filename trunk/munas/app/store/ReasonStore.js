Ext.define('Munas.store.ReasonStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.ReasonMod',
	autoLoad : true,
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getReason'
		}
	}
});