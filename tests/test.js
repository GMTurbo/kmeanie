
var KMEANS = require('../kmeans');

//utility function to get random points

var getPoints = function(count, dimensions, min, max){
  
  var points = [];
  
  for(var i = 0 ; i < count; i++){
    var arr = [];
    for(var j = 0 ; j < dimensions; j++){
      arr.push(min + Math.random()*(max - min));
    }
    points.push(arr);
  }
  
  return points;
  
};

var kmeans = new KMEANS();

var randomPoints = getPoints(100000, 3, -10000, 10000);

// kmeans.onCentersUpdated = function(centers){
  
//   console.dir(centers);
  
// };

console.time('kmeans');

kmeans.compile(randomPoints, 5, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans');
});