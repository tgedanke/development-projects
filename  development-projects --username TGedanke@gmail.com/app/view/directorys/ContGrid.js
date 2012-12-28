Ext.define('Munas.view.directorys.ContGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.contgrid',
	//requires : ['FPAgent.view.orders.OrdTool', 'FPAgent.view.orders.OrdTotal'],
	store : 'ContStore',
	
	columns : [{
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'owner_name',			
			text : 'ФИО'
		},{
			xtype : 'gridcolumn',			
			dataIndex : 'state_name',
			text : 'Учреждение'
		}, {
			xtype : 'gridcolumn',
			//width : 150,
			dataIndex : 'phone',
			text : 'Телефон'
		}, {
			xtype : 'gridcolumn',
			//format : 'd.m.Y',
			//width : 70,
			dataIndex : 'email',
			text : 'Почта'
		}, {
			xtype : 'gridcolumn',
			//width : 114,
			dataIndex : 'appointment',
			text : 'Должность'
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'address',
			text : 'Местоположение'
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'description',
			text : 'Описание'
		}
	]
});
