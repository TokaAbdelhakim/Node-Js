const request = require('request');

const getdata = (api, callback)=>{
    if(api=='posts') url = 'https://jsonplaceholder.typicode.com/posts'
    else if(api=='albums') url ='https://jsonplaceholder.typicode.com/albums'
    request({ url , json:true }, (error, {body})=> {
        if(error) callback('error in api service', false)
        else if(body.error) callback('error inside api body', false)
        else callback(false, body)
    })
}
 
module.exports={
    getdata
}