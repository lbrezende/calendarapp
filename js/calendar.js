$(document).ready(function(){


	initializeDates();
	initializeCalendar();
	initializeCalendarDetails();
	initializeEventListeners();


	function eventListeners() {

		//when clicks any day

		//when clicks addAppointment

		//when clicks removeAppointment

		//when clicks updateAppointment

		//when clicks the close button
		$("#hideDetail").click(function(){
			closeAppointment()
		});
	}



	//it is called whenever the user clicks a date today or in the future
	function openAppointment(day, month, year) {
		//Get the json file

		//Verify if the date has any text

		//If has text, show the data

		//If does not have text shows emptytextareabuttons
	}

	//it is called if the user clicks #addAppointment and text area is not empty
	function addAppointment(day, month, year) {

		//Get the text area #calendar-details__textarea 

		var appointmentContent = $("#calendar-details__textarea").text();

		//Add to json file
		//appointmentContent.addJson(thisDate)

		//Add date css mark .slide-out-elliptic-top-bck

		//calls function closeAppointment

	}

	//it is called when the user clicks the #removeAppointment button
	function removeAppointment(day, month, year) {

		//remove data from json to the select data

		//clear the textarea

		//add class .swing-out-left-bck 
		
	}

	//it is called when the user clicks #updateAppointment update button and text area is not empty
	function updateAppointment(day, month, year) {

		//Get the text area #calendar-details__textarea text and add to a json file

		//Add date css mark .calendar__days--appointment

		//calls function closeAppointment
		
	}



	function closeAppointment() {
		$("#calendar-details").addClass("swing-out-left-bck");
		var appointmentContent = $("#calendar-details__textarea").text("");
	}



	//Hide appointment


	//Remove appointment
	$("#removeAppointment").click(function(){
		$("#calendar-details").addClass("slide-out-elliptic-top-bck");
	});

	//Open appointment
	$(".calendar__days td").click(function(){

		if ((!$(this).hasClass("calendar__days--selected")) && (!$(this).hasClass("calendar__days--beforetoday"))){
			$("#calendar-details").removeClass("swing-out-left-bck");
			$("#calendar-details").removeClass("slide-out-elliptic-top-bck");
			$("#calendar-details").removeClass("swing-in-left-fwd");
			$("#calendar-details").hide();

			thisDay = $(this).attr("day");
			thisMonth = $(this).attr("month");
			$("#currentMonthSmall").html(monthNamesSmall[thisMonth-1]);
			$("#calendar-details").show();
			$("#calendar-details").addClass("swing-in-left-fwd");
			$("#currentDay").html(thisDay);

			$(".calendar__days td").removeClass("calendar__days--selected");
			$(this).addClass("calendar__days--selected");
		};
	});
	



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
		monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		monthNamesSmall = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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

		var calendarDetailsHTML = "<div id=\"calendar-details\" style=\"display:none\"><div class=\"calendar-details__title\"><span id=\"currentMonthSmall\">"+currentMonthNameMMM+"</span>, <span id=\"currentDay\">"+currentDayDD+"</span><span id=\"hideDetail\" style=\"float:right; cursor:pointer\">x</span></div><div class=\"calendar-details__subject--header\">Your appointment</div><div class=\"calendar-details__subject\"><textarea id=\"calendar-details__textarea\" type=\"text\" name=\"subject\" placeholder=\"Type the subject...\"></textarea><div class=\"emptyTextAreaButtons\"><button id=\"updateAppointment\" class=\"calendar-details__button-primary\" onclick=\"updateAppointment();\">Update </button><button id=\"removeAppointment\" class=\"calendar-details__button-primary\" onclick=\"removeAppointment();\">Remove </button></div><div class=\"filledTextAreaButtons\"><button id=\"addAppointment\" class=\"calendar-details__button-primary\" onclick=\"addAppointment();\">Add appointment</button></div></div></div>";

		$("#calendarDetailsArea").html(calendarDetailsHTML);

	}



});
