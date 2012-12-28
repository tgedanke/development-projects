Ext.define('Munas.view.login.Loginform', {
	extend : 'Ext.form.Panel',
	alias : 'widget.loginform',
	title : 'Вход в АИС МУНАС',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 12,
	height : 130,
	width : 260,
	items : [{
			xtype : 'textfield',
			width : 230,
			name : 'user',
			fieldLabel : 'Имя',
			enableKeyEvents : true,
			allowBlank : false
		}, {
			xtype : 'textfield',
			name : 'password',
			enableKeyEvents : true,
			width : 230,
			fieldLabel : 'Пароль',
			inputType : 'password',
			allowBlank : false
		}
	],
	buttons : [{
			text : 'Вход',
			action : 'login',
			formBind : true
		}
	]
});
