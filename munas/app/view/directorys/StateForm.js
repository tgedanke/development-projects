Ext.define('Munas.view.directorys.StateForm', {
	alias : 'widget.stateform',
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
			name : 'key_street_house',
			hidden : true			
		},{
			xtype : 'textfield',
			name : 'name',
			allowBlank : false,
			width : 360,
			fieldLabel : 'Наименование*'
		}, {
			xtype : 'combobox',
			name : 'street_key',
			fieldLabel : 'Улица*',
			width : 360,
			displayField : 'street_name',
			valueField : 'key',
			store : 'StreetStore',
			allowBlank : false,
			forceSelection : true,
			//editable : false,
			queryMode : 'local'
		}, {
			xtype : 'combobox',
			name : 'house_key',
			width : 360,
			fieldLabel : 'Дом*',
			displayField : 'house_number',
			valueField : 'key',
			store : 'HouseStore',
			allowBlank : false,
			forceSelection : true,
			//editable : false,
			queryMode : 'local'
		}, {
			xtype : 'textarea',
			width : 360,
			name : 'description',
			fieldLabel : 'Описание'
		}
	]
});
