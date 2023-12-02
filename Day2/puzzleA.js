const fs = require('fs');
const { performance } = require('perf_hooks');

const filterCondition = {
  'red':12,
  'green':13,
  'blue':14,
};

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
  const filteredData = gameObjectArray.filter((game)=>{
    const accessKey = Object.keys(game)[0];
    if(game[accessKey]?.blue <= filterCondition.blue && game[accessKey]?.red <= filterCondition.red && game[accessKey]?.green <= filterCondition.green) 
      return true;
    return false;
  });
  const sumOfFilteredGame = filteredData.reduce((total, curr)=>{
    return total + Number.parseInt(Object.keys(curr)[0]);
  },0);
  console.log(sumOfFilteredGame);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});
