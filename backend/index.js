const { spawn, childProcess } = require('child_process');
const express = require('express')
const bodyParser = require("body-parser");
const { stderr, stdout } = require('process');

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  res.send('Running script...');

  const process = spawn(`./vote.sh`, Object.values(req.body));
  
  process.stdout.on('data', function(data) {
    //Here is where the output goes

    console.log('stdout: ' + data);
  });

  process.stderr.on('error', function(data) {
    //Here is where the output goes

    console.log('error: ' + data);
  });

  return process;
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
