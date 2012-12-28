Ext.define('Munas.view.main.DateWin', {
	extend : 'Ext.Window',
	extend : 'Ext.window.Window',
	alias : 'widget.datewin',
	requires : ['Munas.view.main.DateForm', 'Munas.view.main.DateGrid', 'Munas.view.main.DateContainer'],
	title : '',
	layout : 'border',
	
	height : 500,
	width : 867,
	resizable : false,
	modal : true,
	initComponent : function () {
		this.items = [{
				xtype : 'datecontainer',
				region : 'center'
			},{
				xtype : 'dategrid',
				region : 'west'
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
