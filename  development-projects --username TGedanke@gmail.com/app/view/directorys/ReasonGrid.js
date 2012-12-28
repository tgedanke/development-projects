Ext.define('Munas.view.directorys.ReasonGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.reasongrid',
	store : 'ReasonStore',
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
