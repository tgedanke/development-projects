Ext.define('Munas.store.aMonths', {
    extend: 'Ext.data.Store',
	//autoLoad: true,
    model: 'Munas.model.aMonth',

    data: [
		{ Name: 'Все',   lowName: '00' },
        { Name: 'Январь',   lowName: '01' },
		{ Name: 'Февраль', 	lowName: '02' },
		{ Name: 'Март', 	lowName: '03' },
		{ Name: 'Апрель',   lowName: '04' },
		{ Name: 'Май', 		lowName: '05' },
		{ Name: 'Июнь',    	lowName: '06' },
		{ Name: 'Июль', 	lowName: '07' },
		{ Name: 'Август',   lowName: '08' },
		{ Name: 'Сентябрь', lowName: '09' },
		{ Name: 'Октябрь', 	lowName: '10' },
		{ Name: 'Ноябрь',   lowName: '11' },
		{ Name: 'Декабрь', 	lowName: '12' }
    ]
});