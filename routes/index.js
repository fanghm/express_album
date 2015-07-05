var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/express', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var photos = require('./photos');
router.get('/', photos.list);
router.get('/upload', photos.form);

router.post('/upload', photos.submit(require('path').join(__dirname, '../public/photos')));

module.exports = router;
