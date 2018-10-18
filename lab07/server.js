// Andrew Thomas
// CS 336 lab07

const express = require('express')
const app = express()
const port = 3000


app.get('/hello', (req, res) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var returnText = "Hello, " + req.query.text + "! ";
	var json = JSON.parse(`{ "text" : "${returnText}" }`)
	res.json( json );	
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));