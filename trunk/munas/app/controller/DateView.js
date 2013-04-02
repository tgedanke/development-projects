Ext.define('Munas.controller.DateView', {
	extend : 'Ext.app.Controller',
	views : ['main.DateWin', 'main.DateForm', 'main.DateGrid', 'main.HistGrid'],
	models : ['HistMod'],
	stores : ['DateStore', 'HistStore', 'EventDateStore'],
	refs : [{
			ref : 'DateForm',
			selector : 'dateform'
		}, {
			ref : 'DateGrid',
			selector : 'dategrid'
		}, {
			ref : 'DateWin',
			selector : 'datewin'
		}
	],
	init : function () {
		this.control({
			'dategrid' : {
				selectionchange : this.previewDate
			},
			'datewin button[action=save]' : {
				click : this.saveDate
			},
			'dateform checkboxfield[name=canceled]' : {
				change : this.changeCansel
			},
			'dateform textfield' : {
				change : this.changeText
			}
		});
		this.getDateStoreStore().on({
			scope : this,
			load : this.isDate
		});
	},
	changeCansel : function (field, newValue, oldValue, eOpts) {
		var f = this.getDateForm();
		if (newValue == true) {
			f.down('combobox[name=key_reason_cancel]').setDisabled(false);
		} else {
			f.down('combobox[name=key_reason_cancel]').setDisabled(true);
			f.down('combobox[name=key_reason_cancel]').setValue(null);
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
	isDate : function (store, records, success) {
		if (store.getCount() == 0) {
			this.getDateWin().close();
			Ext.Msg.alert('Нет дат мероприятий!', 'Введите даты мероприятий!');
		} else {
			this.getDateWin().show();
		}
	},
	previewDate : function (gr, rec) {
		if (gr.isSelected(rec[0]) == true) {
			this.getDateForm().getForm().loadRecord(rec[0]);
			this.getHistStoreStore().load({
				params : {
					key_event : rec[0].data['key']
				}
			});
		}
	},
	saveDate : function (btn) {
		var me = this;
		var win = btn.up('datewin');
		var form = win.down('dateform');
		var fd = form.getForm().getValues();
		var sel = me.getDateGrid().getSelectionModel().getCurrentPosition();
		Ext.Ajax.request({
			url : 'data/srv.php',
			params : {
				dbAct : 'setDate',
				key : fd.key,
				key_event : fd.key_event,
				key_place : fd.key_place,
				date_event : fd.date_event,
				time_event : fd.time_event,
				description : fd.description,
				key_reason_cancel : fd.key_reason_cancel,
				canceled : fd.canceled,
				type_modify : 'U'
			},
			success : function (response) {
				var text = Ext.decode(response.responseText);
				if (text.success == true) {
					var rec_date = me.getDateStoreStore().findRecord('key', fd.key);
					rec_date.set('key_event', fd.key_event);
					rec_date.set('key_place', fd.key_place);
					rec_date.set('date_event', fd.date_event);
					rec_date.set('time_event', fd.time_event);
					rec_date.set('description', fd.description);
					rec_date.set('key_reason_cancel', fd.key_reason_cancel);
					rec_date.set('canceled', fd.canceled);
					me.getHistStoreStore().reload();
					me.getDateGrid().getSelectionModel().deselect(sel.row);
					me.getDateGrid().getSelectionModel().select(sel.row);
					me.getEventDateStoreStore().reload();
				} else {
					Ext.Msg.alert('Не сохранено!', text.msg);
				}
			},
			failure : function (response) {
				Ext.Msg.alert('Сервер недоступен! ', response.statusText);
			}
		});
	}
});
