angular.module('todoApp', [])
  .controller('TodoListController', ['$scope', '$http', '$templateCache', function ($scope, $http, $templateCache) {

    $scope.obData = {
      URL: 'http://127.0.0.1:5500/js/data.json',
      dataURL: [],
      xColumn: 0,
      xline: 0
    };

    $scope.makCatalog = {
      xCatalogName:[],
      xCatalogDate:[]
    };
    $scope.method = 'GET';

    $scope.getProperty = () => {
      $http({ method: $scope.method, url: $scope.obData.URL, cache: $templateCache }).
        then(function (response) {
          $scope.status = response.status;
          $scope.obData.dataURL = response.data;
          console.log(response.data);
        }, function (response) {
          $scope.data = response.data || 'Request failed';
          $scope.status = response.status;
        });
    };

    $scope.showChart = () => {
      Highcharts.chart('container', {
        chart: {
          zoomType: 'xy'
        },
        title: {
          text: 'Average Monthly Weather Data for Tokyo',
          align: 'left'
        },
        subtitle: {
          text: 'Source: WorldClimate.com',
          align: 'left'
        },
        xAxis: [{
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          crosshair: true
        }],
        yAxis: [{ // Primary yAxis
          labels: {
            format: '{value}°C',
            style: {
              color: Highcharts.getOptions().colors[2]
            }
          },
          title: {
            text: 'Temperature',
            style: {
              color: Highcharts.getOptions().colors[2]
            }
          },
          opposite: true

        }, { // Secondary yAxis
          gridLineWidth: 0,
          title: {
            text: 'Rainfall',
            style: {
              color: Highcharts.getOptions().colors[0]
            }
          },
          labels: {
            format: '{value} mm',
            style: {
              color: Highcharts.getOptions().colors[0]
            }
          }

        }, { // Tertiary yAxis
          gridLineWidth: 0,
          title: {
            text: 'Sea-Level Pressure',
            style: {
              color: Highcharts.getOptions().colors[1]
            }
          },
          labels: {
            format: '{value} mb',
            style: {
              color: Highcharts.getOptions().colors[1]
            }
          },
          opposite: true
        }],
        tooltip: {
          shared: true
        },
        legend: {
          layout: 'vertical',
          align: 'left',
          x: 80,
          verticalAlign: 'top',
          y: 55,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
        },
        series: [{
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
          tooltip: {
            valueSuffix: ' mm'
          }

        }, {
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: [42.9, 30, 44, 129.2, 144.0, 18.0, 55.6, 67.5, 123.4, 46.1, 95.6, 66.4],
          tooltip: {
            valueSuffix: ' mm'
          }

        }, {
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: [20.9, 55.5, 39.4, 77.2, 100.0, 88.0, 111.6, 48.5, 123.4, 132.1, 56.6, 70.4],
          tooltip: {
            valueSuffix: ' mm'
          }

        }, {
          name: 'Temperature',
          type: 'line',
          yAxis: 2,
          data: [1016, 1016, 1015.9, 1015.5, 1012.3, 1009.5, 1009.6, 1010.2, 1013.1, 1016.9, 1018.2, 1016.7],
          marker: {
            enabled: false
          },
          tooltip: {
            valueSuffix: ' mb'
          }

        }, {
          name: 'Temperature',
          type: 'line',
          data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
          tooltip: {
            valueSuffix: ' °C'
          }
        }],
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                floating: false,
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                x: 0,
                y: 0
              }
            }
          }]
        }
      });
    }
    $scope.onCountChange = function (max) {
      var input = [];
      for (var i = 1; i <= max; i++) input.push(i);
      return input;
    };
    
    // Group saleDate
    $scope.groupSaleDate = () =>{
      
    }
  }]);
