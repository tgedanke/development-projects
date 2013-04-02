Ext.define('Munas.view.directorys.AgeForm', {
	alias : 'widget.ageform',
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
			width : 360,
			allowBlank : false,
			fieldLabel : 'Наименование*'
		}
	]
});