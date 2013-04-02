Ext.define('Munas.store.AgeStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.AgeMod',	
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		actionMethods: 'POST',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getAgeLimit'
		}
	}
});