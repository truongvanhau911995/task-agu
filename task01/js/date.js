var dateFrom = "02/06/2013";
var dateTo = "02/09/2013";

var d1 = dateFrom.split("/");
var d2 = dateTo.split("/");

var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]); 



var dates= ["02/06/2013", "02/07/2013", "02/08/2013", "02/09/2013", "02/07/2013", "02/10/2013", "02/011/2013"];

dates.forEach(element => {
   let parts = element.split("/");
   let date= new Date(parts[2], parseInt(parts[1]) - 1, parts[0]);
        if (date >= from && date < to) {
           console.log('dates in range', date);
        }
})