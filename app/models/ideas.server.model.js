const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ideasSchema = new Schema({
            Portfolio : String,
            TeamOrSub_group : String,
            ApplicationName : String,
            PartOfCI_Ideastream	: String,
            Category: String,	
            ValueAddTitle : String,	
            Details	: String,
            OneTimeOrRunTime : String,	
            PotentialBusinessBenefit : String,	
            CostBenefitToClient	: String,
            RevenueToIBM: String,	
            CurrentStatus: String,	
            IdentifiedDate: String,
            ApprovedDate: String,	
            ImplementedDate : String,	
            ProposedToClientsName: String,	
            BAGID: String,	
            SalesconnectID : String,


});

ideasSchema.set('toJSON', {
    getters: true,
    virtuals: true
    });
mongoose.model('ideas', ideasSchema);