Ext.define('Munas.view.directorys.ContForm', {
	alias : 'widget.contform',
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
			name : 'owner_name',
			allowBlank : false,
			width : 360,
			fieldLabel : 'ФИО*'
		}, {
			xtype : 'combobox',
			displayField : 'name',
			width : 360,
			valueField : 'key',
			store : 'StateStore',
			allowBlank : false,
			forceSelection : true,
			name : 'key_state',
			fieldLabel : 'Учреждение*'
		}, {
			xtype : 'textfield',
			name : 'address',
			width : 360,
			allowBlank : false,
			fieldLabel : 'Адрес*'
		}, {
			xtype : 'textfield',
			name : 'phone',
			allowBlank : false,
			width : 360,
			fieldLabel : 'Телефон*'
		}, {
			xtype : 'textfield',
			name : 'email',
			width : 360,
			fieldLabel : 'Почта'
		}, {
			xtype : 'textfield',
			name : 'appointment',
			width : 360,
			fieldLabel : 'Должность'
		}, {
			xtype : 'textarea',
			name : 'description',
			width : 360,
			fieldLabel : 'Описание'
		}
	]
});
