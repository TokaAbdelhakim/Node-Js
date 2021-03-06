/*const https = require ('https');
const { string, describe } = require('yargs');
const yargs = require('yargs');
const url = `https://jsonplaceholder.typicode.com/albums`;

const myRequest = https.request(url,(response)=>{
    let data = '';
    response.on('data',(chunk)=>{
        data = data+chunk.toString();
    })
    response.on('end',()=>{
        const body = JSON.parse(data);
        console.log(body); 
    })
})
myRequest.on('error',(error)=>console.log('error'));
myRequest.end(); */
const yargs = require('yargs');
const myMethods = require('./data')

yargs.command({
    command:"readData",
    describe:"read api",
    builder:{
        name: {type:"string"},
    },
    handler:function(argv){
        myMethods.getdata(argv.name,(error, result)=>{
            console.log(argv.name)
            if(error) console.log(error)
            else console.log(result)
        });
    }

})

yargs.argv