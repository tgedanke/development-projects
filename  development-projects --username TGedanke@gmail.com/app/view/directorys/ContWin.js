Ext.define('Munas.view.directorys.ContWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.contwin',
	requires : ['Munas.view.directorys.ContForm'],
	title : 'Контакт',
	layout : 'fit',
	autoShow : true,
	height : 340,
	width : 400,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'contform'
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
