Ext.define('Munas.view.security.UserForm', {
	alias : 'widget.userform',
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
			name : 'user_name',
			width : 360,
			allowBlank : false,
			fieldLabel : 'ФИО*'
		}, {
			xtype : 'textfield',
			name : 'login',
			width : 360,
			allowBlank : false,
			fieldLabel : 'Логин*'
		}, {
			xtype : 'textfield',
			name : 'password',
			inputType : 'password',
			width : 360,
			allowBlank : false,
			fieldLabel : 'Пароль*'
		},{
			xtype : 'textfield',
			name : 'password2',
			width : 360,
			inputType : 'password',
			allowBlank : false,
			fieldLabel : 'Пароль еще раз*'
		}, {
			xtype : 'combobox',
			width : 360,
			displayField : 'name',
			valueField : 'key',
			store : 'StateStore',
			allowBlank : false,
			forceSelection : true,
			name : 'key_state',
			fieldLabel : 'Учреждение*'
		}, {
			xtype : 'checkboxfield',
			name : 'is_disable',
			inputValue : '1',
			fieldLabel : 'Блокирован'
		}
	]
});
