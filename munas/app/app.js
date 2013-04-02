Ext.application({
	name : 'Munas',
	controllers : ['Loginform', 'Directorys', 'Security', 'Main', 'DateAdd', 'DateView', 'Reports', 'Event', 'Photo'],	
	autoCreateViewport : false,
	launch: function() {
		//defaults settings
		Ext.tip.QuickTipManager.init();
		Ext.apply(Ext.tip.QuickTipManager.getQuickTip(), {
				maxWidth: 400,
				minWidth: 70,
				showDelay: 60      // Show 50ms after entering target
		});		
		
	}
});