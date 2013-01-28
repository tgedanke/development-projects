Ext.define('LFile.view.Viewport', {
	extend : 'Ext.container.Viewport',
	layout : 'fit',
	alias : 'widget.lfviewport',
	requires : [ 'Ext.form.*', 'Ext.ButtonGroup'], //for build
	items : [{
    width: 400,
 
			xtype : 'loads'
		}
	]
}
);
    