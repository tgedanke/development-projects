Ext.define('Munas.view.main.EventGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.eventgrid',
	//requires : ['FPAgent.view.orders.OrdTool'],
	store : 'EventStore',
	columns : [{
			xtype : 'gridcolumn',
			hidden : true,
			dataIndex : 'key'			
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'name',
			text : 'Наименование'
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'state_name',
			text : 'Учреждение'
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'duration',
			text : 'Длительность'
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'price_tickets',
			text : 'Цена билета'
		}, /*{
			xtype : 'gridcolumn',			
			dataIndex : 'canceled',
			text : 'Отменено'
		}*/
		{
			xtype : 'actioncolumn',
			width : 40,
			menuDisabled : true,
			text : 'Отм.',
			itemId : 'iscancel',
			items : [{					
					getClass : function (v, meta, rec) {						
						if (rec.get('canceled') > 0 ) {
							this.items[0].tooltip = 'Отменено';
							return 'ex-che';
						} else {
							this.items[0].tooltip = 'Состоится';
							return 'ex-unche';
						}
					}
				}
			]
			
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'reason_name',
			text : 'Причина отмены'
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'description',
			text : 'Описание'
		}
	]
});
