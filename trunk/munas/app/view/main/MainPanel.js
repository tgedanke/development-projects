Ext.define('Munas.view.main.MainPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.mainpanel',
	requires : ['Munas.view.main.AdmTool', 'Munas.view.directorys.DirectPanel', 'Munas.view.security.SecurPanel', 'Munas.view.main.EventContainer', 'Munas.view.reports.ReportGrid'],
	activeTab : 1,	
	margins : '5 5 5 5',
	items : [{
			xtype : 'directpanel',
			itemId: 'direct',
			title : 'Справочники',
			hidden : true
		}, {
			xtype : 'eventcontainer',
			itemId: 'event',
			title : 'Мероприятия'
		}, {
			xtype : 'securpanel',
			itemId: 'secur',
			hidden : true,
			title : 'Безопасность'
		}, {
			xtype : 'reportgrid',
			itemId: 'report',
			hidden : true,
			title : 'Отчеты'
		}
	],
	dockedItems : [{
			xtype : 'admtool',
			dock : 'top'
		}
	]
});
