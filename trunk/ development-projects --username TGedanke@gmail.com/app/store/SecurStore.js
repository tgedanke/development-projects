Ext.define('Munas.store.SecurStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.RolesMod',
	//autoLoad : true,
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getRoles'
		}
	}
});
