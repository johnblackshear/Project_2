console.log("clicky");

// Get references to page elements
var $eventName = $('#newevent-eventname');
var $eventDescription = $('#newevent-description');
var $date = $('#newevent-date');
// var $time = $('#newevent-time');
var $location = $('#newevent-location');
var $book = $('#newevent-book');


var $submitBtn = $('#submit');
var theClubId = $('#theClubId').attr('data-clubid');

console.log("theClubId: ", theClubId);

// var flatpickr = require('flatpickr');
flatpickr("#newevent-date", {dateFormat: 'M-d-Y'});
// flatpickr("#newevent-time", {noCalendar: true, enableTime: true});



// The API object contains methods for each kind of request we'll make
var API = {
    saveEvent: function (event) {
        console.log("test1", event);

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

    var dateFix = $date.val().trim();
    console.log("dateFix", dateFix);


    var clubevent = {
        eventname: $eventName.val().trim(),
        description: $eventDescription.val().trim(),
        date: $date.val().trim(),
        // time: $time.val().trim(),
        location: $location.val().trim(),
        book: $book.val().trim()
    }

    console.log("clubevent: ", clubevent);

    // if (!(clubevent.eventname && clubevent.description)) {
    //     alert('You must enter a event name and description!')
    //     return
    // }

    // API.saveEvent(clubevent).then(function (newevent) {
    //     var $div = $('.card-body');
    //     console.log("test2", newevent);
    //     // refreshevents()
    //     // window.location.replace('/clubs/' + theClubId);
    //     $div.empty();
    //     $div.append("hi");
    // })

};



// Add event listener to the submit button
$submitBtn.on('click', handleFormSubmit);
// $submitBtn.on('click', test);



