Ext.define('LFile.view.loadf.Loads', {
	alias : 'widget.loads',
	extend : 'Ext.form.Panel',
	//layout : { 		type : 'fit'	},//����� � ����� �� ������
    bodyPadding : 10,
	height : 130,
	width : 260,
	renderTo: Ext.getBody(),
	items : [{
 				xtype: 'filefield',
				name: 'uploadFile',
				fieldLabel: '����',
				labelWidth: 150,
				msgTarget: 'side',
				allowBlank: false,
				//anchor: '100%',//���������
				buttonText: '�������...'
                
		}
	],
	    buttons: [{
        text : '��������',
		action : 'submit',
		formBind : true
 }]

});
 
