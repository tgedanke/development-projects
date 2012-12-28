Ext.define('Munas.view.main.DateAddForm', {
	alias : 'widget.dateaddform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'vbox'
	},
	bodyPadding : 10,
	items : [{
			xtype : 'textfield',
			name : 'key_event',
			hidden : true
		}, {
			xtype : 'fieldset',
			layout : {
				type : 'hbox',
				defaultMargins : '0 10'
			},
			items : [{
					xtype : 'combobox',
					width : 310,
					name : 'place_name',
					fieldLabel : 'Место*',
					displayField : 'name',
					valueField : 'key',
					store : 'PlaceStore',
					allowBlank : false,
					queryMode : 'local',
					forceSelection : true
				}, {
					xtype : 'textarea',
					width : 380,
					height : 50,
					name : 'description',
					fieldLabel : 'Описание'
				}
			]
		}, {
			xtype : 'fieldset',
			layout : {
				type : 'hbox',
				align : 'stretch',
				defaultMargins : '0 5'
			},
			items : [{
					xtype : 'datefield',
					name : 'start_date',
					width : 200,
					fieldLabel : 'Начало периода'
				}, {
					xtype : 'datefield',
					name : 'end_date',
					width : 200,
					fieldLabel : 'Конец периода'
				}, {
					xtype : 'timefield',
					name : 'time',
					width : 200,
					format : 'H:i',
					fieldLabel : 'Время начала'
				}, {
					xtype : 'checkbox',
					name : 'all_day',
					inputValue : '1',
					boxLabel : 'Каждый день'
				}
			]
		}, {
			xtype : 'fieldset',
			itemId : 'days',
			layout : {
				type : 'hbox',
				align : 'stretch',
				defaultMargins : '5 35'
			},
			items : [{
					xtype : 'checkbox',
					name : 'day0',
					inputValue : '1',
					boxLabel : 'Пон'
				}, {
					xtype : 'checkbox',
					name : 'day1',
					inputValue : '1',
					boxLabel : 'Вто'
				}, {
					xtype : 'checkbox',
					name : 'day2',
					inputValue : '1',
					boxLabel : 'Сре'
				}, {
					xtype : 'checkbox',
					name : 'day3',
					inputValue : '1',
					boxLabel : 'Чет'
				}, {
					xtype : 'checkbox',
					name : 'day4',
					inputValue : '1',
					boxLabel : 'Пят'
				}, {
					xtype : 'checkbox',
					name : 'day5',
					inputValue : '1',
					boxLabel : 'Суб'
				}, {
					xtype : 'checkbox',
					name : 'day6',
					inputValue : '1',
					boxLabel : 'Вос'
				}
			]
		}, {
			xtype : 'fieldset',
			layout : {
				type : 'hbox',
				align : 'stretch',
				defaultMargins : '10 30'
			},
			items : [{
					xtype : 'fieldset',
					layout : {
						type : 'vbox',
						defaultMargins : '5 16'
					},
					items : [{
							xtype : 'datefield',
							name : 'date1',
							fieldLabel : 'Дата 1',
							format : 'd.m.Y'
						}, {
							xtype : 'timefield',
							fieldLabel : 'Время 1',
							name : 'time1',
							format : 'H:i'
						}, {
							xtype : 'datefield',
							name : 'date2',
							fieldLabel : 'Дата 2',
							format : 'd.m.Y'
						}, {
							xtype : 'timefield',
							fieldLabel : 'Время 2',
							name : 'time2',
							format : 'H:i'
						}
					]
				}, {
					xtype : 'fieldset',
					layout : {
						type : 'vbox',
						defaultMargins : '5 16'
					},
					items : [{
							xtype : 'datefield',
							name : 'date1',
							fieldLabel : 'Дата 3',
							format : 'd.m.Y'
						}, {
							xtype : 'timefield',
							fieldLabel : 'Время 3',
							name : 'time1',
							format : 'H:i'
						}, {
							xtype : 'datefield',
							name : 'date2',
							fieldLabel : 'Дата 4',
							format : 'd.m.Y'
						}, {
							xtype : 'timefield',
							fieldLabel : 'Время 4',
							name : 'time2',
							format : 'H:i'
						}
					]
				}
			]
		}
	]
});
