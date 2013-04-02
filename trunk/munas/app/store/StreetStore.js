Ext.define('Munas.store.StreetStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.StreetMod',
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
			dbAct : 'getStreet'
		}
	}
});
