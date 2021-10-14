function Benchmark(name, functions ) {
  const {benchFunc = function(){}, setupFunc = function(){}, repeat = 1} = functions
  var times = [], 
    averageSum = 0, // 平均总和
    options = {};

  this.run = function() { 
    var startTime, endTime
    for ( var i=0; i<repeat; ++i ) {
      startTime = Date.now()
      benchFunc(options) // 外部
      endTime = Date.now()
      averageSum += endTime - startTime; 
      times.push( endTime - startTime )
    } 
  }

  this.setup = function() { setupFunc(options) }

  Object.defineProperty( this, "times", { get: function() { return times; } });
  Object.defineProperty( this, "name", { get: function() { return name; } });
  Object.defineProperty( this, "average", { get: function() { return averageSum/repeat; } });
  Object.defineProperty( this, "skip", { get: function() { return functions.skip; } })
}

function BenchmarkPool() {
  var benchmarks = []
  this.add = function( benchmark ) { benchmarks.push( benchmark ) }

  this.run = function(callback) {
    for ( var i=0,l=benchmarks.length; i<l; ++i ) {
      if (benchmarks[i].skip) continue // 跳过
      benchmarks[i].setup();
      benchmarks[i].run();
      callback(benchmarks[i])
    }
  }
}  