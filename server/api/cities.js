var express = require('express');
var Cities = require('../models/cities');

var router = express.Router();



router.get('/', (req, res) => {
  console.log('!!!!!!!!');
  Cities.retrieveAll((err, cities) => {
   // res.header('Access-Control-Allow-Origin', "*");
    if (err)
      return res.json(err);
    return res.json(cities);
  });
});

router.post('/', (req, res) => {
  var city = req.body.city;
console.log('!!!!!!'+city);
  Cities.insert(city, (err, result) => {
    if (err)
      return res.json(err);
    return res.json(result);
  });
});

module.exports = router;