var myArray = [
    {group: "one", color: "red"},
    {group: "two", color: "blue"},
    {group: "one", color: "green"},
    {group: "one", color: "black"}
  ];

var ham = function(){
    var groups = {};
    for (var i = 0; i < myArray.length; i++) {
      var groupName = myArray[i].group;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(myArray[i].color);
    }
    myArray = [];
    for (var groupName in groups) {
      myArray.push({group: groupName, color: groups[groupName]});
    }

    // myArray = [
    //     {group: "one", color: ["red", "green", "black"]}
    //     {group: "two", color: ["blue"]}
    //   ]


    // Array.prototype.contains = function(value) {
    //     for (var i = 0; i < this.length; i++) {
    //       if (this[i] === value)
    //         return true;
    //     }
    //     return false;
    //   }

    // var myArray = [
    //     {group: "one", color: "red"},
    //     {group: "two", color: "blue"},
    //     {group: "one", color: "green"},
    //     {group: "one", color: "black"}
    // ];
    
    // var group_to_values = myArray.reduce(function (obj, item) {
    //     obj[item.group] = obj[item.group] || [];
    //     obj[item.group].push(item.color);
    //     return obj;
    // }, {});
    
    // var groups = Object.keys(group_to_values).map(function (key) {
    //     return {group: key, color: group_to_values[key]};
    // });
    
    // var pre = document.createElement("pre");
    // pre.innerHTML = "groups:\n\n" + JSON.stringify(groups, null, 4);
    // document.body.appendChild(pre);




    // cach khac

    // var res = myArray.reduce(function(groups, currentValue) {
    //     if ( groups.indexOf(currentValue.group) === -1 ) {
    //       groups.push(currentValue.group);
    //     }
    //     return groups;
    // }, []).map(function(group) {
    //     return {
    //         group: group,
    //         color: myArray.filter(function(_el) {
    //           return _el.group === group;
    //         }).map(function(_el) { return _el.color; })
    //     }
    // });

    // cach 3
//     var array = [{ group: "one", color: "red" }, { group: "two", color: "blue" }, { group: "one", color: "green" }, { group: "one", color: "black" }],
//     groups = Object.create(null),
//     grouped = [];

// array.forEach(function (o) {
//     if (!groups[o.group]) {
//         groups[o.group] = [];
//         grouped.push({ group: o.group, color: groups[o.group] });
//     }
//     groups[o.group].push(o.color);
// });

// console.log(grouped);



// cach 4
// var array = [{
//     id: "123",
//     name: "aaaaaaaa"
//   }, {
//     id: "123",
//     name: "aaaaaaaa"
//   }, {
//     id: '456',
//     name: 'bbbbbbbbbb'
//   }, {
//     id: '789',
//     name: 'ccccccccc'
//   }, {
//     id: '789',
//     name: 'ccccccccc'
//   }, {
//     id: '098',
//     name: 'dddddddddddd'
//   }];
// //if you want to group this array
// group(array, key) {
// console.log(array);
// let finalArray = [];
// array.forEach(function(element) {
//   var newArray = [];
//   array.forEach(function(element1) {
//     if (element[key] == element1[key]) {
//         newArray.push(element)
//     }
//   });
//   if (!(finalArray.some(arrVal => newArray[0][key] == arrVal[0][key]))) {
//       finalArray.push(newArray);
//   }
// });
// return finalArray
// }
// //and call this function
// groupArray(arr, key) {
// console.log(this.group(arr, key))
// }
}