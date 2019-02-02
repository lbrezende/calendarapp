$(document).ready(function(){

	$(".calendar__days td").click(function(){
   		manageAppointments($(this));
	});

	function manageAppointments(selectedDate) {

		/* If the date is in in the past, the user can not mark an appointment */
			if (isAppointmentAllowed(selectedDate)) {

				/* If the date is free, the user can mark an appointment */
				if(!dateHasAppointment(selectedDate)) {
					appointmentDay = selectedDate.text();
					appointmentMonth = 02;
					appointmentYear = 2019;
					appointmentDate = appointmentMonth + "/" + appointmentDay + "/" + appointmentYear;
					markAppointment(selectedDate, appointmentDay, appointmentMonth, appointmentYear, appointmentDate);
				} else {
					/* If the date is not free, the user can open and the appointment */
					openAppointment(selectedDate, appointmentDay, appointmentMonth, appointmentYear, appointmentDate);
					/* After seeing the appointment, the user can decide if he wants to clear the agenda or update */
	


					clearAgenda = confirm("Do you want to clear your agenda for " + appointmentDate + " ?");

					if (clearAgenda) {
						/*Removes the appointment */
						removeAppointment(selectedDate, appointmentDay, appointmentMonth, appointmentYear, appointmentDate);

					} else {

						updateAgenda = confirm("What about update your appointment?");

						if (updateAgenda) {
							/*Update the appointment */
							updateAppointment(selectedDate, appointmentDay, appointmentMonth, appointmentYear, appointmentDate);
						}
					}
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
	function openAppointment(selectedDate, appointmentDay, appointmentMonth, appointmentYear, appointmentDate) {

		/* Show the user his appointment */
		appointmentSubject = selectedDate.attr( "data-appointment" );
		alert("Your appointment is '" + appointmentSubject + "'");

	}

	/* 
	   markAppointment adds an appointment to the selected date
	*/
	function markAppointment(selectedDate, appointmentDay, appointmentMonth, appointmentYear, appointmentDate) {

		var subject = prompt("What is your appointment subject");

		if (subject != null) {
		    selectedDate.attr('data-appointment', subject);
			/*Add the appointment class*/
			alert("Your appointment '" + subject + "' is marked")
			selectedDate.addClass("calendar__days--appointment");
		} else {
			/*if the user refuses to define the subject, the agenda must remain clear */
			alert("I got it! Your agenda remains clear")
		}

	}

	/* 
	   removeAppointment remove the appointment in the selected date and feedback the user
	*/
	function removeAppointment(selectedDate, appointmentDay, appointmentMonth, appointmentYear, appointmentDate) {

		/* Asks if the user wants to remove the appointment. If yes, remove and feedback the user. */
		appointmentDay = 15;
		appointmentMonth = 02;
		appointmentYear = 2019;
		appointmentDate = appointmentMonth + "/" + appointmentDay + "/" + appointmentYear;

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
	function updateAppointment(selectedDate, appointmentDay, appointmentMonth, appointmentYear, appointmentDate) {

		/* Asks if the user wants to remove the appointment. If yes, remove and feedback the user. */
		appointmentDay = 15;
		appointmentMonth = 02;
		appointmentYear = 2019;

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

});