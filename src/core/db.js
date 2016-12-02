import mongodb from 'mongodb';

function connectToDB(callback) {
	let client = mongodb.MongoClient;
	let url = 'mongodb://localhost:27017/test';      
	//let url = 'mongodb://test:sdS>vxuBofs3.I@ds113678.mlab.com:13678/fcc';

	client.connect(url, (err, db) => {
		if (err) {
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			callback(db);
			db.close();
		}
	});
};

export function getAllPins(callback) {
	connectToDB( (db) => {
		db.collection('pins')
			.find()
			.toArray( (err, entries) => {
				callback(entries);
			});
	})
}

export function getPinsByUser(username, callback) {
	connectToDB( (db) => {
		db.collection('pins')
			.find( {owner: username} )
			.toArray( (err, entries) => {
				callback(entries);
			});
	})
}

export function addPin(username, pinLink, pinDesc, callback) {
	let obj = {};
	obj.owner = username;
	obj.link = pinLink;
	obj.desc = pinDesc;
	connectToDB( (db) => {
		db.collection('pins').insert(
			obj
		);
		callback('pin added');
	})
}

export function deletePin(username, _id, callback) {
	connectToDB( (db) => {
		db.collection('pins').remove(
			{ _id: mongodb.ObjectId(_id), owner: username }
		);
		callback('pin deleted');
	})
}
