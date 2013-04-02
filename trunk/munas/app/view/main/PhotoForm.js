Ext.define('Munas.view.main.PhotoForm', {
	alias : 'widget.photoform',
	extend : 'Ext.form.Panel',
	layout : {
		type : 'fit'
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
			name : 'key_event',
			hidden : true
		}, {
			xtype : 'filefield',
			name : 'photo',
			fieldLabel : 'Файл <span class="gray">(jpg, jpeg; 1 MB макс.)</span>',
			labelWidth : 160,
			msgTarget : 'side',
			allowBlank : false,
			anchor : '100%',			
			buttonText : 'Выберите...'
		}
	]
});
