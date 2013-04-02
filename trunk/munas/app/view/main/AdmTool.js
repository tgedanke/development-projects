Ext.define('Munas.view.main.AdmTool', {
	extend : 'Ext.toolbar.Toolbar',
	alias : 'widget.admtool',
	//requires : [ 'Munas.view.main.NumYear'],
	items : [
		{
			tooltip : 'Новое мероприятие',
			iconCls : 'new-event',
			scale : 'large',
			//hidden : true,
			itemId: 'eve',
			action : 'newevent',
			xtype : 'button'
		},{
			tooltip : 'Даты проведения',
			iconCls : 'event-view',
			scale : 'large',
			//hidden : true,
			itemId: 'dat',
			action : 'eventdate',
			xtype : 'button'
		},{
			tooltip : 'Добавить даты проведения',
			iconCls : 'event-date',
			scale : 'large',
			//hidden : true,
			itemId: 'datad',
			action : 'dateadd',
			xtype : 'button'
		},{
			tooltip : 'Добавить картинки',
			iconCls : 'photo',
			scale : 'large',
			//hidden : true,
			itemId: 'photo',
			action : 'photo',
			xtype : 'button'
		},{
			tooltip : 'Удалить мероприятие',
			iconCls : 'event-del',
			scale : 'large',
			//hidden : true,
			itemId: 'del',
			action : 'del',
			xtype : 'button'
		},' ',' ',
		{			
			itemId: 'filter_event',
			emptyText: 'Поиск...',
			name : 'filteredit',
			enableKeyEvents : true,
			xtype : 'textfield'
		},{
			itemId: 'clear',
			tooltip : 'Очистить фильтр',
			iconCls : 'clear',
			action : 'clear',
			xtype : 'button'
		},
		{
			itemId: 'filter',
			tooltip : 'Применить фильтр',
			scale : 'large',
			iconCls : 'filter',
			action : 'filter',
			xtype : 'button'
		},
		{
			tooltip : 'Выгрузить отчет',
			iconCls : 'report',
			scale : 'large',
			hidden : true,
			itemId: 'report',
			action : 'report',
			xtype : 'button'
		},
		{
			tooltip : 'Новый пользователь',
			iconCls : 'new-user',
			scale : 'large',
			hidden : true,
			itemId: 'usr',
			action : 'newuser',
			xtype : 'button'
		},
		{
			tooltip : 'Новая запись',
			iconCls : 'new-record',
			scale : 'large',
			action : 'newstate',
			hidden : true,
			itemId: 'dir',
			xtype : 'button'
		},'->',
		{
			xtype: 'buttongroup',
			itemId : 'dategroup',
			defaults: { 
				margin : '5 10'
					},
			items:[
			{
			xtype: 'combomonth'			
			},
			{
			xtype: 'numyear'
			}
			]
		},' ',' ',' ',
		{
			xtype : 'label',
			text : 'UserName'
		},
		' ', ' ', ' ', {
			tooltip : 'Разлогиниться',
			iconCls : 'exit-user',
			scale : 'large',
			action : 'logout',
			xtype : 'button'
		}, ' '
	]
});
