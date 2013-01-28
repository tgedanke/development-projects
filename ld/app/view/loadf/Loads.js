Ext.define('LFile.view.loadf.Loads', {
	alias : 'widget.loads',
	extend : 'Ext.form.Panel',
	//layout : { 		type : 'fit'	},//уедет в центр по высоте
    bodyPadding : 10,
	height : 130,
	width : 260,
	renderTo: Ext.getBody(),
	items : [{
 				xtype: 'filefield',
				name: 'uploadFile',
				fieldLabel: 'файл',
				labelWidth: 150,
				msgTarget: 'side',
				allowBlank: false,
				//anchor: '100%',//растянуть
				buttonText: 'Выбрать...'
                
		}
	],
	    buttons: [{
        text : 'заргузка',
		action : 'submit',
		formBind : true
 }]

});
 
