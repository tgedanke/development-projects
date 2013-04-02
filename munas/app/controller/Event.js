Ext.define('Munas.controller.Event', {
	extend : 'Ext.app.Controller',
	views : ['main.EventGrid', 'main.AdmTool', 'main.AddClassGrid', 'main.EventWin', 'main.EventForm'],
	models : ['EventMod', 'ClassEventMod', 'ClassMod'],
	stores : ['EventStore', 'ClassEventStore', 'ClassStore', 'SecurStore', 'EventDateStore'],
	refs : [{
			ref : 'EventForm',
			selector : 'eventform'
		}, {
			ref : 'EventGrid',
			selector : 'eventgrid'
		}
	],
	init : function () {
		this.control({
			'eventform button[action=addclass]' : {
				click : this.addClass
			},
			'eventform button[action=delclass]' : {
				click : this.delClass
			},
			'admtool button[action=newevent]' : {
				click : this.newEvent
			},
			'admtool button[action=del]' : {
				click : this.delEvent
			},
			'eventwin button[action=save]' : {
				click : this.saveEvent
			},
			'eventgrid > tableview' : {
				itemdblclick : this.previewEvent
			},
			'eventform textfield' : {
				change : this.changeText
			},
			'eventgrid' : {
				selectionchange : this.previewDate
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
	},
	previewEvent : function (me, rec, item, index, e, eOpts) {
		var w = Ext.widget('eventwin');
		this.secure(w);
		var f = w.down('eventform');
		f.getForm().loadRecord(rec);
		f.down('textfield[name=type_modify]').setValue('U');
		this.getClassEventStoreStore().removeAll();
		this.getClassEventStoreStore().load({
			params : {
				key_event : rec.data['key']
			}
		});
		w.show();
	},
	previewDate : function (gr, rec) {
		if (gr.isSelected(rec[0]) == true) {
			var key = rec[0].data['key'];
		} else {
			var key = null;
		}
		this.getEventDateStoreStore().load({
			params : {
				key_event : key
			}
		});
	},
	delEvent : function (btn) {
		var me = this;
		var sm = btn.up('mainpanel').down('eventgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			Ext.Ajax.request({
				url : 'data/srv.php',
				params : {
					dbAct : 'setEvent',
					key : sm.getSelection()[0].get('key'),
					type_modify : 'D'
				},
				success : function (response) {
					var text = Ext.decode(response.responseText);
					if (text.success == true) {
						me.getEventStoreStore().remove(sm.getSelection());
					} else {
						Ext.Msg.alert('Ошибка удаления!', text.msg);
					}
				},
				failure : function (response) {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			});
		}
	},
	newEvent : function (but) {
		var w = Ext.widget('eventwin');
		w.show();
		var f = w.down('eventform');
		f.down('textfield[name=type_modify]').setValue('I');
		f.down('textfield[name=key]').setValue(-1);
		this.getClassEventStoreStore().removeAll();
	},
	saveEvent : function (btn) {
		var me = this;
		var win = btn.up('eventwin');
		var formeve = win.down('eventform');
		var type_modify = formeve.down('textfield[name=type_modify]').getValue();
		if (formeve.getForm().isValid()) {
			formeve.submit({
				url : 'data/srv.php',
				params : {
					dbAct : 'setEvent'
				},
				submitEmptyText : false,
				success : function (form, action) {
					if (action.result.success == true) {
						if (type_modify == 'U') {
							var key = formeve.down('textfield[name=key]').getValue();
						} else if (type_modify == 'I') {
							var key = action.result.key;
						}
						Ext.Ajax.request({
							url : 'data/srv.php',
							params : {
								dbAct : 'delClassEvent',
								key : -1,
								key_event : key,
								type_modify : 'D'
							},
							success : function (response) {
								var text = Ext.decode(response.responseText);
								if (text.success == true) {}
								else {
									Ext.Msg.alert('не сохранено!', text.msg);
								}
							},
							failure : function (response) {
								Ext.Msg.alert('Сервер недоступен!', response.statusText);
							}
						});
						me.getClassEventStoreStore().each(function () {
							Ext.Ajax.request({
								url : 'data/srv.php',
								params : {
									dbAct : 'setClassEvent',
									key : -1,
									key_event : key,
									key_class : this.get('key'),
									type_modify : 'I'
								},
								success : function (response) {
									var text = Ext.decode(response.responseText);
									if (text.success == true) {}
									else {
										Ext.Msg.alert('не сохранено!', text.msg);
									}
								},
								failure : function (response) {
									Ext.Msg.alert('Сервер недоступен!', response.statusText);
								}
							});
						});
						me.getEventStoreStore().reload();
						form.reset();
						win.close();
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
	addClass : function (btn) {
		if (btn.up('eventform').down('textfield[name=type_modify]').getValue() == 'I' || btn.up('eventform').down('textfield[name=type_modify]').getValue() == 'U') {
			var val = btn.up('eventform').down('combobox[name=key_class]').getValue();
			if (val != null) {
				var rec = this.getClassStoreStore().findRecord('key', val);
				if (this.getClassEventStoreStore().findRecord('key', val)) {
					Ext.Msg.alert('Эта категория уже добавлена!', 'Выберите другую.');
				} else {
					this.getClassEventStoreStore().add(rec);
				}
			} else {
				Ext.Msg.alert('Нет категории!', 'Выберите категорию из списка.');
			}
		}
	},
	delClass : function (btn) {
		if (btn.up('eventform').down('textfield[name=type_modify]').getValue() == 'I' || btn.up('eventform').down('textfield[name=type_modify]').getValue() == 'U') {
			var sm = btn.up('eventform').down('addclassgrid').getSelectionModel();
			if (sm.getCount() > 0) {
				this.getClassEventStoreStore().remove(sm.getSelection());
			}
		}
	}
});
