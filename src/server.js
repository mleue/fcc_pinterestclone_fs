import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import {addPin, deletePin, getAllPins, getPinsByUser} from './core/db';

let app = express();

app.set('port', (process.env.PORT || 3000));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/run/')));
}

app.get('/api/pins/getallpins', (req, res) => {
	console.log("getallpins");
	getAllPins( (data) => {
		res.json(data);
	})
});

app.get('/api/pins/getpinsbyuser', (req, res) => {
	console.log("getpinsbyuser");
	getPinsByUser( req.query.username, (data) => {
		res.json(data);
	})
});

app.post('/api/pins/addpin', bodyParser.json(), (req, res) => {
	console.log("addpin");
	addPin(req.body.username, req.body.pinLink, req.body.pinDesc, (msg) => {
		res.json({
			msg
		});
	});
});

app.post('/api/pins/deletepin', bodyParser.json(), (req, res) => {
	console.log("deletepin");
	deletePin(req.body.username, req.body._id, (msg) => {
		res.json({
			msg
		});
	});
});

app.listen(app.get('port'), function (err) {
	if (err) {
		return console.error(err);
	}
	console.log('Listening...');
});
