$(document).ready(function(){

	/* Getting current date */

	var d = new Date();

	/* Creating arrays with month names */

	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const monthNamesSmall = ["Jan", "Feb", "March", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	/* Organizing date presentation */
	var month = d.getMonth()+1;
	var monthDate = ((''+month).length<2 ? '0' : '') + month;
	var day = d.getDate();
	var dayDate = ((''+day).length<2 ? '0' : '') + day;
	var year = d.getFullYear();

	var monthName = monthNames[d.getMonth()];
	var monthNameSmall = monthNamesSmall[d.getMonth()];

	/* initializing calendar with current date */
	$("#thisMonth").text(monthName);
	$("#thisYear").text(year);	
	$("#currentMonthSmall").text(monthNameSmall);
	$("#currentDay").text(day);

	/* initializing calendar management */
	$(".calendar__days td").click(function(){
   		manageAppointments($(this));
	});

	function manageAppointments(selectedDate) {
		var newSelectedDate = selectedDate;

		/* If the date is in in the past, the user can not mark an appointment */
			if (isAppointmentAllowed(selectedDate)) {
				appointmentDay = selectedDate.text();
				appointmentDate = monthDate + "/" + appointmentDay + "/" + year;
				/* If the date is free, the user can mark an appointment */
				if(!dateHasAppointment(newSelectedDate)) {
					markAppointment(newSelectedDate, appointmentDay, appointmentDate);
				} else {
					/* If the date is not free, the user can open and the appointment */
					openAppointment(newSelectedDate, appointmentDay, appointmentDate);
				}
			}
	}

	/* 
	   isAppointmentAllowed verifies if the selected date is in the past. 
	   boolean

	   "True" 	means the user can mark an appointment
	   "False" 	means this date is in the past and the user should not be able to mark an appointment
	*/
	function isAppointmentAllowed(selectedDate) {
		return !(selectedDate.hasClass( "calendar__days--beforetoday" ))
	}

	/* 
	   hasAppointment verifies if the selected date already has an appointment. 
	   boolean
	   
	   "True" 	means this date already has an appointment
	   "False" 	means this date is appointment free
	*/
	function dateHasAppointment(selectedDate) {
		return (selectedDate.hasClass( "calendar__days--appointment" ))
	}

	/* 
	   openAppointment asks the user the subject of the appointment and mark
	*/
	function openAppointment(selectedDate, appointmentDay, appointmentDate) {
		var selectedDate = selectedDate;
		/* Show the user his appointment */
		appointmentSubject = selectedDate.attr( "data-appointment" );
		selectDay(selectedDate, appointmentDay);
		$("#calendar-details__textarea").text(appointmentSubject);

	}

	/* 
	   markAppointment adds an appointment to the selected date
	*/
	function markAppointment(selectedDate, appointmentDay, appointmentDate) {
		var selectedDate = selectedDate;
		    selectDay(selectedDate, appointmentDay);
		    $("#calendar-details__textarea").focusout(function(){
		    	newSubject = $("#calendar-details__textarea").val();
		    	selectedDate.attr('data-appointment', newSubject);
		    });

	}

	/* 
	   removeAppointment remove the appointment in the selected date and feedback the user
	*/
	function removeAppointment(selectedDate, appointmentDay, appointmentDate) {
		var selectedDate = selectedDate;
		/* Asks if the user wants to remove the appointment. If yes, remove and feedback the user. */
		removeSubject = confirm("Do you want to clear your agenda for " + appointmentDate + " ?");
		if (removeSubject) {
			/*Removes the appointment marker*/
			selectedDate.removeClass("calendar__days--appointment");

			/*Removes the appointment subject*/
			selectedDate.removeAttr("data-appointment");
		}
	}

	/* 
	   updateAppointment remove the appointment in the selected date and feedback the user
	*/
	function updateAppointment(selectedDate, appointmentDay, appointmentDate) {
		var selectedDate = selectedDate;
		/* Asks if the user wants to remove the appointment. If yes, remove and feedback the user. */
		appointmentDay = 15;

		var newSubject = prompt("What is the new appointment subject");

		if (newSubject != null) {
		    selectedDate.attr('data-appointment', newSubject);
			/*Add the appointment class*/
			alert("Your appointment '" + newSubject + "' is updated")
		} else {
			/*if the user refuses to define the subject, the agenda must remain clear */
			alert("Ok, the appointment remains'" + currentSubject + "'")
		}

	}

	function selectDay(selectedDate, appointmentDay) {
		var selectedDate = selectedDate;
		$("#calendar-details__textarea").text("");
		$(".calendar__days td").removeClass("calendar__days--selected");
		selectedDate.addClass("calendar__days--selected");
		$("#currentDay").text(appointmentDay);
	};



});