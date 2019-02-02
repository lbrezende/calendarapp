$(document).ready(function(){

	$(".calendar__days td").click(function(){
		console.log("here");
   		manageAppointments($(this));
	});

	function manageAppointments(selectedDate) {

		/* If the date is in in the past, the user can not mark an appointment */
			if (isAppointmentAllowed(selectedDate)) {

				/* If the date is free, the user can mark an appointment */
				if(!dateHasAppointment(selectedDate)) {
					markAppointment(selectedDate);
				} else {
					/* If the date is not free, the user can open and the appointment */
					openAppointment(selectedDate);
					/* After seeing the appointment, the user can decide if he wants to clear the agenda */
					clearAgenda(selectedDate);
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
	function openAppointment(selectedDate) {

		/* Show the user his appointment */
		appointmentSubject = selectedDate.attr( "data-appointment" );
		alert("Your appointment is '" + appointmentSubject + "'");

		/* Verify if the user wants to remove appointment */
		removeAppointment(selectedDate)

	}

	/* 
	   markAppointment adds an appointment to the selected date
	*/
	function markAppointment(selectedDate) {

		var subject = prompt("What is your appointment subject");

		if (subject != null) {
		    selectedDate.attr('data-appointment', subject);
			/*Add the appointment class*/
			alert("Your appointment is market")
			selectedDate.addClass("calendar__days--appointment");
		} else {
			/*if the user refuses to define the subject, the agenda must remain clear */
			alert("I got it! Your agenda remains clear")
		}

	}

	/* 
	   removeAppointment remove the appointment in the selected date and feedback the user
	*/
	function removeAppointment(selectedDate) {

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

			/*Feedbacks the appointment is removed*/
			alert("I got your back! Your agenda is clear!")
		}


	}


});