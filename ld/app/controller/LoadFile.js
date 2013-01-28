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
	 var form = button.up('form').form;//Ext.widget('loads').getForm();
                if (form.isValid()) {
                        form.submit({
                        url: 'data/upload.php',
                        waitMsg: 'Загрузка...',
                        success: function(fp, o){
                            Ext.Msg.alert('загружено!', 'Файл ' +o.result.file +" загружен");
                        }
                    });
                }
	
	}

});

