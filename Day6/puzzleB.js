const fs = require('fs');
const { performance } = require('perf_hooks');

function parseData(data){
  const lines = data.split('\n').slice(0,-1);
  return lines;
}

fs.readFile('./text', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const lines = parseData(data);
  console.log(lines);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});