(function (window) {

    var app = angular.module("adf.widget.counter", []);

    app.config(["dashboardProvider", function (dashboardProvider) {
        dashboardProvider
          .widget('counter', {
              title: 'Metric Counter',
              description: 'Display the metric counter',
              templateUrl: '{widgetsPath}/counter/src/view.html',
              controller: 'counterCtrl',
              reload: true,
              config: {
                  MetricId: 0
              },
		edit: {
		  templateUrl: '{widgetsPath}/counter/src/edit.html'
		}
              

          });
    }]);

    app.service('MetricService', function () {
        var observerCallbacks = [];
        var Metrics = [];
        this.registerObserver = function ($scope, cb, preventImmediate) {
            observerCallbacks.push(cb);
            if (preventImmediate !== true) {
                cb();
            }
            $scope.$on('$destroy', function () {
                var index = observerCallbacks.indexOf(cb);
  		observerCallbacks.splice(index, 1);
            });
        };
        function notifyObservers() {
            observerCallbacks.forEach(function (cb) {
                cb();
            });
        };
        this.SetMetrics = function (metrics) {
            this.Metrics = metrics;
            notifyObservers();
        };
        this.GetMetric = function(ids)
        {
	    var result = _.filter(this.Metrics, function(o) { 
    			return o.id == ids; 
 		});
	    return _.head(result);
        };
        
        this.GetMetrics = function(ids)
        {
	    var result = _.filterByValues(this.Metrics, 'id', ids);
	    return result;
        };        
        
        
        this.GetMetricDropdownList = function(ids)
        {
                        return this.Metrics;
        };  
		
_.mixin({
    'filterByValues': function(collection, key, values) {
        return _.filter(collection, function(o) {
            return _.includes(values, resolveKey(o, key));
        });
    }
});

function resolveKey(obj, key) {
    return (typeof key == 'function') ? key(obj) : _.get(obj, key);
}
            
        
        return this;
    });
    app.controller('counterCtrl', ["$scope", "$rootScope", "config", "MetricService", function ($scope, $rootScope, config, MetricService) {
              var updateMetric = function () {
                  $scope.Metric = MetricService.GetMetric(config.MetricId);
				  console.log("Metric ID");
                  console.log($scope.Metric);				  
              };
			  
              MetricService.registerObserver($scope, updateMetric, true);
			   var updateMetricDropDown = function () {
                  $scope.MetricDropDownList = MetricService.GetMetric(config.MetricId);
                  console.log("dropdown");
                  console.log($scope.MetricDropDownList);
              };
              MetricService.registerObserver($scope, updateMetricDropDown, true);
          }]);

   angular.module("adf.widget.counter").run(["$templateCache", function ($templateCache) { $templateCache.put("{widgetsPath}/counter/src/view.html", "<div class=\"panel panel-dashboard\"><div class=\"panel-heading\"><div class=\"row\"><div class=\"col-xs-12 text-center\"><div class=\"controls left\"><i class=\"ion ion-more\"></i></div><div class=\"controls right\"><a class=\"remove\"><i class=\"ion ion-minus-round\"></i></a></div><div class=\"center\">{{Metric.value}}</div></div></div></div><div class=\"panel-body\"><div class=\"huge\">{{Metric.value}}</div><a href=\"#\"><span>View Details</span></a><div class=\"clearfix\"></div></div></div>"); 
    }]);
}(window));
