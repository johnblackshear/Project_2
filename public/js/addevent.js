console.log("clicky");

// Get references to page elements
var $eventName = $('#newevent-eventname');
var $eventDescription = $('#newevent-description');
var $submitBtn = $('#submit');
var theClubId = $('#theClubId').attr('data-clubid');

console.log("theClubId: ", theClubId);

// var flatpickr = require('flatpickr');
flatpickr("#newevent-date", {dateFormat: 'M-d-Y'});
flatpickr("#newevent-time", {noCalendar: true, enableTime: true});



// The API object contains methods for each kind of request we'll make
var API = {
    saveEvent: function (event) {
        return $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: '/api/clubs/' + theClubId + '/addevent' ,
            data: JSON.stringify(event)
        });
    }
};

// handleFormSubmit is called whenever we submit a new event
// Save the new event to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault()
    console.log("clicky");
    
    var event = {
        eventname: $eventName.val().trim(),
        description: $eventDescription.val().trim()
    }

    if (!(event.eventname && event.description)) {
        alert('You must enter a event name and description!')
        return
    }

    API.saveEvent(event).then(function (newevent) {
        // refreshevents()
        window.location.replace('/clubs/' + theClubId);

    })

};

// Add event listener to the submit button
$submitBtn.on('click', handleFormSubmit)


