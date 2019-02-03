$(document).ready(function(){

	initializeEventListeners();

	function initializeEventListeners() {

		initializeDates();
		initializeCalendar();
		initializeCalendarDetails();
		createData();
		initializeCalendarAppointments();


		//when clicks any day
		$(".calendar__days td").click(function(){
			openAppointment($(this));
		});

		//when clicks addAppointment
		$("#addAppointment").click(function(){
			addAppointment($(this))
			closeAppointment()
		});

		//when clicks updateAppointment
		$("#updateAppointment").click(function(){
			updateAppointment($(this))
			closeAppointment()
		});

		//when clicks removeAppointment
		$("#removeAppointment").click(function(){
			removeAppointment($(this))
		});

		//when clicks the close button
		$("#hideDetail").click(function(){
			closeAppointment()
		});
	}

	function initializeCalendarAppointments() {
			$(".calendar__days td").each(function() {
				var appointment = $.map(appointments, function(appointment) {
					    if(appointment.id === $(this).attr("id")){
					    	return appointment;		    
					    }
					});
		    	var subject = appointments[0]["subject"];
				if (subject != "") {
					$(this).addClass("calendar__days--appointment");
				}
		    });
	}

	//it is called whenever the user clicks a date today or in the future
	function openAppointment(dateObject) {

		$(".filledTextAreaButtons").show();
		$(".emptyTextAreaButtons").show();

		if ((!dateObject.hasClass("calendar__days--selected")) && (!dateObject.hasClass("calendar__days--beforetoday"))){

			//Adding a Id to the main buttons
			$("#removeAppointment").attr("date", dateObject.attr("id"));
			$("#updateAppointment").attr("date", dateObject.attr("id"));
			$("#addppointment").attr("date", dateObject.attr("id"));

			//getting object in json file
			var appointment = $.map(appointments, function(appointment) {
			    if(appointment.id === dateObject.attr("id")){
			    	return appointment;		    
			    }
			});

	    	var subject = appointment[0]["subject"];
	    	var day = appointment[0]["day"];
	    	var month = appointment[0]["month"];
	    	var monthNameMM = monthNamesSmall[month-1];

	    	//animations to reset the interface
			$("#calendar-details").removeClass("swing-out-left-bck");
			$("#calendar-details").removeClass("slide-out-elliptic-top-bck");
			$("#calendar-details").removeClass("swing-in-left-fwd");
			$("#calendar-details").hide();

			//rendering new interface information
			$("#currentMonthSmall").html(monthNameMM);
			$("#calendar-details").show();
			$("#calendar-details").addClass("swing-in-left-fwd");
			$("#currentDay").html(day);

			$("#calendar-details__textarea").text(subject);

			if (subject == "") {
				$(".emptyTextAreaButtons").hide();
				$(".filledTextAreaButtons").show();
			} else {
				$(".emptyTextAreaButtons").show();
				$(".filledTextAreaButtons").hide();
			}

			//selecting day on the calendar
			$(".calendar__days td").removeClass("calendar__days--selected");
			$(this).addClass("calendar__days--selected");
		};


		//If does not have text shows emptytextareabuttons
	}

	//it is called if the user clicks #addAppointment and text area is not empty
	function addAppointment(dateObject) {

		alert("add");
		//Get the text area #calendar-details__textarea 

		var appointmentContent = $("#calendar-details__textarea").text();

		//Add to json file
		//appointmentContent.addJson(thisDate)

		//Add date css mark .slide-out-elliptic-top-bck

		//calls function closeAppointment

	}

	//it is called when the user clicks the #removeAppointment button
	function removeAppointment(dateObject) {

		// getting object in json file
		// var appointment = $.map(appointments, function(appointment) {
		//     if(appointment.id === dateObject.attr("date")){ 
		//     	console.log(appointment);
		//     	appointment["subject"] == "nicetry";
		//     	alert(appointment["subject"]);
		//     }
		// });

		dateObject.removeClass("calendar__days--appointment");
		$("#calendar-details__textarea").text("");
		$("#calendar-details").addClass("slide-out-elliptic-top-bck");
		
	}

	//it is called when the user clicks #updateAppointment update button and text area is not empty
	function updateAppointment(dateObject) {
		alert("update");
		//Get the text area #calendar-details__textarea text and add to a json file

		//Add date css mark .calendar__days--appointment

		//calls function closeAppointment
		
	}

	function closeAppointment() {
		$("#calendar-details").addClass("swing-out-left-bck");
		var appointmentContent = $("#calendar-details__textarea").text("");
	}


	/*Date helpers with important numbers to generate the calendar such as current object, and other presentation forms*/
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

		var calendarDetailsHTML = "<div id=\"calendar-details\" style=\"display:none\"><div class=\"calendar-details__title\"><span id=\"currentMonthSmall\">"+currentMonthNameMMM+"</span>, <span id=\"currentDay\">"+currentDayDD+"</span><span id=\"hideDetail\" style=\"float:right; cursor:pointer\">x</span></div><div class=\"calendar-details__subject--header\">Your appointment</div><div class=\"calendar-details__subject\"><textarea id=\"calendar-details__textarea\" type=\"text\" name=\"subject\" placeholder=\"Type the subject...\"></textarea><div class=\"emptyTextAreaButtons\"><button id=\"updateAppointment\" class=\"calendar-details__button-primary\" >Update </button><button id=\"removeAppointment\" class=\"calendar-details__button-primary\">Remove </button></div><div class=\"filledTextAreaButtons\"><button id=\"addAppointment\" class=\"calendar-details__button-primary\">Add appointment</button></div></div></div>";

		$("#calendarDetailsArea").html(calendarDetailsHTML);

	}

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








});
