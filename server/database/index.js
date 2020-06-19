var { Pool } = require('pg');

const ENV = process.env.NODE_ENV;


//const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:Asdf@1234@localhost:5432/dnaredla';


//console.log('@@@@@'+CONNECTION_STRING);
const SSL = process.env.NODE_ENV === 'production';

class Database {
     constructor () {
       
       /* this._pool = new Pool({
            user: 'bupotqlyaufdfd',
            host: 'ec2-52-20-248-222.compute-1.amazonaws.com',
            database: 'd53pse8l0okfjb',
            password: 'a3888acada17d8d6fd7480759d46acd7143b001f1ad26c6f3950e53117f3d633',
            port: 5432,
            ssl: {rejectUnauthorized: false}
          })*/
        if(process.env.NODE_ENV === 'production')  
        {
            this._pool = new Pool({
                user: 'bupotqlyaufdfd',
                host: 'ec2-52-20-248-222.compute-1.amazonaws.com',
                database: 'd53pse8l0okfjb',
                password: 'a3888acada17d8d6fd7480759d46acd7143b001f1ad26c6f3950e53117f3d633',
                port: 5432,
                ssl: true
              })
        }
        else{
            this._pool = new Pool({
                user: 'postgres',
                host: 'localhost',
                database: 'dnaredla',
                password: 'Asdf@1234',
                port: 5432
              })
        }
         




/*this._pool = new Pool({
connectionstring: 'postgres://bupotqlyaufdfd:a3888acada17d8d6fd7480759d46acd7143b001f1ad26c6f3950e53117f3d633@ec2-52-20-248-222.compute-1.amazonaws.com:5432/d53pse8l0okfjb',
ssl: false
})*/

this._pool.on('error',(err,client)=>{
    console.error('unexpected error on idle PostgreSQL client.',err);
    process.exit(-1);
});

     }

     query (query, ...args) {
    this._pool.connect((err, client, done)=>{
        if (err){
            console.log('@@@@@'+err.message);
            throw err;
        } 
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