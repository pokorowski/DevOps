const express = require('express');

const redis = require('redis');

const app = express();

const process = require('process');

const client = redis.createClient({
  host: 'redis_server',
  port: 6379
});

app.get('/:fparam', (req, resp) => {
  const factValue = req.params.fparam;
  
  console.log("factorial parameter:" + factValue)	
  
  if(factValue>9 || factValue<1) {
    process.exit(1);
  }
  

  
  client.get(factValue, (err,result) => {   
    if(!result){
	  var fact = parseInt(factorial(factValue));
	  client.set(factValue,fact);
	  resp.send('(No Cache) factotorial for ' + factValue + " is " + fact);
	}
	else
	{
    resp.send('(Cache) factotorial for ' + factValue + " is " + result);
    }
  });
});

function factorial(x)
{
  if(x === 0)
  {
     return 1;
  }
  else
  {
     return x * factorial(x-1);
  }
}      	  

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
