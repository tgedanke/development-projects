Ext.define('Munas.controller.DateAdd', {
	extend : 'Ext.app.Controller',
	views : ['main.DateAddWin', 'main.DateAddForm'],
	refs : [{
			ref : 'DateAddForm',
			selector : 'dateaddform'
		}
	],
	init : function () {
		this.control({
			'dateaddwin button[action=save]' : {
				click : this.saveDate
			},
			'dateaddform checkboxfield[name=all_day]' : {
				change : this.changeDay
			}
		});
	},
	changeDay : function (field, newValue, oldValue, eOpts) {
		var f = this.getDateAddForm();
		if (newValue == true) {
			f.down('fieldset[itemId=days]').setDisabled(true);
		} else {
			f.down('fieldset[itemId=days]').setDisabled(false);
		}
	},
	saveDate : function (btn) {
		var me = this;
		var win = btn.up('dateaddwin');
		var form = win.down('dateaddform');
		var form_data = form.getForm().getFields();
		var fd = form.getForm().getValues();
		var ds = form.getForm().findField('start_date').value;
		var de = form.getForm().findField('end_date').value;
		var resArray = new Array();
		if (ds && de) {
			if (fd.all_day == 1) {
				while (ds <= de) {
					Ext.Array.include(resArray, [Ext.Date.format(ds, 'd.m.Y'), fd.time]);
					ds = Ext.Date.add(ds, Ext.Date.DAY, +1);
				}
			} else {
				while (ds <= de) {
					for (var i = 0; i < 7; i++) {
						if (form.getForm().findField('day' + [i]).getValue() == true && form.getForm().findField('day' + [i]).boxLabel == Ext.Date.format(ds, 'D')) {
							Ext.Array.include(resArray, [Ext.Date.format(ds, 'd.m.Y'), fd.time]);
						}
					}
					ds = Ext.Date.add(ds, Ext.Date.DAY, +1);
				}
			}
		}
		for (var i = 0; i < form_data.length; i++) {
			if (form_data.items[i].name.substring(0, 4) == 'date' && form_data.items[i].value != null) {
				Ext.Array.include(resArray, [Ext.Date.format(form_data.items[i].value, 'd.m.Y'), Ext.Date.format(form_data.items[i + 1].value, 'H:i')]);
			}
		}
		if (!fd.place_name) {
			Ext.Msg.alert('Нет места!', 'Внесите место проведения мероприятия!');
			return;
		}
		if (resArray.length == 0) {
			Ext.Msg.alert('Нет даты!', 'Внесите даты мероприятия!');
			return;
		}
		for (var i = 0; i < resArray.length; i++) {
			Ext.Ajax.request({
				url : 'data/srv.php',
				params : {
					dbAct : 'setDate',
					key : -1,
					key_event : fd.key_event,
					key_place : fd.place_name,
					date_event : resArray[i][0],
					time_event : resArray[i][1],
					description : fd.description,
					type_modify : 'I'
				},
				success : function (response) {
					var text = Ext.decode(response.responseText);
					if (text.success == true) {
						win.close();
					} else {
						Ext.Msg.alert('не сохранено!', text.msg);
					}
				},
				failure : function (response) {
					Ext.Msg.alert('Сервер недоступен!', response.statusText);
				}
			});
		}
	}
});
