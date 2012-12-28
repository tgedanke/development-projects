Ext.define('Munas.store.ClassStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.ClassMod',
	autoLoad : true,
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getClass'
		}
	}
});
