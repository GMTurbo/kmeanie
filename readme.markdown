# Kmeanie - K-Means Clustering
[![NPM version](https://badge.fury.io/js/kmeanie.svg)](http://badge.fury.io/js/kmeanie)

Need to cluster n-dimensions of points by using their euclidean distances?!  You've come to the right place!

# example

first, we'll write a helper function to give us some points at different dimensions within some range

```
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
```
Now, put 1,000 2D points into 10 clusters

```
//1,000 2D points

var kmeans = new KMEANS();

var randomPoints = getPoints(1000, 2, -10000, 10000);

console.time('kmeans2D-1K');

kmeans.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans2D-1K');
});

> converged!
> { steps: 17,
>   centers:
>   [ [ -269.80181261996694, 2860.553053377027 ],
>     [ 5833.072093112442, -5099.592548894545 ],
>     [ -4856.906471814, -5057.983989099739 ],
>     [ -6648.476382985405, 5628.075809313673 ],
>     [ 6244.6638848369485, 5509.395999255154 ] ] }
> kmeans2D-1K: 22ms

```

put 10,000 2D points into 10 clusters

```
//10,000 2D points

var kmeans = new KMEANS();

var randomPoints = getPoints(10000, 2, -10000, 10000);

console.time('kmeans2D-10K');

kmeans.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans2D-10K');
});

> converged!
> { steps: 31,
>   centers:
>   [ [ -10.81258817699773, -4658.72052934345 ],
>     [ 6720.126079763302, -4670.997785521983 ],
>     [ -5010.967531985597, 5212.658446976244 ],
>     [ -6709.025747946807, -5029.890906162784 ],
>     [ 4982.128251148806, 5322.582076618831 ] ] }
> kmeans2D-10K: 122ms

```

put 100,000 2D points into 10 clusters

```
//100,000 2D points

var randomPoints = getPoints(100000, 2, -10000, 10000);

console.time('kmeans2D-100K');

kmeans.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans2D-100K');
});

> converged!
> { steps: 84,
>   centers:
>   [ [ 6598.572849446031, 6662.067415795253 ],
>     [ -11.026598658867016, 6907.277922585025 ],
>     [ -7547.005574309911, -6683.865916627405 ],
>     [ 2410.644656865913, -6414.866989505585 ],
>     [ 6743.430548904482, 36.99441338597378 ],
>     [ -6699.165924140245, 155.99677203355242 ],
>     [ 68.26466884831255, 577.293353150108 ],
>     [ -2575.83028555005, -6353.432584588735 ],
>     [ 7503.759106733049, -6664.0159088512955 ],
>     [ -6686.744457058717, 6712.86896862405 ] ] }
> kmeans2D-100K: 5459ms

```
put 100,000 3D points into 10 clusters

```
//100,000 2D points

var randomPoints = getPoints(100000, 3, -10000, 10000);

console.time('kmeans3D-100K');

kmeans.compile(randomPoints, 10, function(err, data){
  
  if(err){ console.error(err); return; }
  
  console.log('converged!');
  
  console.dir(data);
  
  console.timeEnd('kmeans3D-100K');
});

> { steps: 69,
>   centers:
>   [ [ -4626.323037789849, 6963.007076504003, -4695.28269886213 ],
>     [ 5527.636026441868, -5161.552205771855, -5223.084138065799 ],
>     [ 5485.738000640231, 5241.30682629263, -5308.675678502568 ],
>     [ -5303.414643407277, 5166.271446901717, 5479.859885151625 ],
>     [ 718.9267560111055, 114.61086887508236, 721.7379254134371 ],
>     [ -4535.5580035759, -6893.7911363388685, -4753.681173444622 ],
>     [ -5625.424255910254, 140.0605795601778, -5619.852738595822 ],
>     [ 5211.686378137746, -5385.873943626882, 5430.532739545472 ],
>     [ 5395.054898026635, 5418.463780200259, 5334.659010357486 ],
>     [ -5413.078728768352, -5234.521609348074, 5292.965370203543 ] ] }
> kmeans3D-100K: 4740ms

```

# details

k-means clustering is a method of vector quantization, originally from signal processing, that is popular for cluster analysis in data mining. k-means clustering aims to partition n observations into k clusters in which each observation belongs to the cluster with the nearest mean, serving as a prototype of the cluster. This results in a partitioning of the data space into Voronoi cells. [thanks [wikipedia](https://en.wikipedia.org/wiki/K-means_clustering)]

# usage

```
usage:

  var KMEANS = require('kmeanie');
  
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
  
  //1,000 2D points
  
  var randomPoints = getPoints(1000, 2, -10000, 10000);
  
  //time how long it takes for centers to converge
  console.time('kmeans2D-1K');
  
  //listen for centers positions update
  //this is handy for animations
  kmeans.onCentersUpdated = function(newCenters, iteration){
    console.log('iteration: ' + iteration);
    console.dir(newCenters);
  };
  
  //compile the kmeans algorithm with the point cloud, the number of desired clusters and a cb
  kmeans.compile(randomPoints, 10, function(err, data){
    
    if(err){ console.error(err); return; }
    
    console.log('converged!');
    
    console.dir(data);
    
    console.timeEnd('kmeans2D-1K');
  });
```

# scripts

## test

runs the example tests.

# methods

``` js
var KMEANS = require('kmeanie');
```

## var tps = new KMEANS();

Create a k-means algo instance;

## kmeans.compile(points, numOfClusters, cb);

The more fitpoints you have, the longer it takes to compile.
The more dimensions you have, the longer it takes to compile.
The more clusters you have, the longer it takes to compile.
(starting to see a pattern?)

`cb(err, data)` signature.

## kmeans.onCentersUpdated = function(newCenters, iteration){..};

* update event for center adjustment
* `cb(newCenters, iteration)` signature
* `newCenters` is the newly moved cluster center points
* `iteration` is the current iteration count


# install

With [npm](https://npmjs.org) do:

```
npm install kmeanie
```
to get the library.

# license

MIT