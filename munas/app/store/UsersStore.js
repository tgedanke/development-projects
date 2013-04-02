Ext.define('Munas.store.UsersStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.UsersMod',
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
			dbAct : 'getUsers'
		}
	}
});
