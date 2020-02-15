var ideas = require('../controllers/ideas.server.controller.js');
module.exports = function(app) {
    app.get('/api/dashboard',ideas.dashboard);
    app.get('/api/ideas',ideas.allIdeas);  
    app.get('/api/openidea/:id',ideas.openIdea) ;
    app.post('/api/newIdea',ideas.newIdea)
};
