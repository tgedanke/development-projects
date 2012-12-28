Ext.define('Munas.view.security.UsersGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.usersgrid',
	//requires : ['FPAgent.view.orders.OrdTool', 'FPAgent.view.orders.OrdTotal'],
	store : 'UsersStore',
	title : 'Пользователи',
	columns : [{
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'user_name',
			text : 'ФИО'
		}, /*{
			xtype : 'gridcolumn',
			//width : 114,
			dataIndex : 'is_disable',
			text : 'Заблокирован'
		},*/{
			xtype : 'actioncolumn',
			width : 40,
			//menuDisabled : true,
			text : 'Забл.',
			//itemId : 'isredy',
			items : [{
					
					getClass : function (v, meta, rec) {
						
						if (rec.get('is_disable') > 0 ) {
							this.items[0].tooltip = 'Работать запрещено';
							return 'ex-che';
						} else {
							this.items[0].tooltip = 'Может работать';
							return 'ex-unche';
						}
					}
				}
			]
			
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'login',
			text : 'Логин'
		}, {
			xtype : 'gridcolumn',
			dataIndex : 'key',
			hidden : true
		}
	]
});
