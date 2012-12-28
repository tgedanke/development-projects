Ext.define('Munas.view.main.EventWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.eventwin',
	requires : ['Munas.view.main.EventForm'],
	title : 'Мероприятия',
	layout : 'fit',
	
	autoShow : true,
	height : 370,
	width : 750,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'eventform'
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
