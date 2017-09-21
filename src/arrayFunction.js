// eslint-disable-next-line
Array.prototype.getNumberIndex = function(number){
  this.forEach(number => {
    if(typeof number !== "number"){
      return false;
    }
  });
  for(let i = 0; i < this.length; i++){
    if(number < this[i]){
      return i;
    }
  }
  return false;
};