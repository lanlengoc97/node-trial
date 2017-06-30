const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app =express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');



//register middleware
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log=`${now}: ${req.method} ${req.url}`;


	console.log(log);
	fs.appendFile('server.log',log+'\n',(err)=>{
		console.log('Warning flag');
		next();
	});
	
});
//stop everything after it from executing 
app.use((request,response,next)=>{
	response.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));


hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=> {
	return text.toUpperCase();
});

// hbs.registerHelper('getHeader', (address)=>{
// 	return address
// });


// app.get('/',(request,response)=>{
// 	// response.send('<h1>Hello Express</h1>');
// 	response.send({
// 		name:'Lan',
// 		likes: [

// 			'Machiatto',
// 			'Shopping'

// 		]
// 	})
// });
app.get('/',(request,response)=>{
	response.render('home.hbs',{
		user:'lan',
		pageTitle:'Home Page'
	 });	
});

app.get('/about',(request,response)=>{
	response.render('about.hbs',{
		pageTitle:'About Page',

	});
});


//bad-send back json with errorMessage
app.get('/bad',(request,response)=>{
	response.send({
		error:'Unable to handle request'
	})
});

app.listen(3000,()=>{
	console.log('Server is up on port 3000');
});