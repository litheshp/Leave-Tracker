const Status = require('mongoose').model('status');
const Ideas = require('mongoose').model('ideas');
const unique = require('array-unique');

exports.dashboard = async function (req,res){
    
    const lists = await Status.find({});
    const retirement = await lists.filter((e)=> e.Portfolio == 'Retirement');
    const group = await lists.filter((e)=> e.Portfolio == 'Group');
    const pramerica = await lists.filter((e)=> e.Portfolio == 'Pramerica');
                 
    let dataDonut = [];
    let labels = [];
    let stat =[];
    lists.forEach(element => {
        let obj = {label : element.CurrentStatus, value : element.Number}
        dataDonut.push(obj);
        labels.push(element.Portfolio);
        stat.push(element.CurrentStatus);

      });
   
    stat = unique(stat);
    labels = unique(labels)
   console.log(stat);
   
    let statData = new Array();
    let datasets = new Array();
    let bgcolor = ['rgba(92, 184, 92, 1)','rgba(240, 173, 78, 1)','rgba(217, 83, 79, 1)','rgba(255, 99, .432,.4)','rgba(255, 255, 0, .4)','rgba(51, 122, 183, 1)']
    let i=0;
   
    for(i;i<stat.length;i++)
    {
        statData = [0,0,0];
        let temp = lists.filter((r)=> r.CurrentStatus == stat[i]);
       
        for(let j=0;j<temp.length;j++){
          
            if(temp[j].Portfolio == "Retirement"){
                statData[0] = temp[j].Number;
                }
            if(temp[j].Portfolio == "Group"){
                statData[1] = temp[j].Number;
                }
            if(temp[j].Portfolio == "Pramerica"){
                statData[2] = temp[j].Number;
                }

        }
      datasets.push({label: stat[i], backgroundColor:bgcolor[i],  data: statData })
              
    }
    let data = {labels , datasets }
    res.send({dataDonut,data});
   }
exports.allIdeas = async function(req, res){
    let ideasTable= "";
    let ideas = await Ideas.find({});
    ideas.forEach((e)=>{
        ideasTable += `<tr><td><a href='/api/openidea/${e._id}'>${e.Portfolio}</a></td><td>${e.TeamOrSub_group}</td><td>${e.ApplicationName}</td><td>${e.ValueAddTitle}</td><td>${e.CostBenefitToClient}</td><td>${e.RevenueToIBM}</td><td>${e.CurrentStatus}</td></tr>`
    })
    res.send({ideasTable})
}
exports.openIdea = async function(req,res){
    const _id = req.params.id;
    try{
     const idea = await Ideas.findById(_id,(err,idea)=>{
         console.log(idea);
         if(!idea){
             res.status(404).send("No idea");
         }
         res.status(200).send(idea);
     })
     
 }catch(e){
     res.status(500).send(e);
 }
    res.send({idea});
}
exports.newIdea = async (req,res)=>{

    try{
        
        const idea = new Idea(req.body);
        await idea.save();
        console.log('saved');
        res.status(200).send(idea);
    }catch(e){
        res.status(500).send(e);
    }
    
}
