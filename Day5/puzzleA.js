const fs = require('fs');
const { performance } = require('perf_hooks');

function parseData(data){
  const lines = data.split('\n\n');
  const seeds = lines.shift().split(': ')[1].split(' ');
  const maps = lines.map(line=>{
    const mapLine = line.split(':\n');
    const mapName = mapLine.shift();
    const mapData = mapLine
      .toString()
      .split('\n')
      .map(item=>item
        .split(' '))
      .filter(data=>data[0]!=='')
      .map(item=>[+item[1],+item[0],+item[2]])
      .sort((array1, array2)=>{
        if(array1[0]<array2[0]) return -1;
        else if(array1[0]>array2[0]) return 1;
        return 0;
      });
    return [mapName, mapData];
  });
  return {seeds, maps};
}

function mapConverter(input, map){
  if(input < map[0][0] || input > (map[map.length-1][0]+map[map.length-1][2]))  return input;
  
  for(let i=0; i<map.length;i++)
    if(input>=map[i][0] && input <(map[i][0]+map[i][2]))
      return (input-map[i][0])+map[i][1];

  return input;
}

fs.readFile('./test', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const {seeds, maps} = parseData(data);
  let lowestLocation = Number.POSITIVE_INFINITY;
  for(let i=0; i<seeds.length; i+=2){
    const start = +seeds[i];
    const range = +seeds[i+1];
    for(let j=start;j<start+range;j++){
      const sts = mapConverter(j, maps[0][1]);
      const stf = mapConverter(sts, maps[1][1]);
      const ftw = mapConverter(stf, maps[2][1]);
      const wtl = mapConverter(ftw, maps[3][1]);
      const ltt = mapConverter(wtl, maps[4][1]);
      const tth = mapConverter(ltt, maps[5][1]);
      const htl = mapConverter(tth, maps[6][1]);
      if(htl<lowestLocation)  lowestLocation = htl;
    }
  }
  console.log(lowestLocation);
  let endTime = performance.now();
  console.log('runtime: ',endTime-startTime, 'ms');
});
