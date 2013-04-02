Ext.define('Munas.view.main.EventForm', {
	alias : 'widget.eventform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'hbox',
		defaultMargins : '0 3'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'fieldset',
			layout : {
				type : 'vbox'
			},
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
					xtype : 'combobox',
					displayField : 'name',
					width : 360,
					valueField : 'key',
					store : 'StateStore',
					allowBlank : false,
					queryMode : 'local',
					forceSelection : true,
					name : 'key_cultural_state',
					fieldLabel : 'Учреждение*'
				}, {
					xtype : 'combobox',
					displayField : 'name_answerable',
					width : 360,
					valueField : 'key',
					store : 'AnsStore',
					allowBlank : false,
					forceSelection : true,
					queryMode : 'local',
					name : 'key_answerables',
					fieldLabel : 'Ответственный*'
				}, {
					xtype : 'textfield',
					width : 360,
					name : 'duration',
					fieldLabel : 'Длительность'
				}, {
					xtype : 'textfield',
					name : 'price_tickets',
					width : 360,
					fieldLabel : 'Цена билета'
				}, {
					xtype : 'checkboxfield',
					inputValue : '1',
					name : 'kids',
					fieldLabel : 'Детям'
				}, {
					xtype : 'combobox',
					//disabled : true,
					width : 360,
					name : 'key_age_limit',
					displayField : 'name',
					valueField : 'key',
					queryMode : 'local',
					store : 'AgeStore',
					//allowBlank : false,
					forceSelection : true,
					fieldLabel : 'Возраст'
				},{
					xtype : 'checkboxfield',
					inputValue : '1',
					name : 'canceled',
					fieldLabel : 'Отменено'
				}, {
					xtype : 'combobox',
					disabled : true,
					width : 360,
					name : 'key_reason_cancel',
					displayField : 'name',
					valueField : 'key',
					queryMode : 'local',
					store : 'ReasonStore',
					allowBlank : false,
					forceSelection : true,
					fieldLabel : 'Причина отмены'
				}, {
					xtype : 'textarea',
					width : 360,
					height : 75,
					name : 'description',
					fieldLabel : 'Описание'
				}
			]
		}, {
			xtype : 'fieldset',
			layout : {
				type : 'vbox',
				defaultMargins : '5 0'
			},
			items : [{
					xtype : 'combobox',
					labelAlign : 'top',
					name : 'key_class',
					width : 300,
					displayField : 'name',
					valueField : 'key',
					store : 'ClassStore',
					isFormField : false,
					forceSelection : true,
					queryMode : 'local',
					fieldLabel : 'Категории'
				}, {
					xtype : 'fieldset',
					margin : 0,
					border : 0,
					layout : {
						type : 'hbox',
						defaultMargins : '0 5'
					},
					items : [{
							xtype : 'button',
							action : 'addclass',
							text : 'Добавить'
						}, {
							xtype : 'button',
							action : 'delclass',
							text : 'Удалить'
						}
					]
				}, {
					xtype : 'addclassgrid',
					width : 300,
					height : 196
				}
			]
		}
	]
});
