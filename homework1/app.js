// Andrew Thomas
// CS336 Homework1


const express = require('express')
const app = express()
const port = 3000

var peopleArr = JSON.parse(`
[
		{ "id": "1", "firstName": "Andrew", "lastName":"Thomas", "startDate":"2010-04-23T18:25:43.511Z" },
		{ "id": "2", "firstName": "Joe", "lastName":"Pigot", "startDate":"2009-04-23T18:25:43.511Z" },
		{ "id": "3", "firstName": "Henry", "lastName":"Taylor", "startDate":"2004-04-23T18:25:43.511Z" },
		{ "id": "4", "firstName": "Picman", "lastName":"Trotter", "startDate":"2015-04-23T18:25:43.511Z" },
		{ "id": "5", "firstName": "Picnic Basket", "lastName":"Egan", "startDate":"2002-04-23T18:25:43.511Z" },
		{ "id": "6", "firstName": "Jimmy", "lastName":"Appiah", "startDate":"2017-04-23T18:25:43.511Z" },
		{ "id": "7", "firstName": "Hubert", "lastName":"Oshijaja", "startDate":"2018-04-23T18:25:43.511Z" },
		{ "id": "8", "firstName": "Gomez", "lastName":"Charles", "startDate":"2013-04-23T18:25:43.511Z" },
		{ "id": "9", "firstName": "Alyysa", "lastName":"Sibbick", "startDate":"2015-04-23T18:25:43.511Z" },
		{ "id": "10", "firstName": "Beth", "lastName":"Forrester", "startDate":"2011-04-23T18:25:43.511Z" },
		{ "id": "11", "firstName": "Panini", "lastName":"Macdonald", "startDate":"2012-04-23T18:25:43.511Z" },
		{ "id": "12", "firstName": "Mr. Zorg", "lastName":"Hartigan", "startDate":"2013-10-23T18:25:43.511Z" }]`
		);


function getPerson(id) {
	var i;
	for(i = 0; i < peopleArr.length; i++) {
		if (peopleArr[i].id == id) {
			return peopleArr[i];
		}
	}
	return "404";
}

function getName(id) {
		var i;
	for(i = 0; i < peopleArr.length; i++) {
		if (peopleArr[i].id == id) {
			return peopleArr[i].firstName + " " + peopleArr[i].lastName;
		}
	}
	return "404";
}

function getYear(id) {
	var i;
	for(i = 0; i < peopleArr.length; i++) {
		if (peopleArr[i].id == id) {
			return Math.floor((Date.now() - new Date(peopleArr[i].startDate)) / 31536000000).toString();
		}
	}
	return "404";
}


app.get('/people', (req, res) => {
	res.json( peopleArr );	
});

app.get('/person/:id', (req, res) => {
	var result = getPerson(req.params.id);
	if (result != "404") {
		res.json( result );	
	} else {
		res.sendStatus( 404 );
	}
	
});

app.get('/person/:id/name', (req, res) => {
	var result = getName(req.params.id);
	if (result != "404") {
		res.json( result );	
	} else {
		res.sendStatus( 404 );
	}
});

app.get('/person/:id/years', (req, res) => {
	var result = getYear(req.params.id);
	if (result != "404") {
		res.json( result );	
	} else {
		res.sendStatus( 404 );
	}
});

app.all("*", (req, res) => {
	res.sendStatus( 404 );
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));