Ext.define('Munas.view.directorys.DirectPanel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.directpanel',
	requires : ['Munas.view.directorys.ContGrid', 'Munas.view.directorys.StateGrid', 'Munas.view.directorys.ClassGrid', 'Munas.view.directorys.PlaceGrid', 'Munas.view.directorys.ReasonGrid', 'Munas.view.directorys.AnsGrid', 'Munas.view.directorys.AgeGrid'],
	activeTab : 0,
	items : [{
			xtype : 'stategrid',
			title : 'Учреждения'
		}, {
			xtype : 'contgrid',
			title : 'Контакты'
		}, {
			xtype : 'ansgrid',
			title : 'Ответственные'
		}, {
			xtype : 'placegrid',
			title : 'Места мероприятий'
		}, {
			xtype : 'classgrid',
			title : 'Категории мероприятий'
		}, {
			xtype : 'reasongrid',
			title : 'Причины отмены'
		}, {
			xtype : 'agegrid',
			title : 'Возрастные ограничения'
		}
	]
});
