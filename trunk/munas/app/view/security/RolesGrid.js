Ext.define('Munas.view.security.RolesGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.rolesgrid',
	//requires : ['FPAgent.view.orders.OrdTool', 'FPAgent.view.orders.OrdTotal'],
	store : 'RolesStore',
	title : 'Роли',
	columns : [{
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'role_name',
			text : 'Наименование роли'
		}, {
			xtype : 'actioncolumn',
			width : 20,
			//menuDisabled : true,
			//text : 'Членство в роли',
			itemId : 'isredy',
			items : [{
					
					getClass : function (v, meta, rec) {
						
						if (rec.get('key_role') > 0 ) {
							this.items[0].tooltip = 'Добавлен';
							return 'ex-ch';
						} else {
							this.items[0].tooltip = 'Добавить в роль';
							return 'ex-unch';
						}
					},
					handler : function (grid, rowIndex, colIndex, node, e, record, rowNode) {
						var action = 'set_action';
						this.fireEvent('item_click', this, action, grid, rowIndex, colIndex, record, node);
					}
				}
			]
			
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'description',
			text : 'Описание'
		}
	]
});
