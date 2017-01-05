(function(window, undefined) {'use strict';
/*
 * The MIT License
 *
 * Copyright (c) 2015, Sebastian Sdorra
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */



angular.module('adf.widget.markdown', ['adf.provider', 'btford.markdown'])
  .config(["dashboardProvider", function(dashboardProvider){
    dashboardProvider
      .widget('markdown', {
        title: 'Markdown',
        description: 'Markdown widget',
        controller: 'markdownCtrl',
        templateUrl: '{widgetsPath}/markdown/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/markdown/src/edit.html',
          reload: false
        }
      });
  }]).controller('markdownCtrl', ["$scope", "config", function($scope, config){
    if (!config.content){
      config.content = '';
    }
    $scope.config = config;
  }]);

angular.module("adf.widget.markdown").run(["$templateCache", function($templateCache) {$templateCache.put("{widgetsPath}/markdown/src/edit.html","<form role=form><div class=form-group><label for=content>Markdown content</label> <textarea id=content class=form-control rows=5 ng-model=config.content></textarea></div></form>");
$templateCache.put("{widgetsPath}/markdown/src/view.html","<div class=markdown btf-markdown=config.content></div>");}]);})(window);