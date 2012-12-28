Ext.define('Munas.view.main.EventDateGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.eventdategrid',
	
	store : 'EventDateStore',
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
			
		}, {
			xtype : 'gridcolumn',
			dataIndex : 'place_name',
			width : 200,
			text : 'Место'
		}, {
			xtype : 'gridcolumn',
			width : 200,
			dataIndex : 'reason_name',			
			text : 'Причина отмены'
		}, {
			xtype : 'gridcolumn',
			dataIndex : 'description',
			flex : 1,
			text : 'Описание'
		}
	]
});
