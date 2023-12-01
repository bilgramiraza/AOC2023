const fs = require('fs');
const { performance } = require('perf_hooks');

let numbersHashmap = {
  'one':1,
  'two':2,
  'three':3,
  'four':4,
  'five':5,
  'six':6,
  'seven':7,
  'eight':8,
  'nine':9,
};

function getFirstWordInteger(str){
  let earlistInteger = {
    number:0,
    index:str.length,
  };

  Object.keys(numbersHashmap).forEach(num =>{
    if(str.includes(num)){
      const index = str.indexOf(num)
      if(index<earlistInteger.index){
        earlistInteger.number = numbersHashmap[num];
        earlistInteger.index = index;
      }
    }
  });
  return earlistInteger;
}

function getLastWordInteger(str){
  let latestInteger = {
    number:0,
    index:-1,
  };

  Object.keys(numbersHashmap).forEach(num =>{
    if(str.includes(num)){
      const index = str.lastIndexOf(num)
      if(index>latestInteger.index){
        latestInteger.number = numbersHashmap[num];
        latestInteger.index = index;
      }
    }
  });
  return latestInteger;
}

function getFirstNumber(str){
  const firstInteger = +str.match(/\d/);
  let integerIndex = str.indexOf(firstInteger);
  if(integerIndex === -1) integerIndex = str.length;
  const { index:wordIndex, number:wordNumber } = getFirstWordInteger(str);
  return integerIndex<wordIndex ? firstInteger : wordNumber;
}

function getLastInterger(str){
  for(let i=str.length-1; i>=0;i--){
    if(!isNaN(str[i]))
      return +str[i];
  }
  return 0;
}

function getLastNumber(str){
  let lastInteger = getLastInterger(str);
  let integerIndex = str.lastIndexOf(lastInteger);
  const { index:wordIndex, number:wordNumber } = getLastWordInteger(str);
  return integerIndex>wordIndex ? lastInteger : wordNumber;
}

function numberExtractor(str){
  const firstNumber = getFirstNumber(str);
  const lastNumber = getLastNumber(str);
  return (firstNumber*10)+lastNumber;
}

fs.readFile('text', 'utf8', (err, data)=>{
  if(err) throw err;
  let startTime = performance.now();
  const lines = data.toString().split('\n');
  let sum = lines.reduce((total, curr) =>{
    if(curr === '')return total;
    return total+numberExtractor(curr);
  },0);
  let endTime = performance.now();
  console.log('sum: ', sum);
  console.log('runtime: ',endTime-startTime, 'ms');
});
