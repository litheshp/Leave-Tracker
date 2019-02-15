$("#startdatetime").datetimepicker({
        step:30 
        });
         $("#enddatetime").datetimepicker({
        step:30
        });
        
        $("#enddatetime").on('change', function(e) {
	var fromDate = $('#startdatetime').val(), 
  		toDate = $('#enddatetime').val(), 
		from, to, druation;
  var d1 =  $('#startdatetime').val();
  var d2 = $('#enddatetime').val();
	//from = moment(fromDate, 'YYYY-MM-DD'); // format in which you have the date
	//to = moment(toDate, 'YYYY-MM-DD');     // format in which you have the date
  
	/* using diff */
	//duration = to.diff(from, 'days')     
	duration = workingDaysBetweenDates(d1, d2)
	
	/* show the result */
	$('#result').text(duration + ' days');
   $('#days').val(duration)
});

function workingDaysBetweenDates(d0, d1) {
	var holidays = ['2018-05-03','2018-06-03'];
    var startDate = parseDate(d0);
    var endDate = parseDate(d1);  
    // Validate input
    if (endDate < startDate) {
        return 0;
    }
    // Calculate days between dates
    var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
    startDate.setHours(0,0,0,1);  // Start just after midnight
    endDate.setHours(23,59,59,999);  // End just before midnight
    var diff = endDate - startDate;  // Milliseconds between datetime objects    
    var days = Math.ceil(diff / millisecondsPerDay);
    
    // Subtract two weekend days for every week in between
    var weeks = Math.floor(days / 7);
    days -= weeks * 2;

    // Handle special cases
    var startDay = startDate.getDay();
    var endDay = endDate.getDay();
    
    // Remove weekend not previously removed.   
    if (startDay - endDay > 1) {
        days -= 2;
    }
    // Remove start day if span starts on Sunday but ends before Saturday
    if (startDay == 0 && endDay != 6) {
        days--;  
    }
    // Remove end day if span ends on Saturday but starts after Sunday
    if (endDay == 6 && startDay != 0) {
        days--;
    }
    /* Here is the code */
    for (var i in holidays) {
    
      if ((holidays[i]>= d0) && (holidays[i] <= d1)) {
      	days--;
      }
    }
    return days;
}
           
function parseDate(input) {
	// Transform date from text to date
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}
       
