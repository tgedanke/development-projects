Ext.define('Munas.view.security.SecurPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.securpanel',
	requires : ['Munas.view.security.UsersGrid', 'Munas.view.security.RolesGrid'],
	layout : 'border',
	closable : false,
	items : [{
			flex : 1,
			minHeight : 250,
			region : 'center',
			xtype : 'usersgrid'
		}, {
			flex : 1,
			split : true,
			region : 'south',
			xtype : 'rolesgrid'
		}
	]
});
