const { spawn, childProcess, exec } = require('child_process');
const express = require('express')
const bodyParser = require("body-parser");
const { stderr, stdout } = require('process');

const app = express()
const port = 8000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', (req, res) => {
  // res.send('Running script...');

  console.log(req.body)

  // const process = spawn(`/home/jan/tmp/blend2/blender-cli/vote.sh`, Object.values(req.body));
  
  console.log('sh ./vote.sh ' + Object.values(req.body).join(' '))
  const myscript = exec('sh ./vote.sh ' + Object.values(req.body).join(' '));
  myscript.stdout.on('data',function(data){
    console.log(data); // process output will be displayed here
  });

  myscript.stderr.on('data',function(data){
    console.log(data); // process error output will be displayed here
  });

  // process.stdout.on('data', function(data) {
  //   //Here is where the output goes

  //   console.log('stdout: ' + data);
  // });

  // process.stderr.on('error', function(data) {
  //   //Here is where the output goes

  //   console.log('error: ' + data);
  // });

  return process;
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
