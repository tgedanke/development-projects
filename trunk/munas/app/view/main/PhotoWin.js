Ext.define('Munas.view.main.PhotoWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.photowin',
	requires : ['Munas.view.main.PhotoForm', 'Munas.view.main.PhotoGrid'],
	title : '',
	layout : 'border',
	height : 500,
	width : 500,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'photogrid',
				region : 'center'
			}, {
				xtype : 'photoform',
				region : 'south'
			}
		];
		this.buttons = [{
				text : 'Загрузить',
				action : 'load'
			}, 
			{
				text : 'Удалить',
				action : 'del'
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
