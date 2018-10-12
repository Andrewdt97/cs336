// Andrew Thomas
// CS336 Lab06


const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var HttpStatus = require('http-status-codes');

app.get('/request', (req, res) => {
	res.sendStatus( HttpStatus.OK );
})

app.head('/request', (req, res) => {
	res.sendStatus( HttpStatus.PAYMENT_REQUIRED );
})

app.put('/request', (req, res) => {
	res.status( HttpStatus.ACCEPTED )
		.json( req.body );
})

app.post('/request', (req, res) => {
	res.status( HttpStatus.ACCEPTED )
		.send( JSON.stringify( req.body ) );
})

app.delete('/request', (req, res) => {
	res.sendStatus( HttpStatus.NO_CONTENT );
})

app.use(express.static('public'));

app.post('/forms', (req, res) => {
	res.json( req.body );
});

app.get('/forms', (req, res) => {
		res.sendFile('forms.html', {root: 'public'}, (err) => {
	    res.end();

	    if (err) throw(err);
	});
})

app.all("*", (req, res) => {
	res.sendStatus( HttpStatus.NOT_FOUND );
})

app.listen(port, () => console.log(`I'm listening on ${port}!`));

