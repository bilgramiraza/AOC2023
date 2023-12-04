const fs = require('fs');
const { performance } = require('perf_hooks');

fs.readFile('text', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const lines = data.split('\n').slice(0,-1);
  const cardInstances =new Array(lines.length).fill(1);

  lines.forEach((line, idx)=>{
    const [, data] = line.split(': ');
    const [winningNumbers, numbers] = data
      .split('|')
      .map(item=>item
        .trim()
        .split(' '))
      .map(allNumbers=>allNumbers
        .filter(num=>num));
    
    const matchCount = numbers.filter(number=>winningNumbers.includes(number)).length;
    if(matchCount){
      for(let i =idx+1; i<=idx+matchCount; i++){
        cardInstances[i] += cardInstances[idx];
      }
    }
  });
  const totalCardInstances= cardInstances.reduce((total, curr)=>curr+total,0);
  console.log(totalCardInstances);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});
