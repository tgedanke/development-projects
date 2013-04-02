Ext.define('Munas.controller.Loginform', {
	extend : 'Ext.app.Controller',
	views : ['login.Loginform', 'main.MainPanel', 'login.Loginformcontainer', 'Viewport', 'main.AdmTool'],
	stores : ['SecurStore', 'EventStore', 'UsersStore', 'ContStore', 'StateStore', 'ClassStore', 'StreetStore', 'ReasonStore', 'AnsStore', 'AgeStore'],
	models : ['RolesMod'],
	refs : [{
			ref : 'MainPanel',
			selector : 'mainpanel'
		}, {
			ref : 'AdmTool',
			selector : 'admtool'
		}
	],
	init : function () {
		this.control({
			'loginform button[action=login]' : {
				click : this.doLogin
			},
			'mainpanel button[action=logout]' : {
				click : this.doLogout
			},
			'loginform textfield' : {
				keypress : this.pressEnter
			}
		});
		this.getSecurStoreStore().on({
			scope : this,
			load : this.checkSecur
		});
	},
	pressEnter : function (fild, e) {
		var keyCode = e.getKey();
		if (keyCode == 13) {
			this.doLogin(fild.up('loginform').down('button[action=login]'));
		}
	},
	checkSecur : function (store, records, success) {
		this.getAnsStoreStore().load();
		this.getReasonStoreStore().load();
		this.getAgeStoreStore().load();
		this.getStreetStoreStore().load();
		this.getClassStoreStore().load();
		this.getStateStoreStore().load();
		this.getContStoreStore().load();
		this.getEventStoreStore().load();
		if (records[0].data.key_role == 0) {
			if (records[4].data.key_role == 1) {
				this.getMainPanel().child('#direct').tab.show();
				this.getMainPanel().child('#report').tab.show();
				this.getAdmTool().down('button[itemId=eve]').setVisible(false);
				this.getAdmTool().down('button[itemId=datad]').setVisible(false);
				this.getAdmTool().down('button[itemId=del]').setVisible(false);
			} else {
				if (records[2].data.key_role == 1) {
					this.getMainPanel().child('#direct').tab.show();
				}
				if (records[1].data.key_role == 1) {
					this.getMainPanel().child('#secur').tab.show();
					this.getUsersStoreStore().load();
				}
				if (records[3].data.key_role == 1) {
					this.getMainPanel().child('#report').tab.show();
				}
			}
		} else {
			this.getMainPanel().child('#direct').tab.show();
			this.getMainPanel().child('#secur').tab.show();
			this.getUsersStoreStore().load();
			this.getMainPanel().child('#report').tab.show();
		}
	},
	loadAdmPan : function () {
		var me = this;
		Ext.Ajax.request({
			url : 'data/data.php',
			method : 'POST',
			params : {
				dbAct : 'GetAgents'
			},
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {}
				else {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			},
			failure : function (response) {
				Ext.Msg.alert('Сервер недоступен!', response.statusText);
			}
		});
	},
	onLaunch : function () {
		var me = this;
		Ext.Ajax.request({
			url : 'data/launch.php',
			method : 'POST',
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {
					var aviewport = Ext.widget('munasviewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('mainpanel'));
					if (text.msg == '0') {}
					aviewport.down('mainpanel').down('label').setText(text.username);
					me.getSecurStoreStore().load({
						params : {
							key_user : text.msg
						}
					});
				} else {
					var aviewport = Ext.widget('munasviewport');
				}
			},
			failure : function (response) {
				Ext.Msg.alert('Сервер недоступен!', response.statusText);
			}
		});
	},
	doLogin : function (button) {
		var me = this;
		var form = button.up('form').form;
		if (form.isValid()) {
			form.submit({
				url : 'data/login.php',
				scope : this,
				success : function (form, action) {
					var aviewport = button.up('viewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('mainpanel'));
					if (action.result.msg == '0') {}
					aviewport.down('mainpanel').down('label').setText(action.result.username);
					me.getSecurStoreStore().load({
						params : {
							key_user : action.result.msg
						}
					});
				},
				failure : function (form, action) {
					Ext.Msg.alert('Ошибка', action.result.msg);
				}
			});
		};
	},
	doLogout : function (button) {
		var me = this;
		Ext.Ajax.request({
			url : 'data/logout.php',
			method : 'POST',
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {
					var aviewport = button.up('viewport');
					aviewport.removeAll(true);
					aviewport.add(Ext.widget('loginformcontainer'));
				} else {
					Ext.Msg.alert('Ошибка!', 'Обновите страницу');
				}
			},
			failure : function (response) {
				Ext.Msg.alert('Сервер недоступен!', response.statusText);
			}
		});
	}
});
