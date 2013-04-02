Ext.define('Munas.view.main.PhotoGrid', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.photogrid',	
	store : 'PhotoStore',
	columns : [{
			xtype : 'gridcolumn',
			hidden : true,
			dataIndex : 'key'			
		}, {
			xtype : 'gridcolumn',
			menuDisabled : true,
			minWidth : 150,	
			flex : 1,
			dataIndex : 'url_small_foto',			
			text : 'Картинка',
			renderer: function (value, meta, record) {
                    var url = value;                   
                    return Ext.String.format('<img src="media/{0}" />', url);
                }
		}, {
			xtype : 'gridcolumn',
			width : 200,
			menuDisabled : true,
			dataIndex : 'url_small_foto',			
			text : 'Ссылка на картинку',
			renderer: function (value, meta, record) {
                    var url = value;                   
                    return Ext.String.format('<a href="media/{0}" target="_blank">{0}</a>', url);
                }			
		}
	]
});