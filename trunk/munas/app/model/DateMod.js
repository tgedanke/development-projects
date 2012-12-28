Ext.define('Munas.model.DateMod', {
	extend : 'Ext.data.Model',
	fields : [{
			name : 'key'
		}, {
			name : 'key_event'
		}, {
			name : 'key_place'
		}, {
			name : 'date_event',
			type : 'date',
			dateFormat : 'd.m.Y'
		}, {
			name : 'time_event',
			type : 'date',
			dateFormat : 'H:i'
		}, {
			name : 'canceled'
		}, {
			name : 'key_reason_cancel'
		}, {
			name : 'description'
		}, {
			name : 'reason_name'
		}, {
			name : 'place_name'
		}
	]
});
