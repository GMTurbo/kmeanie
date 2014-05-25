
var KMEANS = require('../kmeanie');

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

var kmeans1 = new KMEANS();
var kmeans2 = new KMEANS();
var kmeans3 = new KMEANS();

//1,000 2D points

var randomPoints = getPoints(1000, 2, -10000, 10000);

console.time('kmeans2D-1K');

//listen for centers positions update
kmeans1.onCentersUpdated = function(newCenters, iteration){
    console.log('iteration: ' + iteration);
    console.dir(newCenters);
};

kmeans1.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans2D-1K');
});

//10,000 2D points

var randomPoints = getPoints(10000, 2, -10000, 10000);

console.time('kmeans2D-10K');

kmeans2.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans2D-10K');
});

//100,000 2D points

var randomPoints = getPoints(100000, 2, -10000, 10000);

console.time('kmeans2D-100K');

kmeans3.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans2D-100K');
});