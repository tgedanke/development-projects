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
							fform.down('label[name=urlf]').setText( '<a href="data/downloadfile.php?fn=' + o.result.dataurl + '"   target="_blank">'+  o.result.file +'</a>',false);
							fform.getComponent('itemNumber').setValue('<a href="data/downloadfile.php?fn=' + o.result.dataurl + '"   target="_blank">'+  o.result.file +'</a>',false);
							fform.down('button[action=delete]').show();
							fform.down('button[action=submit]').hide();
							fform.down('filefield[name=uploadFile]').hide();
							
					   },/*изменения от 17 марта*/
					   failure : function (fp,o) {
					Ext.Msg.alert('ошибка загрузки!', o.result.res);
					}/*конец изменения от 17 марта*/
                    });
                }
	
	},
	delFile : function (button)
	{
	 var fform = button.up('form');
			Ext.Ajax.request(
			{
                url: 'data/upload.php',
				params : {orderNum : '7777', userID : 'webuser', act : 'del'},
                //waitMsg: 'Удаление...',
                success: function(fp){
			jData = Ext.decode(fp.responseText); 
				//console.log(jData);
				Ext.Msg.alert('Удалено!', 'Файл ' +jData.file +" удален");
				//console.log('22222');
				fform.down('label[name=urlf]').setText('',false);
				fform.getComponent('itemNumber').setValue('',false);
				fform.down('button[action=delete]').hide();
				fform.down('button[action=submit]').show();
				fform.down('filefield[name=uploadFile]').show();
			   },
			   failure : function (response) {
				Ext.Msg.alert('error!');
				}
            });
 	}

});

Ext.onReady(function(){
   //Ext.Msg.alert('хидены','призагрузке посмотреть');
   //var fform = this.getViewExForm().getForm();//getAdmTool().down('loads');
 	 //var fform = this.getComponent('loads');
	/* var fform = this.down('loads');
	 console.log(fform);
			Ext.Ajax.request(
			{
                url: 'data/upload.php',
				params : {orderNum : '7777', userID : 'webuser', act : 'onl'},
                //waitMsg: 'loading...',
                success: function(fp)
				{
				console.log('1111');
				jData = Ext.decode(fp.responseText); 
				console.log(jData);
				if (jData.delbtn=="y") 
					{
					fform.down('button[action=delete]').show();
					console.log('2222');
					}
				else {
					fform.down('button[action=delete]').hide();
					console.log('3333');
					}
				fform.down('label[name=urlf]').setText( '<a href="data/downloadfile.php?fn=' + jData.dataurl + '"   target="_blank">'+  o.result.file +'</a>',false);
				fform.getComponent('itemNumber').setValue('<a href="data/downloadfile.php?fn=' + jData.dataurl + '"   target="_blank">'+  o.result.file +'</a>',false);
				fform.down('button[action=submit]').hide();
				fform.down('filefield[name=uploadFile]').hide();
			    },
			    failure : function (response) {
					fform.down('label[name=urlf]').setText('',false);
					fform.getComponent('itemNumber').setValue('',false);
					fform.down('button[action=delete]').hide();
					fform.down('button[action=submit]').show();
					fform.down('filefield[name=uploadFile]').show();
					console.log('4444');
				}
            });*/
  
   
}); 