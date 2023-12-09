const fs = require('fs');
const { performance } = require('perf_hooks');

function parseData(data){
  const [time, distance] = data
    .split('\n')
    .slice(0,-1)
    .map(line=>line
      .split(':'))
    .map(item=>item[1]
      .trim()
      .split(' ')
      .join(''));
  return [+time,+distance];
}

function getRaceResults(time, distance){
  let winningCount = 0;
  for(let i=0;i<=time;i++)
    if(i*(time-i)>distance)
      winningCount++;
  return winningCount;
}

fs.readFile('./text', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const mergedData = parseData(data);
  const raceResults = getRaceResults(mergedData[0], mergedData[1]);
  console.log(raceResults);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});
