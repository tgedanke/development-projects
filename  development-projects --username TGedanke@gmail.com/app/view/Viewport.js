Ext.define('Munas.view.Viewport', {
	extend : 'Ext.container.Viewport',
	layout : 'fit',
	alias : 'widget.munasviewport',
	requires : ['Ext.resizer.*', 'Ext.grid.column.*', 'Ext.form.*', 'Ext.layout.container.*', 'Ext.Toolbar.Spacer', 'Ext.ButtonGroup'], //for build
	items : [{
			xtype : 'loginformcontainer'
		}
	]
});
