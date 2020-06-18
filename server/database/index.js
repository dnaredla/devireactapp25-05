var { Pool } = require('pg');

const ENV = process.env.NODE_ENV;

var CONNECTION_STRING;

if(ENV === 'production'){
CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:Asdf@1234@localhost:5432/dnaredla';
}
else{
 CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:Asdf@1234@localhost:5432/dnaredla';  
}

//const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:Asdf@1234@localhost:5432/dnaredla';
const SSL = process.env.NODE_ENV === 'production';

class Database {
     constructor () {
this._pool = new Pool({
connectionstring: CONNECTION_STRING,
ssl: SSL
})

this._pool.on('error',(err,client)=>{
    console.error('unexpected error on idle PostgreSQL client.',err);
    process.exit(-1);
});

     }

     query (query, ...args) {
    this._pool.connect((err, client, done)=>{
        if (err) throw err;
        const params = args.length === 2 ? args[0] : [];
        const callback = args.length === 1 ? args[0] : args[1];

        client.query(query, params, (err, res) => {
            done();
        if(err)  {
            console.log(err.stack);
            return callback({error: 'Database Error.' },null);
        }   
        callback({}, res.rows);
      });
    });
     }

     end () {
          
     }
}

module.exports = new Database();