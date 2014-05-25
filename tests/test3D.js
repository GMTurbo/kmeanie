
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

var kmeans4 = new KMEANS();
var kmeans5 = new KMEANS();
var kmeans6 = new KMEANS();

//1,000 3D points

var randomPoints = getPoints(1000, 3, -10000, 10000);

console.time('kmeans3D-1K');

kmeans4.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans3D-1K');
});

//10,0000 3D points

var randomPoints = getPoints(10000, 3, -10000, 10000);

console.time('kmeans3D-10K');

kmeans5.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans3D-10K');
});

//100,0000 3D points

var randomPoints = getPoints(100000, 3, -10000, 10000);

console.time('kmeans3D-100K');

kmeans6.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans3D-100K');
});