module.exports = function(app){
	var authenticated = require('../../config/authenticated');
	var exl = require('../controllers/weeklyImport.server.controller.js');
	var employeeData = require('../controllers/employeeDataImport.server.controller.js');
	var calculateData = require('../controllers/dataclacluation.server.controller.js');
	 app.post('/authenticate',authenticated);
	 app.post('/pages/upload1', exl.importToJSON1);
	 app.post('/pages/upload2', exl.importToJSON2);
	 app.get('/api/list', employeeData.list);
	 app.post('/api/list', employeeData.byTeam);
	 app.post('/calculate/getEmpData',calculateData.getEmpData);
	 app.post('/api/getWeeklyData',employeeData.getWeeklyData);
	 app.get('/calculate/list',calculateData.weeklyDatalist);
	 app.get('/calculate/getConfig',calculateData.configUpdate);
	 app.get('/config/list',calculateData.listLookups);
	 app.get( '/calculate/getDataByWeek',calculateData.getDataByWeek);
	 
	 app.post('/calculate/updateEmployeeUTE',calculateData.updateEmployeeData);
	 app.post( '/calculate/delete',calculateData.deleteAll);
	 app.post( '/calculate/getDataByWeek',calculateData.getDataByWeek);
	 app.post('/calendar/getMonthStrtnEnd',calculateData.getMonthStrtnEnd)
	
	 //app.post('/api/list',calculateData.byTeam);
	 //app.post('/calculate/filter',calculateData.getFilteredData);
	 
}