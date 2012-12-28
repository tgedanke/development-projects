Ext.define('Munas.store.AnsStore', {
	extend : 'Ext.data.Store',
	model : 'Munas.model.AnsMod',
	autoLoad : true,
	proxy : {
		type : 'ajax',
		url : 'data/data.php',
		reader : {
			type : 'json',
			root : 'data'
		},
		extraParams : {
			dbAct : 'getAns'
		}
	}
});
