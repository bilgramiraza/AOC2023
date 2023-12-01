function numberExtractor(str){
  let firstNumber, lastNumber;
  for(let i=0; i<str.length; i++){
    if(Number.isInteger(+str[i])){
      firstNumber = Number.parseInt(str[i]);
      break;
    }
  }
  for(let j=str.length; j>=0; j--){
    if(Number.isInteger(+str[j])) {
      lastNumber = Number.parseInt(str[j]);
      break;
    }
  }
  return (firstNumber*10)+lastNumber;
}

const fs = require('fs');
fs.readFile('text', 'utf8', (err, data)=>{
  if(err) throw err;
  const lines = data.toString().split('\n');
  let sum = lines.reduce((total, curr) =>{
    if(curr === '')return total;
    return total+numberExtractor(curr);
  },0);
  console.log('sum: ', sum);
});
