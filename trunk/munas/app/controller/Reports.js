Ext.define('Munas.controller.Reports', {
	extend : 'Ext.app.Controller',
	views : ['reports.ReportGrid', 'main.AdmTool', 'main.ComboMonth', 'main.NumYear'],
	models : ['ReportMod'],
	stores : ['ReportStore', 'aMonths'],
	refs : [{
			ref : 'AdmTool',
			selector : 'admtool'
		}
	],
	init : function () {
		this.control({
			'admtool button[action=report]' : {
				click : this.addReport
			}
		});
	},
	addReport : function (but) {
		var sm = but.up('mainpanel').down('reportgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			var tool = this.getAdmTool();
			var y = tool.down('numyear').value;
			var m = tool.down('combomonth').value;
			window.location.href = 'data/report_' + sm.getSelection()[0].get('key') + '.php?dbAct=getReport&date_start=01.' + m + '.' + y;
		} else {
			Ext.Msg.alert('Не выбран отчет!', 'Выделите отчет!')
		}
	}
});
