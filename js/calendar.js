$(document).ready(function(){


	initializeDates();
	initializeCalendar();
	initializeCalendarDetails();

	$("#calendar-details").slideToggle();



	/*Date helpers with important numbers to generate the calendar such as current day, month, year, and other presentation forms*/
	function initializeDates(){

		/* Current Date*/
		var date = new Date();
		month = date.getMonth();
		
		monthPlus = month+1;

		//Adding 0 in front of numbers of 1 digit
		currentMonthMM = ((''+monthPlus).length<2 ? '0' : '') + monthPlus;
		day = date.getDate();
		currentDayDD = ((''+day).length<2 ? '0' : '') + day;
		currentYearYYYY = date.getFullYear();

		//Determing if February (28,or 29).
		//I copied this snippet. Ain't nobody have time for that.

		var FebruaryNumberOfDays ="";
		if (month == 1){
		   if ( (currentYearYYYY%100!=0) && (currentYearYYYY%4==0) || (currentYearYYYY%400==0)){
		     FebruaryNumberOfDays = 29;
		   }else{
		     FebruaryNumberOfDays = 28;
		   }
		}

		//Date helpers
		dayPerMonth = ["31", ""+FebruaryNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"];
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const monthNamesSmall = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		currentMonthName = monthNames[month];
		currentMonthNameMMM= monthNamesSmall[month];


		//Used to get how many days needs to be left blank in the calendar
		nextMonth = month+1; //+1; //Used to match up the current month with the correct start date.
		prevMonth = month -1;
		nextDate = new Date(nextMonth +' 1 ,'+currentYearYYYY);
 		weekdays= nextDate.getDay();

	}

	//Creates the calendar
	function initializeCalendar() {
		//Adds the calendar header to the HTML variable
		var calendarHTML = "<table id=\"calendar\"><thead class=\"calendar__title\"><th class=\"calendar__title--currentmonth\" colspan=\"7\"><span id=\"thisMonth\">"+ currentMonthName +"</span> <span id=\"thisYear\">"+ currentYearYYYY +"<span></th></thead><tbody><tr class=\"calendar__title--daysofweek\"><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td></tr>";

			//Verifies how many days needs to be ploted in the current month
			numberOfDays = dayPerMonth[month];

			//Verifies how many days needs to be left blank
			var dayCounter = 1;
			var blankCounter = 1;
			var weekdaysDefault = weekdays;
			var end = 0;
			//Defines how many days needs to be ploted on the fist line
			extraDays = 7-weekdaysDefault;


			//Loops how many lines are needed to complete the month
			while (dayCounter <= numberOfDays) {
				if (end == 1) {break};

				calendarHTML += "<tr class=\"calendar__days\">";

					//Adds the blank days of the previous month
					while (blankCounter <= weekdays) {
					 calendarHTML += "<td class=\"calendar__days--beforetoday\">&nbsp;</td>";
					 weekdays--;
					};

					 var counter = 1;

					 //Loops each line of the calendar
					 while ( counter <= extraDays) {



							//Add classes for days before current day and for current day
					 		if (dayCounter < day) {
					 			classname = "calendar__days--beforetoday";
					 		} else if (dayCounter == day) {
					 			classname = "calendar__days--current";
					 		} else {
					 			classname = "";
					 		}
					 		

					 		//Adds each day to the HTML
							calendarHTML += "<td id=\""+monthPlus+""+dayCounter+""+currentYearYYYY+"\" month=\""+monthPlus+"\" day=\""+dayCounter+"\" year=\""+currentYearYYYY+"\" class=\""+classname+"\">"+dayCounter+"</td>";

							if (dayCounter == numberOfDays) {
								end = 1;
								break;
							}
							counter++;
							dayCounter++;

							
					 }

					 //Sets the number of lines to default after first line and restart line counter
					 extraDays = 7;
					 var counter = 1;
				//Ends each line
				calendarHTML += "</tr>";
			};

		//Ends the calendar	
		calendarHTML += "</tbody></table>";

		$("#calendarArea").html(calendarHTML);


	}
	//Creates the calendar detais
	function initializeCalendarDetails() {
		//Adds the calendar header to the HTML variable

		var calendarDetailsHTML = "<div id=\"calendar-details\" style=\"display:none\"><div class=\"calendar-details__title\"><span id=\"currentMonthSmall\">"+currentMonthNameMMM+"</span>, <span id=\"currentDay\">"+currentDayDD+"<span></div><div class=\"calendar-details__subject--header\">Your appointment</div><div class=\"calendar-details__subject\"><textarea id=\"calendar-details__textarea\" type=\"text\" name=\"subject\" placeholder=\"Type the subject...\"></textarea><button id=\"calendar-details__button-primary\" onclick=\"removeAppointment();\">Remove appointment</button></div></div>";

		$("#calendarDetailsArea").html(calendarDetailsHTML);

	}



});
