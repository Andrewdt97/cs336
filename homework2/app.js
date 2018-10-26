// Andrew Thomas
// CS336 Homework2


const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
var DB_FILE = path.join(__dirname, 'db.json');


function getPerson(id, db) {
	var i;
	for(i = 0; i < db.length; i++) {
		if (db[i].id == id) {
			return i;
		}
	}
	return "404";
}


app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(express.static('public'));


app.get('/people', (req, res) => {
	fs.readFile(DB_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var people = JSON.parse(data);
        res.json( people );
    })
});

app.post('/people', (req, res) => {
		fs.readFile(DB_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var people = JSON.parse(data);
        var newPerson = {
        	id: req.body.id,
        	firstName: req.body.firstName,
        	lastName: req.body.lastName,
        	startDate: req.body.startDate,
        };
        people.push(newPerson);
        fs.writeFile(DB_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(people);
        });
    });
});



app.get('/person/:id', (req, res) => {
	console.log( "Getting person" );
	fs.readFile(DB_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var peopleArr = JSON.parse(data);

        for(i = 0; i < peopleArr.length; i++) {
			if (peopleArr[i].id == req.params.id) {
				res.json( peopleArr[i] );
			}
		}
    })
	
});

app.post('/person/:id', (req, res) => {
	
	fs.readFile(DB_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var people = JSON.parse(data);
        var idx = getPerson(req.query.id, people);
        if ( req.body.hasOwnProperty('firstName') ) {
			people[idx].firstName = req.body.firstName;
		}
		if ( req.bodyhasOwnProperty('lastName') ) {
			people[idx].lastName = req.body.lastName;
		}
		if ( req.body.hasOwnProperty('startDate') ) {
			people[idx].startDate = req.body.startDate;
		}

        fs.writeFile(COMMENTS_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(people);
        });
    });
});

app.delete('/person/:id', (req, res) => {
	
	fs.readFile(DB_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var people = JSON.parse(data);
        var idx = getPerson(req.query.id, people);
        people.splice(idx, 1);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(people, null, 4), function(err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(people);
        });
    });
});



app.get('/person/:id/name', (req, res) => {
	fs.readFile(DB_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var people = JSON.parse(data);
        var idx = getPerson(req.query.id, people);
		res.send( people[idx].firstName + " " + people[idx].lastName);
	});
	
});

app.get('/person/:id/years', (req, res) => {
	fs.readFile(DB_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var people = JSON.parse(data);
        var idx = getPerson(req.body.id, people);
		res.send( Math.floor((Date.now() - new Date(people[idx].startDate)) / 31536000000).toString());
	});
	
});

app.all("*", (req, res) => {
	res.sendStatus( 404 );
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));