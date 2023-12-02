const fs = require('fs');
const { performance } = require('perf_hooks');

function tabulateData(items){
  const flattenedItems = items.flat();
  const splitData = flattenedItems.map(item=>item.split(' ')).flat();
  let data = {};
  for(let i = 0; i<splitData.length; i+=2){
    if(!data[splitData[i+1]]){
      data[splitData[i+1]]=+splitData[i];
    }else if(data[splitData[i+1]]<+splitData[i]){
      data[splitData[i+1]]= +splitData[i];
    }
  }
  return data;
}

function formatData(data){
  const splitByRound = data.split(';');
  const splitByItem = splitByRound.flatMap(round=>round.split(',').map(item=>item.trim()));
  const tabulatedData = tabulateData(splitByItem);
  return tabulatedData;
}

fs.readFile('text', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const lines = data.toString().split('\n').slice(0,-1);
  const gameObjectArray = lines.map(line=>{
    const splitPoint = line.indexOf(':');
    const game = line.slice(5, splitPoint);
    const gameData = line.slice(splitPoint+2);
    const cleanData = formatData(gameData);
    return {
      [game]:cleanData,
    };
  });
  const sumOfPowerOfCubes = gameObjectArray.reduce((total,game)=>{
    const {red, green, blue} = game[Object.keys(game)]
    return total+(red*green*blue);
  },0);
  console.log(sumOfPowerOfCubes);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});
