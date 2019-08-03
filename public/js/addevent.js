console.log("clicky");

// Get references to page elements
var $eventName = $('#newevent-eventname');
var $eventDescription = $('#newevent-description');
var $date = $('#newevent-date');
// var $time = $('#newevent-time');
var $location = $('#newevent-location');
// var $book = $('#newevent-book');


var $submitBtn = $('#submit');
var theClubId = $('#theClubId').attr('data-clubid');

console.log("theClubId: ", theClubId);

// var flatpickr = require('flatpickr');
flatpickr("#newevent-date", { dateFormat: 'M-d-Y' });
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
            url: '/api/clubs/' + theClubId + '/addevent',
            data: JSON.stringify(event)
        });
    }
};



//create a search funtion
function bookSearch() {
    console.log("bookSearch clicky");
    //taking user input and store the value inside of the variable to use
    var search = document.getElementById("search").value;
    document.getElementById("results").innerHTML = "";
    var resultsDiv = $('#results');
    console.log(search);
    //create ajax call
    $.ajax({
        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        //specify which data to use
        dataType: "json",
        //create for loop
        success: function (data) {
            for (i = 0; i < data.items.length; i++) {
                console.log("data loop", data.items[i]);

                var bookDiv = $('<div class="bookdiv clearfix">');

                bookDiv.append("<a href='#' class='bookselect' data-bookthumbnail=" + data.items[i].volumeInfo.imageLinks.thumbnail + ">Select Book</a><br><br>");


                bookDiv.append("<p class=book-cover><img src=" + data.items[i].volumeInfo.imageLinks.thumbnail + "></p>");
                bookDiv.append("<h5>" + data.items[i].volumeInfo.title + "</h5>");
                bookDiv.append("<h6>" + data.items[i].volumeInfo.authors + "</h6>");
                bookDiv.append("<span>" + data.items[i].volumeInfo.publishedDate + "</span>");
                bookDiv.append("<p>" + data.items[i].volumeInfo.description + "</p>");
                resultsDiv.append(bookDiv);
            }
        },
        //Get info
        type: 'GET'
    });
}

//event listener to see what's going on
$("#book-search-button").on("click", bookSearch);

$(document).on('click', '.bookselect', function (event) {
    event.preventDefault();
    // console.log("chooseBook clicky", thumbnail);
    var bookthumbnail = $(this).attr("data-bookthumbnail");
    console.log("bookthumbnail: ", bookthumbnail);

    var resultsdiv = $('#results');

    resultsdiv.empty();
    resultsdiv.append('<img id="chosenbook" src="' + bookthumbnail + '" data-bookthumbnail="' + bookthumbnail + '">');


});



$(document).on('click', '#submit-event', function (event) {

    event.preventDefault();
    console.log("clicky");

    var clubevent = {
        eventname: $eventName.val().trim(),
        description: $eventDescription.val().trim(),
        date: $date,
        // time: $time.val().trim(),
        location: $location.val().trim(),
    }

    var thumb = $('#chosenbook').attr('data-bookthumbnail');

    if (thumb) {
        clubevent.bookthumbnail = thumb;
    }

    console.log("clubevent: ", clubevent);

    // if (!(clubevent.eventname && clubevent.description)) {
    //     alert('You must enter a event name and description!')
    //     return
    // }

    API.saveEvent(clubevent).then(function (newevent) {
        // var $div = $('.card-body');
        console.log("clubevent", clubevent);
        console.log("newevent", newevent);

        // refreshevents()
        window.location.replace('/clubs/' + theClubId);
        // $div.empty();
        // $div.append(newevent);
    });


});


// $submitBtn.on('click', handleFormSubmit);
// $submitBtn.on('click', test);



