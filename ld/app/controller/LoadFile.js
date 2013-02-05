Ext.define('LFile.controller.LoadFile', {
    extend: 'Ext.app.Controller',
	views: ['loadf.Loads'], 

    init: function() {
       this.control({
	   'loads button[action=submit]' : {
			click : this.doYaload
	   }
	 });
	},
	doYaload : function (button)
	{
	 var fform = button.up('form').form;//Ext.widget('loads').getForm();
                if (fform.isValid()) {
                        fform.submit({
                        url: 'data/upload.php',
                        waitMsg: 'Загрузка...',
                        success: function(fp, o){
						    //Ext.Msg.alert('загружено!', 'Файл ' +o.result.file +" загружен");
							/*o.result.dataurl in form.fileurl.value displayfield*/
							//Ext.Msg.alert(o.result.dataurl);
 							//Ext.form.DisplayField.setHtml(o.result.dataurl);
							fform.getComponent('itemNumber').setValue('!!!!!');
                       }
                    });
                }
	
	}

});

