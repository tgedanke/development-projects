Ext.define('Munas.view.directorys.ClassForm', {
	alias : 'widget.classform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			name : 'key',
			hidden : true
		}, {
			xtype : 'textfield',
			name : 'type_modify',
			hidden : true			
		}, {
			xtype : 'textfield',
			name : 'name',
			allowBlank : false,
			width : 360,
			fieldLabel : 'Наименование*'
		}, {
			xtype : 'textarea',
			width : 360,
			name : 'description',
			fieldLabel : 'Описание'
		}
	]
});
