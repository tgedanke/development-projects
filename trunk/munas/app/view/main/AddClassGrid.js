Ext.define('Munas.view.main.AddClassGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.addclassgrid',	
	store : 'ClassEventStore',
	columns : [{
			xtype : 'gridcolumn',
			hidden : true,
			dataIndex : 'key'			
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'name',
			flex : 1,
			text : 'Наименование'
		}
	]
});
