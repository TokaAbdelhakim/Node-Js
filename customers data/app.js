
const yargs = require("yargs");
const myMethods = require('./Functions');
const { command } = require("yargs");
const { type } = require("os");

yargs.command ({
    command: "addcustomer",
    builder: {
        id: {type: Number},
        name: {type:"string"},
        balance: {type:Number}
    },
    handler: function(argv){
        console.log("here");
        let custom = {id:argv.id,name:argv.name,balance:argv.balance};
        myMethods.addcustomer(custom);
    }
})

yargs.command({
    command: "showall",
    handler: function(){
        myMethods.showall();
    }

})

yargs.command({
    command:"delete",
    builder:{
        id: {type:Number}
    },
    handler: function(argv){
        myMethods.deletecustomer(argv.id)
        console.log("deleted");
    }
})

yargs.command({
    command:"addbalance",
    builder: {
        id:{type:Number},
        newadd:{type:Number}
    },
    handler: function(argv){
        myshMethods.addbalance(argv.id,argv.newadd);
    }
})
yargs.argv