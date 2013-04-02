Ext.define('Munas.controller.Security', {
	extend : 'Ext.app.Controller',
	views : ['security.SecurPanel', 'security.UsersGrid', 'security.RolesGrid', 'main.AdmTool', 'security.UserWin', 'security.UserForm'],
	models : ['UsersMod', 'RolesMod'],
	stores : ['UsersStore', 'RolesStore'],
	refs : [{
			ref : 'UsersGrid',
			selector : 'usersgrid'
		}
	],
	init : function () {
		this.control({
			'admtool button[action=newuser]' : {
				click : this.doNew
			},
			'rolesgrid actioncolumn[itemId=isredy]' : {
				item_click : this.setRedy
			},
			'usersgrid > tableview' : {
				itemdblclick : this.viewUser
			},
			'usersgrid' : {
				selectionchange : this.previewRoles
			},
			'userwin button[action=save]' : {
				click : this.saveUser
			}
		});
	},
	viewUser : function (me, rec, item, index, e, eOpts) {
		var w = Ext.widget('userwin');
		var f = w.down('userform');
		f.getForm().loadRecord(rec);
		f.down('textfield[name=type_modify]').setValue('U');
		w.show();
	},
	previewRoles : function (gr, mnf) {
		if (gr.isSelected(mnf[0]) == true) {
			var No = mnf[0].data['key'];
		} else {
			var No = null;
		}
		this.getRolesStoreStore().load({
			params : {
				key_user : No
			}
		});
	},
	doNew : function (but) {
		var w = Ext.widget('userwin');
		w.show();
		var f = w.down('userform');
		f.down('textfield[name=type_modify]').setValue('I');
		f.down('textfield[name=key]').setValue(-1);
	},
	setRedy : function (column, action, grid, rowIndex, colIndex, record, node) {
		var me = this;
		var sm = me.getUsersGrid().getSelectionModel();
		if (sm.getCount() > 0) {
			if (record.get('key_role') == 0) {
				record.set('key_role', 1);
				var type_modify = 'I';
			} else {
				record.set('key_role', 0);
				var type_modify = 'D';
			}
			Ext.Ajax.request({
				url : 'data/srv.php',
				params : {
					dbAct : 'setRole',
					key : -1,
					key_user : sm.getSelection()[0].get('key'),
					key_role : record.get('key'),
					type_modify : type_modify
				},
				success : function (response) {
					var text = Ext.decode(response.responseText);
					if (text.success == true) {}
					else {
						console.log('2 ' + text.msg);
					}
				},
				failure : function (response) {
					console.log('Сервер недоступен! ' + response.statusText);
				}
			});
		} else {
			Ext.Msg.alert('Не выбран пользователь!', 'Выделите пользователя, для которого хотите изменить права в системе.')
		}
	},
	saveUser : function (btn) {
		var me = this;
		var win = btn.up('userwin');
		var form = win.down('userform');
		var fd = form.getForm().getValues();
		if (fd.password == fd.password2) {
			if (form.getForm().isValid()) {
				form.submit({
					url : 'data/srv.php',
					params : {
						dbAct : 'setUser'
					},
					submitEmptyText : false,
					success : function (form, action) {
						if (action.result.success == true) {
							form.reset();
							win.close();
							me.getUsersStoreStore().load();
						}
					},
					failure : function (form, action) {
						Ext.Msg.alert('не сохранено!', action.result.msg);
					}
				});
			} else {
				Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию!')
			}
		} else {
			Ext.Msg.alert('Пароли несовпадают!', 'Введите пароль повторно!')
		}
	}
});
