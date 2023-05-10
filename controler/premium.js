const Expance=require('../models/expance')
const User=require('../models/user');
let total=0;
let arr=[];

exports.groupBydata = async (req, res) => {
    const allUserExpa=[]
    try {
      const users = await User.findAll();
  
      const result =[]
      for (const user of users) {
        let toatal=0;
        const expenses = await Expance.findAll({ where: { userId: user.id } });
   for( const expense of expenses){
      toatal=toatal+expense.expAmount;
   }
allUserExpa.push({id:user.id,name:user.name,totalexpance:toatal})
    }
    allUserExpa.sort((a, b) => b.totalexpance - a.totalexpance);
    res.send(allUserExpa);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
  };
  