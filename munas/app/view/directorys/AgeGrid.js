Ext.define('Munas.view.directorys.AgeGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.agegrid',
	store : 'AgeStore',
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
