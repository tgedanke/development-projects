Ext.define('LFile.controller.LoadFile', {
    extend: 'Ext.app.Controller',
	views: ['loadf.Loads'], 

    init: function() {
       this.control({
		'loads button[action=submit]' : {
			click : this.doYaload
	   },
		'loads button[action=delete]' : {
			click : this.delFile
		}
	 });
	},
	doYaload : function (button)
	{
	 var fform = button.up('form');
                if (fform.getForm().isValid()) {
                        fform.submit({
                        url: 'data/upload.php',
						params : {orderNum : '7777', userID : 'webuser', act : 'ins'},
                        waitMsg: 'Загрузка...',
                        success: function(fp, o){
						    Ext.Msg.alert('загружено!', 'Файл ' +o.result.file +" загружен");
							/*o.result.dataurl in form.fileurl.value displayfield*/
							//console.log(o.result.dataurl );
							fform.down('label[name=urlf]').setText( '<a href="data/downloadfile.php?fn=' + o.result.dataurl + '"   target="_blank">'+  o.result.file +'</a>',false);
							fform.getComponent('itemNumber').setValue('<a href="data/downloadfile.php?fn=' + o.result.dataurl + '"   target="_blank">'+  o.result.file +'</a>',false);
							fform.down('button[action=delete]').show();
							fform.down('button[action=submit]').hide();
							fform.down('filefield[name=uploadFile]').hide();
							
					   }
                    });
                }
	
	},
	delFile : function (button)
	{
	
	
	 var fform = button.up('form');
	 
                //if (fform.getForm().isValid()) 
				{
				console.log('11111');
                        fform.submit(
						//Ext.Ajax.request(
						{
                        url: 'data/upload.php',
						params : {orderNum : '7777', userID : 'webuser', act : 'del'},
                        waitMsg: 'Удаление...',
                        success: function(fp, o){
						console.log('22222');
						    Ext.Msg.alert('Удалено!', 'Файл ' +o.result.file +" удален");
							
							console.log(o.result.file );
							fform.down('label[name=urlf]').setText('',false);
							fform.getComponent('itemNumber').setValue('',false);
							fform.down('button[action=delete]').hide();
							fform.down('button[action=submit]').show();
							fform.down('filefield[name=uploadFile]').show();
							
					   }
                    });
                }
	
	


	}

});

Ext.onReady(function(){
   Ext.Msg.alert('хидены','призагрузке посмотреть');
}); 