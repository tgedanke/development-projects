Ext.define('Munas.view.directorys.ReasonWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.reasonwin',
	requires : ['Munas.view.directorys.ReasonForm'],
	title : 'Причина',
	layout : 'fit',
	autoShow : true,
	height : 130,
	width : 400,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'reasonform'
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
