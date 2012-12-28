Ext.define('Munas.view.directorys.AnsGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.ansgrid',	
	store : 'AnsStore',
	columns : [{
			xtype : 'gridcolumn',
			hidden : true,
			dataIndex : 'key'			
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'name_answerable',
			flex : 1,
			text : 'Наименование'
		} 
	]
});
