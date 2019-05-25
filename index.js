var twit=require('twit');
const config=require('./config');
const fetch=require('node-fetch');



var Twitter=new twit(config);


const url='https://jokeapi.p.rapidapi.com/category/Programming?format=json';
const options={
    url: url,
    method:'GET'
};

fetch(url,{
    method:'GET',
    headers:{
        'X-RapidAPI-Host':'jokeapi.p.rapidapi.com',
        'X-RapidAPI-Key':'856dce8c4fmsh97aa5eab2d77fddp1f5c02jsne5667e08430d'
    },
}).then(res=>{
    return res.json();
}).then(response=>{
    let joke='';
    if(response.type=='single'){
        joke=response.joke;
    }else{
        joke=response.setup+' ...'+response.delivery;
    }

    console.log(joke);
    UpdateStatus(joke);
}).catch(e=>{
    console.log(e);
});


function UpdateStatus(message){
    Twitter.post('/statuses/update',{status:message}, function(err,data,response){
        console.log(data);
    });
}