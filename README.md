# calendarapp
This is a Calendar App test provided by Hacker Hank

# Main instructions

Make a calendar app. The calendar should display all the dates for the current month. The calendar app should also be able to mark appointments. The app must have the following functionality:

* Any appointment can be made for the current day or for a future date.
* No two appointments should overlap. If an appointment already exists for a day, a warning should be shown.
* Appointments can be edited and deleted.

# Development Process

[The calendar style](http://bit.ly/calendarstyle)

[My design process to this simple exercice](http://bit.ly/calendarprocess)

[Moodboard and references](http://bit.ly/calendarreferences)

# Demo

[See it working!](http://bit.ly/calendarcodepen)

# Personal guides

In order to follow the requirements some things must be consider:

| Requirement | Details that might help |
| ------ | ------ |
| The calendar should display all the dates for the current month | The app will display *ONLY* the current month. I will use javascript to get the current month. |
| The calendar app should also be able to mark appointments | For the matter of the exercise I will let the use mark appointments clicking in the date he wants. Other approach is that it must have a clear call to action to mark appointments. It might be built at v2 if necessary.  |
| Any appointment can be made for the current day or for a future date | As long as no appointments should be made for past days I will let the user visually understand that no actions can be made to past days. I will use javascript to get the current day. |
| No two appointments should overlap. If an appointment already exists for a day, a warning should be shown. | To prevent user mistakes, I will give user visual signs about forbidden dates already taken. Not only after, but even before trying to mark new appointments. |
| Appointments can be edited and deleted | All the actions will be available right on the calendar and the user should easily  understand that this action can be done when using the calendar. Some visual animations will be used to let the user understand the system feedback without messages, but feelings. Let's see if it works! |

