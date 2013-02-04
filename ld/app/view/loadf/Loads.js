Ext.define('LFile.view.loadf.Loads', {
	alias : 'widget.loads',
	extend : 'Ext.form.Panel',
	//layout : { 		type : 'fit'	},//будет в центре по гвертикали
    bodyPadding : 10,
//	height : 130,
//	width : 260,

	items : [{
 				xtype: 'filefield',
				name: 'uploadFile',
				fieldLabel: 'файл',
				labelWidth: 150,
				msgTarget: 'side',
				allowBlank: false,
				//anchor: '100%',//растянет
				buttonText: 'выбрать...'
                
		},
		{
			xtype : 'label',
			itemId: 'fileurl',
			//text : ''
			html : '...'
		}

	],
	    buttons: [{
        text : 'сохранить',
		action : 'submit',
		formBind : true
 }]

});
 
