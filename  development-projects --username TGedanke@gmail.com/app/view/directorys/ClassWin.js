Ext.define('Munas.view.directorys.ClassWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.classwin',
	requires : ['Munas.view.directorys.ClassForm'],
	title : 'Категории',
	layout : 'fit',
	autoShow : true,
	height : 250,
	width : 400,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'classform'
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
