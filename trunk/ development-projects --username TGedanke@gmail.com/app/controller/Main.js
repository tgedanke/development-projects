Ext.define('Munas.controller.Main', {
	extend : 'Ext.app.Controller',
	views : ['main.AdmTool', 
	'main.MainPanel', 
	'main.EventGrid', 
	'main.EventWin', 
	'main.EventForm', 
	'main.DateWin', 
	'main.DateAddWin', 
	'main.DateAddForm', 
	'main.ComboMonth', 
	'main.NumYear', 
	'main.EventDateGrid',
	'main.AddClassGrid'	
	],
	models : ['EventMod', 'DateMod', 'ClassEventMod'],
	stores : ['EventStore', 'DateStore', 'ClassEventStore', 'PlaceStore', 'SecurStore', 'HistStore'/*, 'EventDateStore'*/],
	refs: [{
		ref: 'EventForm',
		selector: 'eventform'
		},{
			ref: 'AdmTool',
			selector: 'admtool'
		},{
			ref : 'WbFilter',
			selector : 'admtool > textfield[name=filteredit]'
		}],
	init : function () {
		this.control({
		
			'mainpanel' : {
				tabchange : this.changeButtons
			},
			/*'admtool button[action=newevent]' : {
				click : this.newEvent
			},*/
			'admtool button[action=eventdate]' : {
				click : this.viewDate
			},
			'eventdategrid' : {
				itemdblclick : this.viewDate
			},
			/*'admtool button[action=hist]' : {
				click : this.viewHist
			},*/
			'admtool button[action=dateadd]' : {
				click : this.addDate
			},
			/*'eventgrid' : {
				selectionchange : this.previewDate
			},	*/		
			'eventform checkboxfield[name=canceled]' : {
				change : this.changeCansel
			},
			'admtool combomonth' : {
				change : this.changeMonth
			},
			'admtool numyear' : {
				change : this.changeYear
			},
			'admtool button[action=filter]' : {
				click : this.filterGrid
			},
			'admtool button[action=clear]' : {
				click : this.filterClear
			},
			'admtool > textfield[name=filteredit]' : {
				keypress : this.pressEnter
			}
		});
		
	},
	/*previewDate : function (gr, rec) {
		if (gr.isSelected(rec[0]) == true) {			
		this.getEventDateStoreStore().load({
			params : {
				key_event : rec[0].data['key']
			}
			});		
		} 		
	},*/
	secure : function (win){
	var record = this.getSecurStoreStore().findRecord('key', '4');
		if(record.data.key_role==1){
			win.down('button[action=save]').hide();
		}
	},
	secureAdd : function (but){
	var record = this.getSecurStoreStore().findRecord('key', '4');
		if(record.data.key_role==1){
			but.setVisible(false);
		}
	},
	pressEnter : function (fild, e) {
	
	var keyCode = e.getKey();
		if (keyCode == 13) {
			
			this.filterGrid(fild.up('admtool').down('button[action=filter]'));
		}
	},
	filterClear : function () {
		this.getWbFilter().setValue(null);
		this.getEventStoreStore().clearFilter();		
	},
	filterGrid : function () {
		if (this.getWbFilter().getValue()) {
			this.getEventStoreStore().clearFilter(true);
			this.getEventStoreStore().filter('name', this.getWbFilter().getValue());			
		} else {
			this.getEventStoreStore().clearFilter();			
		}
	},
	changeCansel : function ( field, newValue, oldValue, eOpts ){
		var f = this.getEventForm();
		if (newValue==true) {
			f.down('combobox[name=key_reason_cancel]').setDisabled(false);
		} else{
			f.down('combobox[name=key_reason_cancel]').setDisabled(true);
			f.down('combobox[name=key_reason_cancel]').setValue(null);
		}
	},	
	changeYear : function (){
	this.loadEvSt();	
	},
	changeMonth : function ( field, newValue, oldValue, eOpts ){
	this.loadEvSt();	
	},		
	addDate : function (but) {
				
	var sm = but.up('mainpanel').down('eventgrid').getSelectionModel();
		if (sm.getCount() > 0) {
			var w = Ext.widget('dateaddwin');		
			w.show();
			w.setTitle( 'Даты мероприятия - '+ sm.getSelection()[0].get('name'));
			var f = w.down('dateaddform');
			f.down('textfield[name=key_event]').setValue(sm.getSelection()[0].get('key'));
			this.getHistStoreStore().removeAll();
			this.getPlaceStoreStore().load({
			params : {
				key_state : sm.getSelection()[0].get('key_cultural_state')
			}
			});
		} else {
		Ext.Msg.alert('Не выбрано мероприятие!', 'Выделите мероприятие, для которого хотите ввести даты')
		}		
	},
	viewDate : function (but) {
		
		var sm = but.up('mainpanel').down('eventgrid').getSelectionModel();
		if (sm.getCount() > 0 ) {
			var w = Ext.widget('datewin');
			this.secure(w);//--security
			this.getDateStoreStore().load({
			params : {
				key_event : sm.getSelection()[0].get('key')
			}
			});
			this.getPlaceStoreStore().load({
			params : {
				key_state : sm.getSelection()[0].get('key_cultural_state')
			}
			});
			
			w.setTitle( 'Даты мероприятия - '+ sm.getSelection()[0].get('name'));
		} else {
		Ext.Msg.alert('Не выбрано мероприятие!', 'Выделите мероприятие, для которого хотите ввести даты')
		}		
	},	
	changeButtons : function (tabPanel, newCard, oldCard, eOpts) {
		var tool = tabPanel.down('admtool');
		if (newCard.title=='Справочники'){			
			this.getPlaceStoreStore().load();
			var but = tool.down('button[itemId=dir]');
			but.setVisible(true);
			this.secureAdd(but);//--Security
		} else {			
			var but = tool.down('button[itemId=dir]');
			but.setVisible(false);
		}
	
		if (newCard.title=='Безопасность'){
			var but = tool.down('button[itemId=usr]');
			but.setVisible(true);
		} else {
			var but = tool.down('button[itemId=usr]');
			but.setVisible(false);
		}
		if (newCard.title=='Отчеты'){
			var but = tool.down('button[itemId=report]');
			but.setVisible(true);
			var gr = tool.down('buttongroup[itemId=dategroup]');
			gr.setVisible(true);
		} else {
			var but = tool.down('button[itemId=report]');
			but.setVisible(false);
			var gr = tool.down('buttongroup[itemId=dategroup]');
			gr.setVisible(false);
		}

		if (newCard.title=='Мероприятия'){
			var but = tool.down('button[itemId=eve]');
			var but2 = tool.down('button[itemId=dat]');
			var but3 = tool.down('button[itemId=datad]');
			var but4 = tool.down('button[itemId=clear]');
			var but5 = tool.down('button[itemId=filter]');
			var but6 = tool.down('button[itemId=del]');
			var combo = tool.down('textfield[itemId=filter_event]');
			var gr = tool.down('buttongroup[itemId=dategroup]');
			but.setVisible(true);
			but2.setVisible(true);
			but3.setVisible(true);
			but4.setVisible(true);
			but5.setVisible(true);
			but6.setVisible(true);
			combo.setVisible(true);
			gr.setVisible(true);
			this.secureAdd(but);//--Security			
			this.secureAdd(but3);//--Security
			this.secureAdd(but6);//--Security
		} else {
			var but = tool.down('button[itemId=eve]');
			but.setVisible(false);
			var but2 = tool.down('button[itemId=dat]');
			but2.setVisible(false);
			var but3 = tool.down('button[itemId=datad]');
			but3.setVisible(false);
			var combo = tool.down('textfield[itemId=filter_event]');
			combo.setVisible(false);
			var but4 = tool.down('button[itemId=clear]');
			but4.setVisible(false);
			var but5 = tool.down('button[itemId=filter]');
			but5.setVisible(false);
			var but6 = tool.down('button[itemId=del]');
			but6.setVisible(false);
			
		}
	},
	loadEvSt : function () {
	var st = this.getEventStoreStore();
	var tool = this.getAdmTool();
	var y = tool.down('numyear').value;
	var m = tool.down('combomonth').value;
	st.getProxy().setExtraParam('date_start', '01.'+m+'.'+y);
	st.load();
	}
});
