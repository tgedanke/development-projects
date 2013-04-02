Ext.define('Munas.store.ClassStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.ClassMod',
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
			dbAct : 'getClass'
		}
	}
});
