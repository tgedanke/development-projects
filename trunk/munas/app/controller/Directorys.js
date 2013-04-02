Ext.define('Munas.controller.Directorys', {
	extend : 'Ext.app.Controller',
	views : ['directorys.ContGrid', 'directorys.ContWin', 'directorys.ContForm', 'directorys.DirectPanel', 'directorys.ClassGrid', 'directorys.ClassWin', 'directorys.ClassForm', 'directorys.StateWin', 'directorys.StateForm', 'directorys.PlaceWin', 'directorys.PlaceForm', 'directorys.PlaceGrid', 'directorys.ReasonGrid', 'directorys.ReasonForm', 'directorys.AnsGrid', 'directorys.AnsWin', 'directorys.AnsForm', 'directorys.ReasonWin', 'directorys.AgeForm', 'directorys.AgeWin'],
	models : ['ContMod', 'StateMod', 'ClassMod', 'StreetMod', 'HouseMod', 'PlaceMod', 'ReasonMod', 'AnsMod'],
	stores : ['ContStore', 'StateStore', 'ClassStore', 'StreetStore', 'HouseStore', 'PlaceStore', 'ReasonStore', 'AnsStore', 'SecurStore', 'AgeStore'],
	init : function () {
		this.control({
			'admtool button[action=newcont]' : {
				click : this.newCont
			},
			'admtool button[action=newage]' : {
				click : this.newAge
			},
			'admtool button[action=newclass]' : {
				click : this.newClass
			},
			'admtool button[action=newstate]' : {
				click : this.newState
			},
			'admtool button[action=newplaces]' : {
				click : this.newPlace
			},
			'admtool button[action=newreason]' : {
				click : this.newReason
			},
			'admtool button[action=newans]' : {
				click : this.newAns
			},
			'contwin button[action=save]' : {
				click : this.saveContact
			},
			'statewin button[action=save]' : {
				click : this.saveState
			},
			'placewin button[action=save]' : {
				click : this.savePlace
			},
			'agewin button[action=save]' : {
				click : this.saveAge
			},
			'directpanel' : {
				tabchange : this.changeButton
			},
			'reasonwin button[action=save]' : {
				click : this.saveReason
			},
			'classwin button[action=save]' : {
				click : this.saveClass
			},
			'answin button[action=save]' : {
				click : this.saveAns
			},
			'reasongrid' : {
				itemdblclick : this.viewReason
			},
			'classgrid' : {
				itemdblclick : this.viewClass
			},
			'ansgrid' : {
				itemdblclick : this.viewAns
			},
			'agegrid' : {
				itemdblclick : this.viewAge
			},
			'stategrid' : {
				itemdblclick : this.viewState
			},
			'contgrid' : {
				itemdblclick : this.viewCont
			},
			'placegrid' : {
				itemdblclick : this.viewPlace
			},
			'stateform combobox[name=street_key]' : {
				change : this.changeStreet
			},
			'stateform combobox[name=house_key]' : {
				change : this.changeHouse
			},
			'contform textfield' : {
				change : this.changeText
			},
			'classform textfield' : {
				change : this.changeText
			},
			'stateform textfield' : {
				change : this.changeText
			},
			'placeform textfield' : {
				change : this.changeText
			},
			'reasonform textfield' : {
				change : this.changeText
			},
			'ageform textfield' : {
				change : this.changeText
			},
			'ansform textfield' : {
				change : this.changeText
			}
		});
	},
	secure : function (win) {
		var record = this.getSecurStoreStore().findRecord('key', '4');
		if (record.data.key_role == 1) {
			win.down('button[action=save]').hide();
		}
	},
	changeText : function (th, newValue, oldValue, Op) {
		if (th.xtype != 'timefield' && th.xtype != 'datefield') {
			if (th.xtype == 'combobox') {
				var tip = th.rawValue;
			} else {
				var tip = newValue;
			}
			Ext.tip.QuickTipManager.register({
				target : th.id,
				text : tip,
				width : tip.length * 6,
				dismissDelay : 10000
			});
		}
	},
	changeHouse : function (field, newValue, oldValue, eOp) {
		var val = field.up('stateform').down('combobox[name=street_key]').getValue();		
		if (val) {
			Ext.Ajax.request({
				url : 'data/data.php',
				method : 'POST',
				params : {
					dbAct : 'getStreetHouse',
					key_house : newValue,
					key_street : val
				},
				success : function (response) {
					var text = Ext.decode(response.responseText);
					if (text.success == true) {
						if (text.data) {
							field.up('stateform').down('textfield[name=key_street_house]').setValue(text.data[0].key);
						} else {}
						
					} else {
						console.log('2 ' + text.msg);
					}
				},
				failure : function (response) {
					console.log('Сервер недоступен! ' + response.statusText);
				}
			});
		}
	},
	changeStreet : function (field, newValue, oldValue, eOpts) {
		this.getHouseStoreStore().load({
			params : {
				key : newValue
			}
		});
	},
	viewCont : function (me, rec, item, index, e, eOpts) {
		var w = Ext.widget('contwin');
		this.secure(w);
		var f = w.down('contform');
		f.getForm().loadRecord(rec);
		f.down('textfield[name=type_modify]').setValue('U');
		w.show();
	},
	viewPlace : function (me, rec, item, index, e, eOpts) {
		var w = Ext.widget('placewin');
		this.secure(w);
		var f = w.down('placeform');
		f.getForm().loadRecord(rec);
		f.down('textfield[name=type_modify]').setValue('U');
		w.show();
	},
	viewAns : function (me, rec, item, index, e, eOpts) {
		var w = Ext.widget('answin');
		this.secure(w);
		var f = w.down('ansform');
		f.getForm().loadRecord(rec);
		f.down('textfield[name=type_modify]').setValue('U');
		w.show();
	},
	viewClass : function (me, rec, item, index, e, eOpts) {
		var w = Ext.widget('classwin');
		this.secure(w);
		var f = w.down('classform');
		f.getForm().loadRecord(rec);
		f.down('textfield[name=type_modify]').setValue('U');
		w.show();
	},
	viewState : function (me, rec, item, index, e, eOpts) {
		var w = Ext.widget('statewin');
		this.secure(w);
		var f = w.down('stateform');
		f.getForm().loadRecord(rec);
		f.down('textfield[name=type_modify]').setValue('U');
		w.show();
	},
	viewReason : function (me, rec, item, index, e, eOpts) {
		var w = Ext.widget('reasonwin');
		this.secure(w);
		var f = w.down('reasonform');
		f.getForm().loadRecord(rec);
		f.down('textfield[name=type_modify]').setValue('U');
		w.show();
	},
	viewAge : function (me, rec, item, index, e, eOpts) {
		var w = Ext.widget('agewin');
		this.secure(w);
		var f = w.down('ageform');
		f.getForm().loadRecord(rec);
		f.down('textfield[name=type_modify]').setValue('U');
		w.show();
	},
	changeButton : function (tabPanel, newCard, oldCard, eOpts) {
		var tool = tabPanel.up('mainpanel').down('admtool');
		var but = tool.down('button[itemId=dir]');
		switch (newCard.title) {
		case 'Контакты': {
				but.action = 'newcont';
				break;
			}
		case 'Учреждения': {
				but.action = 'newstate';
				break;
			}
		case 'Ответственные': {
				but.action = 'newans';
				break;
			}
		case 'Места мероприятий': {
				but.action = 'newplaces';
				break;
			}
		case 'Категории мероприятий': {
				but.action = 'newclass';
				break;
			}
		case 'Причины отмены': {
				but.action = 'newreason';
				break;
			}
		case 'Возрастные ограничения': {
				but.action = 'newage';
				break;
			}
		default: {
				but.action = 'newstate';
			}
		}
	},
	newReason : function (but) {
		var w = Ext.widget('reasonwin');
		w.show();
		var f = w.down('reasonform');
		f.down('textfield[name=type_modify]').setValue('I');
		f.down('textfield[name=key]').setValue(-1);
	},
	newAns : function (but) {
		var w = Ext.widget('answin');
		w.show();
		var f = w.down('ansform');
		f.down('textfield[name=type_modify]').setValue('I');
		f.down('textfield[name=key]').setValue(-1);
	},
	newAge : function (but) {
		var w = Ext.widget('agewin');
		w.show();
		var f = w.down('ageform');
		f.down('textfield[name=type_modify]').setValue('I');
		f.down('textfield[name=key]').setValue(-1);
	},
	newCont : function (but) {
		var w = Ext.widget('contwin');
		w.show();
		var f = w.down('contform');
		f.down('textfield[name=type_modify]').setValue('I');
		f.down('textfield[name=key]').setValue(-1);
	},
	newPlace : function (but) {
		var w = Ext.widget('placewin');
		w.show();
		var f = w.down('placeform');
		f.down('textfield[name=type_modify]').setValue('I');
		f.down('textfield[name=key]').setValue(-1);
	},
	newState : function (but) {
		var w = Ext.widget('statewin');
		w.show();
		var f = w.down('stateform');
		f.down('textfield[name=type_modify]').setValue('I');
		f.down('textfield[name=key]').setValue(-1);
	},
	newClass : function (but) {
		var w = Ext.widget('classwin');
		w.show();
		var f = w.down('classform');
		f.down('textfield[name=type_modify]').setValue('I');
		f.down('textfield[name=key]').setValue(-1);
	},
	saveClass : function (btn) {
		var me = this;
		var win = btn.up('classwin');
		var form = win.down('classform');
		if (form.getForm().isValid()) {
			form.submit({
				url : 'data/srv.php',
				params : {
					dbAct : 'setClass'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						form.reset();
						win.close();
						me.getClassStoreStore().load();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('не сохранено!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	saveAge : function (btn) {
		var me = this;
		var win = btn.up('agewin');
		var form = win.down('ageform');
		if (form.getForm().isValid()) {
			form.submit({
				url : 'data/srv.php',
				params : {
					dbAct : 'setAgeLimit'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						form.reset();
						win.close();
						me.getAgeStoreStore().load();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('не сохранено!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	saveAns : function (btn) {
		var me = this;
		var win = btn.up('answin');
		var form = win.down('ansform');
		if (form.getForm().isValid()) {
			form.submit({
				url : 'data/srv.php',
				params : {
					dbAct : 'setAns'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						form.reset();
						win.close();
						me.getAnsStoreStore().load();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('не сохранено!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	saveReason : function (btn) {
		var me = this;
		var win = btn.up('reasonwin');
		var form = win.down('reasonform');
		if (form.getForm().isValid()) {
			form.submit({
				url : 'data/srv.php',
				params : {
					dbAct : 'setReason'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						form.reset();
						win.close();
						me.getReasonStoreStore().load();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('не сохранено!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	saveContact : function (btn) {
		var me = this;
		var win = btn.up('contwin');
		var form = win.down('contform');
		if (form.getForm().isValid()) {
			form.submit({
				url : 'data/srv.php',
				params : {
					dbAct : 'setContacts'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						form.reset();
						win.close();
						me.getContStoreStore().load();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('не сохранено!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	saveState : function (btn) {
		var me = this;
		var win = btn.up('statewin');
		var form = win.down('stateform');
		if (form.getForm().isValid()) {
			form.submit({
				url : 'data/srv.php',
				params : {
					dbAct : 'setState'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						win.close();
						me.getStateStoreStore().load();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('не сохранено!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	},
	savePlace : function (btn) {
		var me = this;
		var win = btn.up('placewin');
		var form = win.down('placeform');
		if (form.getForm().isValid()) {
			form.submit({
				url : 'data/srv.php',
				params : {
					dbAct : 'setPlace'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						form.reset();
						win.close();
						me.getPlaceStoreStore().load();
					}
				},
				failure : function (form, action) {
					Ext.Msg.alert('не сохранено!', action.result.msg);
				}
			});
		} else {
			Ext.Msg.alert('Не все поля заполнены', 'Откорректируйте информацию')
		}
	}
});
