$(document).ready(function(){
	$(".calendar__days td").click(function(){
		isAppointmentAllowed = !($(this).hasClass( "calendar__days--beforetoday" ))
		if (isAppointmentAllowed) { 
			alert("You are allowed to click") 
		}
	})
});