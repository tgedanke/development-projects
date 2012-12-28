Ext.define('Munas.view.login.Loginformcontainer', {
	extend : 'Ext.container.Container',
	alias : 'widget.loginformcontainer',
	requires : ['Munas.view.login.Loginform'],
	layout : {
		type : 'vbox',
		align : 'center',
		pack : 'center'
	},
	items : [{
			xtype : 'loginform'
		}
	]
});
