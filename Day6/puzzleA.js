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
      .filter(item=>item));
  const mergedData = time.map((item, i)=>[item, distance[i]]);
  return mergedData;
}

function getRaceResults(time, distance){
  let winningCount = 0;
  for(let i=0;i<=time;i++)
    if(i*(time-i)>distance)
      winningCount++;
  return winningCount;
}

fs.readFile('./test', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const mergedData = parseData(data);
  const raceResults = mergedData.map(data=>getRaceResults(data[0], data[1]));
  const totalWinningChances = raceResults.reduce((total, curr)=>total*curr,1);
  console.log(totalWinningChances);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});
