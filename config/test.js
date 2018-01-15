var amne = function(n, k, prices) {
  var i= 0;
  while(prices[i+k-1] !== undefined && (i+k)<=n ) {
  var temp = [];
  for(var j = 0; j < k; j++) {
    temp.push(prices[i+j])
  }
  console.log(temp);
  var result = 0;
  for(var m=0; m < temp.length-1; m++) {
    if (temp[m]<temp[m+1]) {
      result++;
    }
    if (temp[m]> temp[m+1]) {
      result--;
    }
  }
   if (Math.abs(result) === temp.length-1) {
     result += result > 0 ? 1 : -1;
   }
  i++;
  //console.log('result:', result);
    console.log(result);
  }
}

var prices = [188930, 194123, 201345, 154243, 154243, 200190,780000];
amne(6, 3, prices);