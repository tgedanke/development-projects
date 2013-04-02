Ext.define('Munas.view.directorys.AgeWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.agewin',
	requires : ['Munas.view.directorys.AgeForm'],
	title : 'Причина',
	layout : 'fit',
	autoShow : true,
	height : 130,
	width : 400,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'ageform'
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
