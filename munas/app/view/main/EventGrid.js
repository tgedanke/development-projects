Ext.define('Munas.view.main.EventGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.eventgrid',
	requires : ['Munas.view.main.EventTotal'],
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
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'photo',
			width : 40,
			text : 'Фото'
		},
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
			
		},
		{
			xtype : 'actioncolumn',
			width : 40,
			menuDisabled : true,
			text : 'Дет.',
			itemId : 'kids',
			items : [{					
					getClass : function (v, meta, rec) {						
						if (rec.get('kids') > 0 ) {
							this.items[0].tooltip = 'Для детей';
							return 'ex-che';
						} else {
							this.items[0].tooltip = 'Для взрослых';
							return 'ex-unche';
						}
					}
				}
			]
			
		},
		{
			xtype : 'gridcolumn',			
			dataIndex : 'reason_name',
			text : 'Причина отмены'
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'description',
			text : 'Описание'
		}
	],
	dockedItems :[
	{
				xtype : 'eventtotal',
				dock : 'bottom'
			}
	]
});
