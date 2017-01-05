(function (window) {

    var app = angular.module("adf.widget.piechart", ['nvd3']);

    app.config(["dashboardProvider", function (dashboardProvider) {
        dashboardProvider
          .widget('piechart', {
              title: 'Pie Chart ',
              description: 'Displays the piechart',
              templateUrl: '{widgetsPath}/piechart/src/view.html',
              controller: 'piechartCtrl',
              reload: true,
              config: {
                  MetricId: 0,
				  ChartType: ""
              },
		edit: {
		  templateUrl: '{widgetsPath}/piechart/src/edit.html'
		      }
          });
    }]);

 
    app.controller('piechartCtrl', ["$scope", "$rootScope", "config", "MetricService", function ($scope, $rootScope, config, MetricService)
	{		
    $scope.options = {
            chart: {
                type: 'pieChart',
				margin : { top: 50, right: 60,bottom: 0,left: 0 },
                width : 190,				
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,				 
                // legend: {  margin: { top: 5, right: 35, bottom: 5,left: 75}  }
            }
        };
        $scope.data = [ {key: "One",y: 5}, { key: "Two", y: 2}, {key: "Three",y: 9},{key: "Four",y: 7},{key: "Five", y: 4} ]	  	  
     }]);
	 
   angular.module("adf.widget.piechart").run(["$templateCache", function ($templateCache) { $templateCache.put("{widgetsPath}/piechart/src/view.html", "<div class=\"panel panel-dashboard\"><div class=\"panel-heading\"><div class=\"row\"><div class=\"col-xs-12 text-center\"><div class=\"controls left\"><i class=\"ion ion-more\"></i></div><div class=\"controls right\"><a class=\"remove\"><i class=\"ion ion-minus-round\"></i></a></div></div></div></div><div class=\"panel-body\">  <nvd3 options=\"options\"  data=\"data\" class=\"ng-isolate-scope\" style=\"display:inline-block;\"></nvd3> </div> <a href=\"#\"><span>View Details</span></a><div class=\"clearfix\"></div></div></div>"); 
    }]);
}(window));



