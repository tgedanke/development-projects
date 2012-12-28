Ext.define('Munas.view.main.HistGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.histgrid',	
	store : 'HistStore',
	columns : [{
			xtype : 'actioncolumn',
			width : 40,
			menuDisabled : true,
			text : 'Отм.',
			itemId : 'iscancel',
			items : [{					
					getClass : function (v, meta, rec) {						
						if (rec.get('canceled') > 0 ) {
							this.items[0].tooltip = 'Отменено';
							return 'date-delet';
						} else {
							this.items[0].tooltip = 'Изменено';
							return 'date-edit';
						}
					}
				}
			]
			
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'place_name',
			width : 150,
			text : 'Место проведения'
		}, {
			xtype : 'gridcolumn',
			text : 'Причина отмены',
			width : 150,
			dataIndex : 'reason_name'			
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'user_name',
			width : 150,
			text : 'Кто редактировал'
		}, {
			xtype : 'gridcolumn',
			text : 'Дата',
			width : 80,
			dataIndex : 'date_event'			
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'time_event',
			width : 50,			
			text : 'Время'
		}/*, {
			xtype : 'gridcolumn',
			flex : 1,			
			dataIndex : 'description',			
			text : 'Примечание'
		}*/
	]
});
