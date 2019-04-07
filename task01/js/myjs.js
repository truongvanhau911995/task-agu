angular.module('todoApp', [])
  .controller('TodoListController', ['$scope', '$http', '$templateCache', function ($scope, $http, $templateCache) {

    $scope.obData = {
      URL: 'http://127.0.0.1:5500/js/data.json',
      dataURL: [],
      yColumn: 0,
      yLine: 0,
      Cols:[],
      xCatalog:'',
      Lines:[],
      listDateFromTo:[],
      dataAfterGroupDate:[]
    };

    $scope.makCatalog = {
      xCatalogName: [],
      xCatalogDate: []
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
     
      $scope.fillProperty($scope.obData.xCatalog);
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
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          tooltip: {
            valueSuffix: ' mm'
          }

        }, {
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: [0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          tooltip: {
            valueSuffix: ' mm'
          }

        }, {
          name: 'Rainfall',
          type: 'column',
          yAxis: 1,
          data: [0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
    };

    // add ycolumns
    $scope.$watch('obData.yColumn', function (data) {
      $scope.obData.Cols = [];
      for (var i = 0; i < data; i++){
        $scope.obData.Cols.push({index:'column' + i, val: "saleAmount1",type:'column'});
      } 
    });

    $scope.$watch('obData.yLine', function (data) {
      $scope.obData.Lines = [];
      for (var i = 0; i < data; i++) {
        $scope.obData.Lines.push({index:'line' + i, val: "saleAmount1",type:'line'});
      }
    });

    // group by type
    $scope.groupCatalog = (type)=>{
      var xCatalog = [];
      var objectData = {};
      angular.forEach($scope.obData.dataURL, function(data) {
         var da;
         var temp;
         if(type == 'saleDate'){
            da = data.saleDate.slice(0,7);
         }
         if(type == 'saleName'){
            da = data.saleName;
         }
         if(!objectData[da]){
              objectData[da] = {namegroup:da,saleAmount1:0,saleAmount2:0,saleAmount3:0,saleAmount4:0,saleAmount5:0,saleCost1:0,saleCost2:0,saleCost3:0,saleCost4:0,saleCost5:0};
              xCatalog.push(objectData[da]);
          }

          objectData[da].saleAmount1 += Math.round(data.saleAmount1);
          objectData[da].saleAmount2 += Math.round(data.saleAmount2);
          objectData[da].saleAmount3 += Math.round(data.saleAmount3);
          objectData[da].saleAmount4 += Math.round(data.saleAmount4);
          objectData[da].saleAmount5 += Math.round(data.saleAmount5);
          objectData[da].saleCost1 += Math.round(data.saleCost1);
          objectData[da].saleCost2 += Math.round(data.saleCost2);
          objectData[da].saleCost3 += Math.round(data.saleCost3);
          objectData[da].saleCost4 += Math.round(data.saleCost4);
          objectData[da].saleCost5 += Math.round(data.saleCost5);
      });
      return xCatalog;
    };

    $scope.initData = () =>{}
    // fill Property
    $scope.fillProperty = (xCatalog) => {
      switch(xCatalog){
        case 'saleName':
          $scope.makCatalog.xCatalogName =_.sortBy($scope.groupCatalog('saleName'),'namegroup');
          console.log($scope.makCatalog.xCatalogName);
          break;
        case 'saleDate':
          var dataGroupByDate = [], obj = {};
          $scope.makCatalog.xCatalogDate = _.sortBy($scope.groupCatalog('saleDate'),'namegroup');// save list group by saleDate
          $scope.obData.listDateFromTo = $scope.getDate($scope.makCatalog.xCatalogDate[0].namegroup,$scope.makCatalog.xCatalogDate[$scope.makCatalog.xCatalogDate.length-1].namegroup);
          // save 
          angular.forEach($scope.obData.listDateFromTo,function(data){
               obj[data.yearmonth] = {namegroup:data.yearmonth,saleAmount1:0,saleAmount2:0,saleAmount3:0,saleAmount4:0,saleAmount5:0,saleCost1:0,saleCost2:0,saleCost3:0,saleCost4:0,saleCost5:0};
               $scope.obData.dataAfterGroupDate.push(obj[data.yearmonth]);
          });
          console.log($scope.obData.dataAfterGroupDate);
          // Group array 
          for (var i = 0; i < $scope.obData.dataAfterGroupDate.length; i++) {
              for (var j = 0; j < $scope.makCatalog.xCatalogDate.length; j++) {
                  if ($scope.obData.dataAfterGroupDate[i].namegroup == $scope.makCatalog.xCatalogDate[j].namegroup) {
                    $scope.obData.dataAfterGroupDate[i].saleAmount1 = $scope.makCatalog.xCatalogDate[j].saleAmount1;
                    $scope.obData.dataAfterGroupDate[i].saleAmount2 = $scope.makCatalog.xCatalogDate[j].saleAmount2;
                    $scope.obData.dataAfterGroupDate[i].saleAmount3 = $scope.makCatalog.xCatalogDate[j].saleAmount3;
                    $scope.obData.dataAfterGroupDate[i].saleAmount4 = $scope.makCatalog.xCatalogDate[j].saleAmount4;
                    $scope.obData.dataAfterGroupDate[i].saleAmount5 = $scope.makCatalog.xCatalogDate[j].saleAmount5;
                    $scope.obData.dataAfterGroupDate[i].saleCost1   = $scope.makCatalog.xCatalogDate[j].saleCost1;
                    $scope.obData.dataAfterGroupDate[i].saleCost2   = $scope.makCatalog.xCatalogDate[j].saleCost2;
                    $scope.obData.dataAfterGroupDate[i].saleCost3   = $scope.makCatalog.xCatalogDate[j].saleCost3;
                    $scope.obData.dataAfterGroupDate[i].saleCost4   = $scope.makCatalog.xCatalogDate[j].saleCost4;
                    $scope.obData.dataAfterGroupDate[i].saleCost5   = $scope.makCatalog.xCatalogDate[j].saleCost5;
                   }
              }
          }
         // console.log($scope.obData.dataAfterGroupDate);
          break;
        default:
      }
    };


    // get month
    $scope.getMonth = (value) => {
      let index = 0;
      value = value.split(""); // tách string thành mảng ký tự
      value.forEach((element, key) => { // duyệt qua mảng và lấy giá trị index của "/"
        if (element === "/") {
          index = key + 1;
        }
      });
      value = value.join(""); // kết hợp mảng ký tự lại thánh tring
      return value.slice(index); // trả ra mảng mới bắt đầu từ giá trị index + 1 => sau dấu "/"
    }

    //get year
    $scope.getYear = (value) => {
      let index = 0;
      value = value.split(""); // tách string thành mảng ký tự
      value.forEach((element, key) => { // duyệt qua mảng và lấy giá trị index của "/"
        if (element === "/") {
          index = key;
        }
      });
      value = value.join(""); // kết hợp mảng ký tự lại thánh string
      return value.slice(0, index); // trả ra mảng mới bắt đầu từ 0 -> index => trước dấu "/"     
    }

    // get date min and max
    $scope.getDate = (dateOne, dateTwo) => {
      var result=[]; //init
      var monthString = {1:'Jan',2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul',8:'Aug', 9:'Sept', 10:'Oct', 11:'Nov',12:'Dec'};
      var monthnum = {1:'01',2:'02', 3:'03', 4:'04', 5:'05', 6:'06', 7:'07',8:'08', 9:'09', 10:'10', 11:'11',12:'12'};
      let len = Math.abs($scope.getYear(dateOne) - $scope.getYear(dateTwo)) * 12;

      if ($scope.getYear(dateOne) < $scope.getYear(dateTwo)) {
        let size = (len - parseInt($scope.getMonth(dateOne))) + parseInt($scope.getMonth(dateTwo));  
        for (let index = 1, month = parseInt($scope.getMonth(dateOne)), i = 0; index <= size + 1; index++ , month++) {
          if (month > 12) {
            month = 1;
            i++;
          }
          result.push({"year": parseInt($scope.getYear(dateOne)) + i,"month": month,"nummonth":monthnum[month],"monstring":monthString[month],"yearmonth":$scope.getYear(dateOne)+"/"+monthnum[month]}
          );
        }
      }
      else if ($scope.getYear(dateOne) > $scope.getYear(dateTwo)) {
        let size = (len - parseInt($scope.getMonth(dateTwo))) + parseInt($scope.getMonth(dateOne));
        for (let index = 1, month = parseInt($scope.getMonth(dateTwo)), i = 0; index <= size + 1; index++ , month++) {
          if (month > 12) {
            month = 1;
            i++;
          }
          result.push({"year": parseInt($scope.getYear(dateTwo)) + i,"month": month,"nummonth":monthnum[month],"monstring":monthString[month],"yearmonth":$scope.getYear(dateOne)+"/"+monthnum[month]});
        }
      }
      else { // trường hợp năm = nhau
        if ($scope.getMonth(dateOne) < $scope.getMonth(dateTwo)) {
          for (let index = 1; index <= $scope.getMonth(dateTwo) - $scope.getMonth(dateOne) + 1; index++) {
            result.push({"year": parseInt($scope.getYear(dateOne)),"month": index,"nummonth":monthnum[index],"monstring":monthString[index],"yearmonth":parseInt($scope.getYear(dateOne))+"/"+monthnum[index]});
          }
        }
      }
      return result;
    }

    // get Data
    $scope.getData = () =>{
      
    }

  }]);
