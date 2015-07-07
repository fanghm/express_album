var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/express', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var photos = require('./photos');
router.get('/', photos.list);
router.get('/upload', photos.form);

var path = require('path').join(__dirname, '../public/photos');
router.get('/photo/:id/download', photos.download(path))
router.post('/upload', photos.submit(path));

module.exports = router;
