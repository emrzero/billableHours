
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAN-bkQg_3KVXCd_9BlY36FFVr7R311B7U",
    authDomain: "billable-31366.firebaseapp.com",
    databaseURL: "https://billable-31366.firebaseio.com",
    storageBucket: "billable-31366.appspot.com",
  };


  firebase.initializeApp(config);

var database = firebase.database();

database.ref().on('value', function(snapshot){
    $('#currentData').empty();
  snapshot.forEach(function(childSnapshot){
    var newEmp = {
    name: childSnapshot.val().name,
    role: childSnapshot.val().role,
    startDate: childSnapshot.val().startDate,
    monthsWorked: "",
    monthlyRate: childSnapshot.val().monthlyRate,
    totalBilled: ""
  }

  printHTML(newEmp);

  });
});


var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

console.log(monthDiff(
  new Date(2010, 11, 5),
  new Date(year, month, day)

  )
);




$('#submit').on('click', function(){

  name = $('#name').val().trim();
  role = $('#role').val().trim();
  startDate = $('#date').val().trim();
  monthlyRate = $('#monthlyRate').val().trim();

  console.log(name);
  console.log(role);
  console.log(startDate);
  console.log(monthlyRate);


  var newEmp = {
    name: name,
    role: role,
    startDate: startDate,
    monthsWorked: "",
    monthlyRate: monthlyRate,
    totalBilled: ""
  }


  database.ref().push(newEmp);


  $('#name').val('');
  $('#role').val('');
  $('#date').val('');
  $('#monthlyRate').val('');

  return false;


});


function printHTML(obj){

var tempDateArray = obj.startDate.split('-');

  obj.monthsWorked = monthDiff(
    new Date(tempDateArray[0], tempDateArray[1], tempDateArray[2]),
    new Date(year, month, day)
    );

  obj.totalBilled = "$" + obj.monthsWorked * obj.monthlyRate;


  var r = $('<tr>');

  for(key in obj){
    var d = $('<td>');
    d.html(obj[key]);
    r.append(d);
  }

  $('#currentData').append(r);
}

function monthDiff(d1, d2) {
   var months;
   months = (d2.getFullYear() - d1.getFullYear()) * 12;
   months -= d1.getMonth() + 1;
   months += d2.getMonth();
   return months <= 0 ? 0 : months;
}


// monthDiff(
//    new Date(2008, 10, 4), // November 4th, 2008
//    new Date(2010, 2, 12)  // March 12th, 2010
// );
// // Result: 15: December 2008, all of 2009, and Jan & Feb 2010

// monthDiff(
//    new Date(2010, 0, 1),  // January 1st, 2010
//    new Date(2010, 2, 12)  // March 12th, 2010
// );
// // Result: 1: February 2010 is the only full month between them

// monthDiff(
//    new Date(2010, 1, 1),  // February 1st, 2010
//    new Date(2010, 2, 12)  // March 12th, 2010
// );


