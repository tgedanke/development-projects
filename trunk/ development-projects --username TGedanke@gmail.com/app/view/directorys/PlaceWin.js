Ext.define('Munas.view.directorys.PlaceWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.placewin',
	requires : ['Munas.view.directorys.PlaceForm'],
	title : 'Места',
	layout : 'fit',
	autoShow : true,
	height : 150,
	width : 400,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'placeform'
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
