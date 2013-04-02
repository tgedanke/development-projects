Ext.define('Munas.store.RolesStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.RolesMod',
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
			dbAct : 'getRoles'
		}
	}
});
