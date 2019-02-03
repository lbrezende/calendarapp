/*****************************************************************
calendar.js
author:	Leandro Rezende
date: feb 3, 2019

Using jQuery with JSON to create a calendar and main actions like
update, create, delete and list

License: none (public domain)
****************************************************************/


$(document).ready(function(){

	//starts the app
	initializeEventListeners();

/* 
   initializeEventListeners
   This function sets up all the math and event listeners
   Author: Leandro Rezende
   Feb 2 2019

*/

	function initializeEventListeners() {

		//starts dates math
		initializeDates();

		//plots the calendar
		initializeCalendar();

		//starts the calendar details for editing appointments
		initializeCalendarDetails();

		//starts a json with no subjects to all days plotted
		createData();

		//paint all the appointments in the calendar
		drawCalendarAppointments();

		//actions when clicks any day
		$(".calendar__days td").click(function(){
			openAppointment($(this));
			//console.log("remove: "+JSON.stringify(appointments));
		});

		//actions when clicks addAppointment
		$("#addAppointment").click(function(){
			addAppointment($(this))
			closeAppointment()
			//console.log("remove: "+JSON.stringify(appointments));
		});

		//actions when clicks updateAppointment
		$("#updateAppointment").click(function(){
			updateAppointment($(this))
			closeAppointment()
			//console.log("remove: "+JSON.stringify(appointments));
		});

		//updates appointment if blur text area
		// $("#calendar-details__textarea").blur(function(){
		// 	$("#updateAppointment").click();
		// });

		//actions when clicks removeAppointment
		$("#removeAppointment").click(function(){
			removeAppointment($(this))
			//console.log("remove: "+JSON.stringify(appointments));
		});

		//actions when clicks the close button
		$("#hideDetail").click(function(){
			closeAppointment()
		});
	}

/* 
   createData
   Creates Json object with all days subject empty
   Author: Leandro Rezende
   Feb 2 2019
*/
	function createData() {
	    appointments = [];
	    $(".calendar__days td").each(function() {

	    	if ($(this).attr("id")) {
		        appointment = {}
		        appointment ["day"] = $(this).attr("day");
		        appointment ["month"] = $(this).attr("month");
		        appointment ["year"] = $(this).attr("year");
		        appointment ["subject"] = "";
		        appointment ["id"] = $(this).attr("id");
		        appointments.push(appointment);
	    	}
	    });
	    
	}

/* 
   setSubject
   Writes a new subject for a defined day
   Author: Leandro Rezende
   Feb 2 2019
*/
	function setSubject(identifier, subject) {
	  for (var i = 0; i < appointments.length; i++) {
	  	//Finds the object with the same id and updates the subject
	    if (appointments[i].id === identifier) {
	      appointments[i].subject = subject;
	      return;
	    }
	  }
	}

/* 
   removeSubject
   Updates the subject with empty state
   Author: Leandro Rezende
   Feb 2 2019
*/
	function removeSubject(identifier) {
	  for (var i = 0; i < appointments.length; i++) {
	  	//Finds the object with the same id and updates the subject
	    if (appointments[i].id === identifier) {
	      appointments[i].subject = "";
	      return;
	    }
	  }
	}

/* 
   getSubject
   Returns the subject for a defined id
   Author: Leandro Rezende
   Feb 2 2019
*/
	function getSubject(identifier) {

	  for (var i = 0; i < appointments.length; i++) {
	  	//Finds the object with the same id and updates the subject
	    if (appointments[i].id === identifier) {
	      return appointments[i].subject;
	    }
	  }
	}
/* 
   addAppointment
   This function is called if the user clicks #addAppointment and text area is not empty
   Saves the date in the json
   Author: Leandro Rezende
   Feb 2 2019
*/
	function addAppointment(dateObject) {

		//Get the text in the textarea and adds to json 
		id = dateObject.attr("date");
		var subject = $("#calendar-details__textarea").val();
		setSubject(id, subject);

		//Calls the functions that reads the apointmnets and draw in the calendar
		drawCalendarAppointments();

	}

/* 
   removeAppointment
   This function is called if the user clicks #removeAppointment and removes the subject
   Author: Leandro Rezende
   Feb 2 2019
*/
	function removeAppointment(dateObject) {

		//Get the text area #calendar-details__textarea 
		id = dateObject.attr("date");
		removeSubject(id);

		//Creates animation to feedback user the appointment has gonne
		$("#calendar-details").addClass("slide-out-elliptic-top-bck");

		//Calls the functions that reads the apointmnets and draw in the calendar
		drawCalendarAppointments();
	}

/* 
   updateAppointment
   This function is called if the user clicks #updateAppointment and updates the subject
   Author: Leandro Rezende
   Feb 2 2019
*/
	//it is called when the user clicks #updateAppointment update button and text area is not empty
	function updateAppointment(dateObject) {

		//Get the text area #calendar-details__textarea 
		id = dateObject.attr("date");
		var subject = $("#calendar-details__textarea").val();
		setSubject(id, subject);

		//Calls the functions that reads the apointmnets and draw in the calendar
		drawCalendarAppointments();
		
	}

/* 
   closeAppointment
   This function is called after all actions in the calendar details to close the box
   Author: Leandro Rezende
   Feb 2 2019
*/
	function closeAppointment() {
		$("#calendar-details").addClass("swing-out-left-bck");
		var appointmentContent = $("#calendar-details__textarea").text("");
	}


/* 
   drawCalendarAppointments
   This function paints all the current appointments in the calendar
   Author: Leandro Rezende
   Feb 2 2019
*/
	function drawCalendarAppointments() {

		//paints all subjects in the calendar
		$(".calendar__days td").each(function() {
			//Gets the subject to each day in the month
			id = $(this).attr("id");
			subject = getSubject(id);

			//If the day has a subject, draw appointment or remove the signals at the date
			if ((subject != "" )) {
				//console.log(">>> add" + id + " com subject: " + subject);
				$(this).addClass("calendar__days--appointment");
			} else {
				//console.log("não add" + id + " com subject: " + subject);
				$(this).removeClass("calendar__days--appointment");
			}

			//Removes selected data on the calendar
			$(this).removeClass("calendar__days--selected");

	    });
	}

/* 
   openAppointment
   This function is called whenever the user clicks a date today or in the future
   Opens the appointment or waits for new entry
   Author: Leandro Rezende
   Feb 2 2019
*/

	function openAppointment(dateObject) {


    	//reset all previous animations and informations
		$("#calendar-details").removeClass("swing-out-left-bck");
		$("#calendar-details").removeClass("slide-out-elliptic-top-bck");
		$("#calendar-details").removeClass("swing-in-left-fwd");
		$("#calendar-details__textarea").val("");

		$("#calendar-details").hide();

		//Verifies if the day is in not in the past and if it is not 
		//already selected and opens the details for the day
		if ((!dateObject.hasClass("calendar__days--selected")) && (!dateObject.hasClass("calendar__days--beforetoday"))){

			//Adding a Id to the main buttons so the actions can be done to the right date
			$("#removeAppointment").attr("date", dateObject.attr("id"));
			$("#updateAppointment").attr("date", dateObject.attr("id"));
			$("#addAppointment").attr("date", dateObject.attr("id"));
			$("#calendar-details__textarea").attr("date", dateObject.attr("id"));

			//getting the subject and date to the selected day in json file
			//addapt to getSubject
			var appointment = $.map(appointments, function(appointment) {
			    if(appointment.id === dateObject.attr("id")){
			    	return appointment;		    
			    }
			});

	    	var subject = appointment[0]["subject"];
	    	var day = appointment[0]["day"];
	    	var month = appointment[0]["month"];
	    	var monthNameMM = monthNamesSmall[month-1];


			//rendering new appointment information for selected date
			$("#currentMonthSmall").html(monthNameMM);
			$("#calendar-details").show();
			$("#calendar-details").addClass("swing-in-left-fwd");
			$("#currentDay").html(day);
			$("#calendar-details__textarea").focus();
			$("#calendar-details__textarea").val(subject);

			//select what actions should appear based if it has or not an appointment
			if (subject == "") {
				$(".emptyTextAreaButtons").hide();
				$(".filledTextAreaButtons").show();
			} else {
				$(".emptyTextAreaButtons").show();
				$(".filledTextAreaButtons").hide();
			}

			//selecting day on the calendar to show the user status
			$(".calendar__days td").removeClass("calendar__days--selected");
			dateObject.addClass("calendar__days--selected");
		};

	}

/* 
   initializeDates
   This function makes the math magic. February number of the days, number of days in the month
   and simliar stuff
   Author: Leandro Rezende
   Feb 2 2019
*/
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

/* 
   initializeCalendar
   This function creates the calendar HTML. Some math magic. It works, don't ask me how. Should clearly be refactored, but it is cool for now. Works. Yeah baby! Works. Can you make it better? Go for it! I won't be sad and I will pay you a coke
   Author: Leandro Rezende
   Feb 2 2019
*/
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
					 calendarHTML += "<td id=\"othermonth-"+weekdays+"\" class=\"calendar__days--beforetoday\">&nbsp;</td>";
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

/* 
   initializeCalendarDetails
   This function is called if the user clicks #removeAppointment and removes the subject
   Author: Leandro Rezende
   Feb 2 2019
*/
	function initializeCalendarDetails() {
		//Adds the calendar header to the HTML variable

		var calendarDetailsHTML = "<div id=\"calendar-details\" style=\"display:none\"><div class=\"calendar-details__title\"><span id=\"currentMonthSmall\">"+currentMonthNameMMM+"</span>, <span id=\"currentDay\">"+currentDayDD+"</span><span id=\"hideDetail\" style=\"float:right; cursor:pointer\">x</span></div><div class=\"calendar-details__subject--header\">Your appointment</div><div class=\"calendar-details__subject\"><textarea id=\"calendar-details__textarea\" type=\"text\" name=\"subject\" placeholder=\"Type the subject...\"></textarea><div class=\"emptyTextAreaButtons\"><button id=\"updateAppointment\" class=\"calendar-details__button-primary\" >Update </button><button id=\"removeAppointment\" class=\"calendar-details__button-primary\">Remove </button></div><div class=\"filledTextAreaButtons\"><button id=\"addAppointment\" class=\"calendar-details__button-primary\">Mark appointment</button></div></div></div>";

		$("#calendarDetailsArea").html(calendarDetailsHTML);
	}


});

/*****************************************************************
Thanks for reading! I am available to work abroad. 

This is not an amazing javascript. Not great archtecture... 
but I rock as UX & UI Designer and Product Management!

Find me at lbrezende@gmail.com
****************************************************************/
