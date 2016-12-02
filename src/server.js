import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';

let app = express();

app.set('port', (process.env.PORT || 3000));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/run/')));
}

app.listen(app.get('port'), function (err) {
	if (err) {
		return console.error(err);
	}
	console.log('Listening...');
});
