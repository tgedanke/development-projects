Ext.define('Munas.view.main.DateAddWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.dateaddwin',
	requires : ['Munas.view.main.DateAddForm'],
	title : 'Мероприятия',
	layout : 'fit',
	autoShow : true,
	height : 500,
	width : 790,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'dateaddform'
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
