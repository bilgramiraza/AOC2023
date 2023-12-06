const fs = require('fs');
const { performance } = require('perf_hooks');

function getSumOfParts(grid){
  let sum = 0;  
  for(let i =0; i<grid.length; i++){
    let number = '', nearSymbol = false, checkNumber=false;
    for(let j=0;j<grid[i].length;j++){
      if(!checkNumber && !isNaN(grid[i][j])){
        checkNumber = true;
        number='';
        nearSymbol = false;
      }
      if((j === grid[i].length-1 || isNaN(grid[i][j])) && checkNumber){
        if(nearSymbol)
          sum += parseInt(number.concat(!isNaN(grid[i][j]) ? grid[i][j] : ''));
        checkNumber = false;
      }
      if(checkNumber){
        number = number.concat(grid[i][j]);
        for(let x=-1; x<2; x++)
          for(let y=-1; y<2; y++){
            if(!x && !y) continue;
            if(i+x<0 || j+y <0 || i+x>=grid.length || j+y>=grid[i].length) continue;
            if(isNaN(grid[i+x][j+y]) && grid[i+x][y+j] !== '.')
              nearSymbol = true;
          }
      }
    }
  }
  return sum;
}

fs.readFile('text', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const lines = data.split('\n').slice(0,-1);
  const sumOfParts = getSumOfParts(lines);
  console.log(sumOfParts);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});

