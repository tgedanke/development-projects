Ext.define('Munas.view.directorys.PlaceGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.placegrid',
	store : 'PlaceStore',
	columns : [{
			xtype : 'gridcolumn',
			hidden : true,
			dataIndex : 'key'			
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'name',
			flex :1,
			text : 'Наименование'
		}, {
			xtype : 'gridcolumn',
			flex :1,
			dataIndex : 'state_name',
			text : 'Учреждение'
		}
	]
});
