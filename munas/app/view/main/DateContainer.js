Ext.define('Munas.view.main.DateContainer', {
	extend : 'Ext.container.Container',
	alias : 'widget.datecontainer',
	requires : ['Munas.view.main.DateForm', 'Munas.view.main.HistGrid'],
	layout : 'border',
	items : [{
			xtype : 'dateform',
			region : 'north'
		},{
			xtype : 'histgrid',
			region : 'center'
		}
	]
});
