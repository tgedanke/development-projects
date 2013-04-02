Ext.define('Munas.store.ReasonStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.ReasonMod',	
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		actionMethods: 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getReason'
		}
	}
});