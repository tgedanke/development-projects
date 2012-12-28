Ext.define('Munas.view.directorys.ClassGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.classgrid',	
	store : 'ClassStore',
	columns : [{
			xtype : 'gridcolumn',
			hidden : true,
			dataIndex : 'key'			
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'name',
			flex : 1,
			text : 'Наименование'
		}, {
			xtype : 'gridcolumn',
			flex : 1,
			dataIndex : 'description',
			text : 'Описание'
		}
	]
});
