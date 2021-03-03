const fs = require("fs");
const { argv } = require("process");
const readFile = function(){
    try{    
        
        customs = JSON.parse(fs.readFileSync('data.json').toString())
    }
    catch(e){
       
        customs = []
    }
    return customs
}
const writeFile = function(customs){
    fs.writeFileSync('data.json', JSON.stringify(customs))
}
const addcustomer = function(custom){
    
    customs = readFile();
    customs.push(custom);
    writeFile(customs);
}
const showall = function(){
    customs  = readFile();
    customs.forEach(customer => {
        console.log(`Id:${customer.id} NAME:${customer.name} BALANCE:${customer.balance}`)        
    });
}

const deletecustomer = function(id){
    let customs = readFile();
    index = customs.findIndex(customer=>{
        return customer.id == id
    })
    if (index == -1){
        console.log("customer not found");
    }
    else{
        customs.splice(index,1);
    }
    writeFile(customs);
}
const addbalance= function(id,newadd){
    let customs = readFile();
    index = customs.findIndex(customer=>{
        return customer.id == id
    })
    if (index == -1){
        console.log("customer not found");
    }
    else{
        var b =  customs[index].balance;
        customs[index].balance = b + parseFloat (newadd);
    }
    writeFile(customs);
}

module.exports = {addcustomer,showall,deletecustomer,addbalance}