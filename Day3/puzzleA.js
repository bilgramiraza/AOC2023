const fs = require('fs');
const { performance } = require('perf_hooks');

fs.readFile('text', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const lines = data.split('\n').slice(0,-1);
  let numbers = [];
  for(let i=0;i<lines.length;i++){
    let number = '';
    for(let j=0;j<lines[i].length+1;j++){
      if(!isNaN(+lines[i][j])){
        number =number+lines[i][j];
        continue;
      }else if(number){
        const leftLimit = j-number.length -1 <0? 0: j-number.length -1;
        let symbol = false;
        if(i>0){
          symbol = !lines[i-1]
            .slice(leftLimit, j+1)
            .split('')
            .every(char=>char==='.'||!isNaN(+char));
        }
        if(!symbol && i<lines.length-1) {
          symbol = !lines[i+1]
            .slice( leftLimit, j+1)
            .split('')
            .every(char=>char==='.'||!isNaN(+char));
        }
        if(!symbol){
        symbol = !lines[i]
          .slice( leftLimit, j+1)
          .split('')
          .every(char=>char==='.'||!isNaN(+char));
        }
        if(symbol){
          numbers.push(+number);
        }
        number = '';
      }
    }
  }
  const sum = numbers.reduce((sum, curr)=>sum+curr,0);
  console.log(sum);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});
