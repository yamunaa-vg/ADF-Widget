(function (window) {

    var app = angular.module("adf.widget.progress", []);

    app.config(["dashboardProvider", function (dashboardProvider) {
        dashboardProvider
          .widget('progress', {
              title: 'Progress Bar',
              description: 'Displays the progress',
              templateUrl: '{widgetsPath}/progress/src/view.html',
              controller: 'progressCtrl',
              reload: true,
              config: {
                  MetricIds: [1,2]
              },
	 		
		edit: {
		  templateUrl: '{widgetsPath}/progress/src/edit.html'
		}
          });
    }]);

 
    app.controller('progressCtrl', ["$scope", "$rootScope", "config", "MetricService", function ($scope, $rootScope, config, MetricService)
{
	 config.MetricIds = [1,2];
	 var progressMetric = function () {		           			  
     $scope.Metric = MetricService.GetMetrics(config.MetricIds);				  				                     
              };
    MetricService.registerObserver($scope, progressMetric, true);
				                 	                  
   $scope.progressData ;    					  
  $scope.realData = setInterval(function()
  {	 
        $scope.progressData = Math.random() * 100 | 0;
		if ($scope.progressData == 100)
		{
			$scope.progressData =0;
		}		
        $scope.$apply();       
    }, 4000);							  	           	
}]);

   angular.module("adf.widget.progress").run(["$templateCache", function ($templateCache) { $templateCache.put("{widgetsPath}/progress/src/view.html", "<div class=\"panel panel-dashboard\"><div class=\"panel-heading\"><div class=\"row\"><div class=\"col-xs-12 text-center\"><div class=\"controls left\"><i class=\"ion ion-more\"></i></div><div class=\"controls right\"><a class=\"remove\"><i class=\"ion ion-minus-round\"></i></a></div></div></div></div><div class=\"panel-body\"> <div class=progress> <div class=\"progress-bar progress-bar-striped active\" style=\"width:{{progressData}}%\" ><span>{{progressData}}</span></div></div> <a href=\"#\"><span>View Details</span></a><div class=\"clearfix\"></div></div></div>"); 
    $templateCache.put("{widgetsPath}/progress/src/edit.html","<form role=form><div class=form-group><label for=location>Metric </label> <input type=location class=form-control id=location ng-model=config.MetricId placeholder=\"Enter Metric Id\"></div></form>");
   }]);
}(window));
