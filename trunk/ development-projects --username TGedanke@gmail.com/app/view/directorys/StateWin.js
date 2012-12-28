Ext.define('Munas.view.directorys.StateWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.statewin',
	requires : ['Munas.view.directorys.StateForm'],
	title : 'Учреждения',
	layout : 'fit',
	autoShow : true,
	height : 280,
	width : 400,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'stateform'
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
