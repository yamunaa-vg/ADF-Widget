(function (window) {

    var app = angular.module("adf.widget.epoch.livearea", []);

    app.config(["dashboardProvider", function (dashboardProvider) {
        dashboardProvider
          .widget('livearea', {
              title: 'Live Area Chart',
              description: 'Display the metric area chart',
              templateUrl: '{widgetsPath}/livearea/src/view.html',
              controller: 'liveAreaCtrl',
              reload: true,
              config: {
                  MetricIds: [1,2],
                  ChartType: ""
              },
		edit: {
		  templateUrl: '{widgetsPath}/livearea/src/edit.html'
		}
              

          });
    }]);

    app.controller('liveAreaCtrl', ["$scope", "$rootScope", "config", "MetricService", function ($scope, $rootScope, config, MetricService) {
              
              config.MetricIds = [1,2];
              //config.ChartType = "Area"
              var updateMetric = function () {
                  $scope.Metric = MetricService.GetMetrics(config.MetricIds);
                  console.log($scope.Metric);
                  console.log("Metric");
                              var timestamp = ((new Date()).getTime() / 1000) | 0;
		              var chartEntry = [];
		              //console.log(data);
		              $scope.Metric.forEach(function (dataItem) {
		                  chartEntry.push({ time: timestamp, y: dataItem.value });
		              });
		              $scope.realtimeFeed = chartEntry;

              };
              MetricService.registerObserver($scope, updateMetric, true);
              
              $scope.realtime = generateLineData();
			   console.log("realtime");
			   console.log($scope.realtime);
              $scope.areaAxes = ['left','right','bottom'];
              $scope.barAxes = ['left','right','bottom'];
              
                      function generateLineData() {
	                  var data2 = [
	                      { label: 'Layer 1', values: [] },
	                      { label: 'Layer 2', values: [] },
	                  ];
	                  for (var i = 0; i < 256; i++) {
	                      var x = 40 * (i / 256) - 20;
	                      data2[0].values.push({ x: x, y: Math.sin(x) * (x / 4) });
	                      data2[1].values.push({ x: x, y: Math.cos(x) * (x / Math.PI) });
	                  }
	                  return data2;
	              }
          }]);

   angular.module("adf.widget.epoch.livearea").run(["$templateCache", function ($templateCache) { $templateCache.put("{widgetsPath}/livearea/src/view.html", "<div class=\"row\"><div class=\"col-lg-12\"><div class=\"widget panel panel-dashboard\"><div class=\"widget panel-body\" ><epoch-live-area ng-if=\"config.ChartType =='Area'\" chart-class=\"category10\" chart-height=\"200\" chart-data=\"realtime\" chart-stream=\"realtimeFeed\" chart-axes=\"areaAxes\"></epoch-live-area><epoch-live-line ng-if=\"config.ChartType =='Line'\" chart-class=\"category10\" chart-height=\"200\" chart-data=\"realtime\" chart-stream=\"realtimeFeed\" chart-axes=\"areaAxes\"></epoch-live-line>   <epoch-live-bar ng-if=\"config.ChartType =='Bar'\" chart-class=\"category10\" chart-height=\"200\" chart-data=\"realtime\" chart-stream=\"realtimeFeed\" chart-axes=\"barAxes\"></epoch-live-bar> </div> </div></div></div>"); 
   //angular.module("adf.widget.epoch.livearea").run(["$templateCache", function ($templateCache) { $templateCache.put("{widgetsPath}/livearea/src/view.html", "<epoch-live-area chart-class=\"category10\" chart-height=\"200\" chart-data=\"realtimeArea\" chart-stream=\"realtimeAreaFeed\" chart-axes=\"areaAxes\"></epoch-live-area>"); 
   $templateCache.put("{widgetsPath}/livearea/src/edit.html","<form role=form><div class=form-group><label for=location>Metric </label> <input type=location class=form-control id=location ng-model=config.MetricId placeholder=\"Enter Metric Id\"></div><div class=form-group><label for=chartType>Chart Type </label> <select name=\"chartType\" ng-model=\"config.ChartType\"><option value=\"Area\">Area Chart</option><option value=\"Bar\">Bar Chart</option><option value=\"Line\">Line Chart</option></select></div></form>"); }]);
}(window));
