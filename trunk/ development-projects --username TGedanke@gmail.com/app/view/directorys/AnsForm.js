Ext.define('Munas.view.directorys.AnsForm', {
	alias : 'widget.ansform',
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
			name : 'name_answerable',
			width : 360,
			allowBlank : false,
			fieldLabel : 'ФИО ответственного*'
		}
	]
});
