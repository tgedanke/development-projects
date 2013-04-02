Ext.define('Munas.store.HouseStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.HouseMod',
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
			dbAct : 'getHouse'
		}
	}
});
