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
						    Ext.Msg.alert('загружено!', 'Файл ' +o.result.file +" загружен");
							/*o.result.dataurl in form.fileurl.text*/
							//Ext.Msg.alert(o.result.dataurl);
 							 button.up('form').down('label[itemId=fileurl]').setHtml(o.result.dataurl);
                       }
                    });
                }
	
	}/*,
	setUrl : function (furl)
	{
		Ext.widget('loads').getForm().down('label[itemId=fileurl]').setHtml(furl);
	}*/	

});

