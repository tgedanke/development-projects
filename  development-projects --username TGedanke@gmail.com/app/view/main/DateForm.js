Ext.define('Munas.view.main.DateForm', {
	alias : 'widget.dateform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'hbox',
		defaultMargins :'5 5'
	},
	bodyPadding : 20,
	items : [{
		xtype:'fieldset',
		border: 0,
		layout: {
						type: 'vbox'//,
						//align: 'stretch',
						
					},
		items : [
		{
			xtype : 'textfield',
			name : 'key',
			hidden : true			
		}, {
			xtype : 'textfield',
			name : 'key_event',
			hidden : true			
		}, {
					xtype : 'combobox',
					name : 'key_place',
					fieldLabel : 'Наименование места*',					
					displayField : 'name',
					valueField : 'key',
					store : 'PlaceStore',
					queryMode : 'local',
					allowBlank : false,
					forceSelection : true
					
		}, {
			xtype : 'textarea',
			name : 'description',
			fieldLabel : 'Описание'
		}]
		}, 
		{
		xtype:'fieldset',
		border: 0,
		layout: {
						type: 'vbox',
						//align: 'stretch',
						defaultMargins :'2 0'
					},
		items : [
		{
			xtype : 'datefield',
			name : 'date_event',
			allowBlank : false,
			format : 'd.m.Y',
			fieldLabel : 'Дата*'
		}, {
			xtype : 'timefield',
			name : 'time_event',
			allowBlank : false,
			format : 'H:i',
			fieldLabel : 'Время*'
		}, {
			xtype : 'checkboxfield',
			name : 'canceled',
			inputValue : '1',
			fieldLabel : 'Отменено'
		}, {
			xtype : 'combobox',
			disabled : true,
			name : 'key_reason_cancel',
			displayField : 'name',
			valueField : 'key',
			store : 'ReasonStore',
			allowBlank : false,
			forceSelection : true,			
			fieldLabel : 'Причина отмены'
		}]
		}
	]
});
