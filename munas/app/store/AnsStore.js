Ext.define('Munas.store.AnsStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.AnsMod',
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
			dbAct : 'getAns'
		}
	}
});
