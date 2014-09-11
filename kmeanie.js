
//for kmeans,
// first group points,
// then calculate new center (avgX, avgY);
// then move

var KMEANS = function(options){

  options = options || {};

  if(!options.returnBodies)
    options.returnBodies = false;

  var dimensions = 0, pnts = [];

  this.centers = [];

  this.onCentersUpdated = null;

  this.compile = function(clusterpoints, count, cb){

    setTimeout(function(){

      pnts = clusterpoints.slice(0);

      //disperse the centers in the space
      disperseCenters(getDimensions(pnts), count);

      var converged = false;

      var oldCenters = [];
      var steps = 0;
      //iterate
      while(!converged){

          cluster();

          converged = checkForStable(oldCenters);

          oldCenters = this.centers.map(function(cent){
            return cent.center;
          });

          if(this.onCentersUpdated){
            this.onCentersUpdated(oldCenters, steps + 1);
          }

          steps++;
      }

      var data = {
        steps: steps,
        centers: options.returnBodies ? this.centers :
         this.centers.map(function(cent){ return cent.center;} )
      };

      cb(null, data);

    }.bind(this), 0);

  };

  var checkForStable = function(oldCenters){

    if(oldCenters.length === 0 ) return false;

    var newCenters = this.centers.map(function(cent){
            return cent.center;
          });

    var tolerance = 1e-6;

    for(var i = 0 ; i < newCenters.length; i++){

        if(distance(newCenters[i], oldCenters[i]) > tolerance)
          return false;

    }

    return true;

  }.bind(this);

  var getAverages = function(points){
    if(points.length == 0) return [0,0];
    var arr = [];
    for(var i = 0 ; i < points[0].length; i++)
      arr.push(0);

    var sums = points.reduce(function(sums, current){
      for(var i = 0 ; i < current.length; i++){
        sums[i]+=current[i];
      }
      return sums;
    }, arr);
    return sums.map(function(curr) { return curr/points.length; });
  };

  //this gets the range in each dimension to
  //disperse the cluster centers
  var getDimensions = function(points){

      dimensions = points[0].length;
      var i, maximums = [], minimums = [];

      for( i = 0 ; i < dimensions; i++){
        maximums.push(-1e6);
        minimums.push(1e6);
      }

      for( i = 0 ; i < points.length; i++){
        for(var j = 0; j < dimensions; j++){
          if(points[i][j] > maximums[j])
            maximums[j] = points[i][j];
          if(points[i][j] < minimums[j])
            minimums[j] = points[i][j];
        }
      }

      var retArr = [];
      for(i = 0 ; i < dimensions ; i++){
        retArr.push([minimums[i], maximums[i]]);
      }

      return retArr;
  };

  //disperse centers randomly within the space
  var disperseCenters = function(ranges, num){

    this.centers = [];

    for(var i = 0 ; i < num ; i++){

      var cent = [];

      ranges.forEach(function(dim){
        cent.push(dim[0] + Math.random()*(dim[1] - dim[0]));
      });

      this.centers.push({
        center: cent,
        bodies: []
      });

    }

  }.bind(this);

  var distance = function(pnt1, pnt2){
    var sum = 0;
    if(!pnt1.length)
      return Math.sqrt(Math.pow(pnt1 - pnt2, 2));
    for(var i = 0 ; i < pnt1.length ; i++){
      sum += (Math.pow(pnt1[i] - pnt2[i], 2));
    }
    return Math.sqrt(sum);
  };

  var cluster = function(){

    var min, dis, assignToIndex, i;

    this.centers.forEach(function(cluster){
      cluster.bodies = [];
    });

    //assign step
    for( i = 0 ; i < pnts.length ; i++){

      min = 1e6;

      assignToIndex = -1;

      for(var j = 0 ; j < this.centers.length ; j++){

        dis = distance(pnts[i], this.centers[j].center);

        if(dis < min){
          min = dis;
          assignToIndex = j;
        }

      }

      this.centers[assignToIndex].bodies.push(pnts[i]);
    }

    //move step
    for( i = 0 ; i < this.centers.length ; i++){
      this.centers[i].center = getAverages(this.centers[i].bodies);
    }

  }.bind(this);

};

module.exports = KMEANS;
