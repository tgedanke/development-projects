Ext.define('Munas.view.directorys.AnsWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.answin',
	requires : ['Munas.view.directorys.AnsForm'],
	title : 'Ответственный',
	layout : 'fit',
	autoShow : true,
	height : 120,
	width : 400,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'ansform'
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
