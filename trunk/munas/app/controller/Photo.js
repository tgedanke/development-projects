Ext.define('Munas.controller.Photo', {
	extend : 'Ext.app.Controller',
	views : ['main.PhotoForm', 'main.PhotoWin', 'main.PhotoGrid'],
	stores : ['PhotoStore', 'EventStore'],
	refs : [{
			ref : 'PhotoForm',
			selector : 'photoform'
		}
	],
	init : function () {
		this.control({
			'photowin button[action=load]' : {
				click : this.saveFile
			},
			'photowin button[action=del]' : {
				click : this.delFile
			}
		});
	},
	delFile : function (but) {
		var me = this;
		var sm = but.up('photowin').down('photogrid').getSelectionModel();
		if (sm.getCount() > 0) {
			Ext.Ajax.request({
				url : 'data/srv.php',
				params : {
					dbAct : 'setPhoto',
					key : sm.getSelection()[0].get('key'),
					filename : sm.getSelection()[0].get('url_small_foto'),
					type_modify : 'D'
				},
				success : function (response) {
					var text = Ext.decode(response.responseText);
					if (text.success == true) {
						me.getEventStoreStore().reload();
						me.getPhotoStoreStore().remove(sm.getSelection());
					} else {
						Ext.Msg.alert('Ошибка удаления!', text.msg);
					}
				},
				failure : function (response) {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			});
		} else {
			Ext.Msg.alert('Не выбрана картинка!', 'Выделите картинку, которую хотите удалить')
		}
	},
	saveFile : function (but) {
		var me = this;
		var form = this.getPhotoForm().getForm();
		if (form.isValid()) {
			form.submit({
				url : 'data/photo-upload.php',
				params : {
					dbAct : 'setPhoto'
				},
				success : function (form, action) {
					form.findField('photo').reset();
					me.getEventStoreStore().reload();
					me.getPhotoStoreStore().reload();
				},
				failure : function (form, action) {
					Ext.Msg.alert('Картинка не сохранена', action.result.msg);
				}
			});
		}
	}
});
