const fs = require('fs');
const { performance } = require('perf_hooks');

fs.readFile('text', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const lines = data.split('\n').slice(0,-1);
  const gameData = lines.map(line=>{
    const [, data] = line.split(': ');
    const [winningNumbers, numbers] = data
      .split('|')
      .map(item=>item
        .trim()
        .split(' '))
      .map(allNumbers=>allNumbers
        .filter(num=>num));
    
    const filteredNumbers = numbers.filter(number=>winningNumbers.includes(number));
    const cardValue = Math.floor(2**(filteredNumbers.length-1));
    return cardValue;
  });
  const sumOfWinning = gameData.reduce((total, curr)=>curr+total,0);
  console.log(sumOfWinning);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});
