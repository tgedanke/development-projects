Ext.define('Munas.view.directorys.StateGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.stategrid',
	//requires : ['FPAgent.view.orders.OrdTool', 'FPAgent.view.orders.OrdTotal'],
	store : 'StateStore',
	columns : [{
			xtype : 'gridcolumn',
			hidden : true,
			dataIndex : 'key'			
		}, {
			xtype : 'gridcolumn',
			flex: 1,
			dataIndex : 'name',
			text : 'Наименование'
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'street_name',
			text : 'Улица'
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'house_number',
			text : 'Номер дома'
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'description',
			text : 'Описание'
		}
	]
});
