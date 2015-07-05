var photos = [];
photos.push({
	name: 'Node.js Logo',
	path: 'http://nodejs.org/imageslogos/nodejs-green.png'
});

photos.push({
	name: 'Ryan Speaking',
	path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

exports.list = function(req, res, next) {
	Photo.find({}, function(err, photos) {
		if (err) return next(err);
		res.render('photos', {
			title: 'Photos',
			photos: photos
		});
	});
};

exports.form = function(req, res) {
	res.render('photos/upload', {
		title: 'Photo Upload'
	});
};

var Photo = require('../models/Photo');
var path = require('path');
var fs = require('fs');
var join = path.join;

exports.submit = function(dir) {
	return function(req, res, next) {
		var img = req.files.image;
		var name = req.body.name || img.originalname;
		var path = join(dir, img.name);
		//console.log(req);
		console.log('dir:' + path);
		
		fs.rename(img.path, path, function(err) {
			if (err) return next(err);

			Photo.create({
				name: name,
				path: img.name
			}, function(err) {
				if (err) return next(err);
				res.redirect('/');
			});
		});
	};
};