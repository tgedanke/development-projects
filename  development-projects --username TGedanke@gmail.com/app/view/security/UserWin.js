Ext.define('Munas.view.security.UserWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.userwin',
	requires : ['Munas.view.security.UserForm'],
	title : 'Пользователь',
	layout : 'fit',
	autoShow : true,
	height : 290,
	width : 400,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'userform'
			}
		];
		this.buttons = [{
			text : 'Сохранить',
			action : 'save'
			}, 
			{
				text : 'Закрыть',
				scope : this,
				handler : this.close
			}
		];
		this.callParent(arguments);
	}
});
