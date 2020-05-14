const keys = require('./keys');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const redis = require('redis');
const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000 
});

const { Pool } = require('pg');
const pgClient = new Pool({
	user: keys.pgUser,
	host: keys.pgHost,
	database: keys.pgDatabase,
	password: keys.pgPassword,
	port: keys.pgPort
});

pgClient.on('error', () => console.log('No connection to PG DB'));

pgClient.query('CREATE TABLE IF NOT EXISTS results(number INT)').catch(err => console.log(err));

console.log(keys);
 
app.get("/", (req, resp) => {
    resp.send("Hello World!!!!");
}); 

app.get('/:number1/:number2', (req, resp) => {
    let numberValue1 = req.params.number1;
    let numberValue2 = req.params.number2;
    let cache = numberValue1 + ',' + numberValue2;


    redisClient.get(cache, (err, cachedValue) => {
        if (!cachedValue) {
          var lcmResult = parseInt(lcm(numberValue1, numberValue2))
          redisClient.set(cache,lcmResult);
          resp.send('[NO CACHE] '  + lcmResult + "\n");
          pgClient.query('INSERT INTO results(number) VALUES($1)', [lcmResult], (err, res) => {
            if(err){
             console.log(err.stack);
            };
          })
        }
        else {
            resp.send('[CACHE] ' + cachedValue + "\n");
        };
    });
});

app.get('/results', (req, resp) => {
    pgClient.query('SELECT * FROM results')
        .then(res => resp.send(res.rows))
        .catch(err => console.log(err));
});
 
app.listen(4000, () => {
  console.log('Server listening on port 4000');
});

function gcd(a,b) {
  let temp;
   while (b !== 0){
     temp = a;
      a = b;
      b = temp % b;
    }
    return a;
}

function lcm(a,b) {
  return a*b/gcd(a,b);
}


