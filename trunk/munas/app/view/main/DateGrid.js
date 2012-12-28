Ext.define('Munas.view.main.DateGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.dategrid',
	//requires : ['FPAgent.view.orders.OrdTool'],
	store : 'DateStore',
	columns : [{
			xtype : 'gridcolumn',
			hidden : true,
			dataIndex : 'key'			
		}, {
			xtype : 'datecolumn',
			dataIndex : 'date_event',
			format:'d.m.Y',
			text : 'Дата'
		}, {
			xtype : 'datecolumn',
			dataIndex : 'time_event',
			format:'H:i',
			text : 'Время'
		}, {
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
					},
					handler : function (grid, rowIndex, colIndex, node, e, record, rowNode) {
						var action = 'set_action';
						this.fireEvent('item_click', this, action, grid, rowIndex, colIndex, record, node);
					}
				}
			]
			
		}
	]
});
