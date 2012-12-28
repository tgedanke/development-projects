Ext.define('Munas.view.reports.ReportGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.reportgrid',
	
	store : 'ReportStore',
	columns : [{
			xtype : 'gridcolumn',
			text : '№ отчета',
			dataIndex : 'key'			
		}, {
			xtype : 'gridcolumn',			
			dataIndex : 'report_name',
			flex : 1,
			text : 'Наименование отчета'
		}
	]
});
