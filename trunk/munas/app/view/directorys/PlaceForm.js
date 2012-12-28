Ext.define('Munas.view.directorys.PlaceForm', {
	alias : 'widget.placeform',
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
			xtype : 'combobox',
			name : 'key_state',
			fieldLabel : 'Учреждение*',
			width : 360,
			displayField : 'name',
			valueField : 'key',
			store : 'StateStore',
			allowBlank : false,
			forceSelection : true,
			//editable : false,
			queryMode : 'local'
		}
	]
});
