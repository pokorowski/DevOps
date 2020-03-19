const express = require('express');

const redis = require('redis');

const app = express();

const process = require('process');

const client = redis.createClient({
  host: 'redis_server',
  port: 6379
});

client.set('counter',0);

app.get('/:fparam', (req, resp) => {
  const factValue = req.params.fparam;
  
  console.log("factorial parameter:" + factValue)	
  
  if(factValue>9) {
    process.exit(0);
  }
  client.get(factValue, (err,result) => {   
    if(!result){
	  result = factorial(factValue);
	  client.set(factValue,result);
	}
    resp.send('factotorial for ' + factValue + " is " + result);
  });
});

function factorial(x)
{
  if(x === 0)
  {
     return 1;
  }
     return x * factorial(x-1)
}      	  

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
