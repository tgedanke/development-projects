Ext.define('Munas.store.PlaceStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.PlaceMod',
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
			dbAct : 'getPlace'
		}
	}
});
