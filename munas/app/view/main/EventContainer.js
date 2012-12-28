Ext.define('Munas.view.main.EventContainer', {
	extend : 'Ext.container.Container',
	alias : 'widget.eventcontainer',
	requires : ['Munas.view.main.EventGrid', 'Munas.view.main.EventDateGrid'],
	layout : 'border',
	items : [{
			xtype : 'eventgrid',
			flex : 2,
			minHeight : 250,
			region : 'center'
		},{
			xtype : 'eventdategrid',
			flex : 1,
			split : true,
			region : 'south'
		}
	]
});
