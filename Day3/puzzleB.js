const fs = require('fs');
const { performance } = require('perf_hooks');

function getSumOfGearRatio(grid){
  let gears= {};  

  for(let i =0; i<grid.length; i++){
    let number = '', gearLocation=null, checkNumber=false;
    for(let j=0;j<grid[i].length;j++){
      if(!checkNumber && !isNaN(grid[i][j])){
        checkNumber = true;
        number='';
        gearLocation= null;
      }
      if((j === grid[i].length-1 || isNaN(grid[i][j])) && checkNumber){
        if(gearLocation)
          gears[gearLocation].push(parseInt(number.concat(!isNaN(grid[i][j]) ? grid[i][j] : '')));
        checkNumber = false;
      }
      if(checkNumber){
        number = number.concat(grid[i][j]);
        for(let x=-1; x<2; x++)
          for(let y=-1; y<2; y++){
            if(!x && !y) continue;
            if(i+x<0 || j+y <0 || i+x>=grid.length || j+y>=grid[i].length) continue;
            if(grid[i+x][y+j] === '*'){
              gearLocation= `${i+x},${j+y}`;
              if(gears[gearLocation] == null) gears[gearLocation]=[];
            }
          }
      }
    }
  }
  return Object.values(gears).reduce((total, array)=>{
    return (array.length == 2) ? total + array[0]*array[1]:total;
  },0);
}

fs.readFile('text', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const lines = data.split('\n').slice(0,-1);
  const sumOfGearRatios = getSumOfGearRatio(lines);
  console.log(sumOfGearRatios);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});
