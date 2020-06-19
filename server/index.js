const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')  // allows/disallows cross-site communication

var db = require('./database');

const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(cors());
//const whitelist = ['http://localhost:5000']
/*const corsOptions = {
  origin: function (origin, callback) {
   // if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    //} else {
      //callback(new Error('Not allowed by CORS'))
    //}
  }
}*/

app.use('/api/cities',require('./api/cities'));
app.use('/api/weather',require('./api/weather'));

if(ENV === 'production'){
  app.use(express.static(path.join(__dirname,'../client/build')));
  app.use((req, res)=>{
  res.sendFile(path.join(__dirname,'../client/build/index.html'));
  });
}

app.listen(PORT, () => {
console.log(`server yes listining on port ${PORT}..`);
});

db.query('SELECT now()',(err,res)=>{
    if(err.error)
    return console.log('@@@@'+err.error);
    console.log(`PostgresSQL Connected: ${res[0].now}.`);
})

module.exports = app;
