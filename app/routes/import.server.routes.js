const importExcel = require('../controllers/import.server.controller.js');

module.exports = function (app){
    app.post('/uploadIdeas', importExcel.importToJSON);
}