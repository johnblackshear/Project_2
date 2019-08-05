// Get references to page elements
var $eventName = $('#newevent-eventname');
var $eventDescription = $('#newevent-description');
var $date = $('#calendarDate');
// var $date = $('#newevent-date');
// var $time = $('#newevent-time');
var $location = $('#newevent-location');
// var $book = $('#newevent-book');
var $clubEventBriefDiv = $('#club-event-brief');
var $clubMemberListColumn = $('#club-member-list');
var $ownerDiv = $('#owner');

var $submitBtn = $('#submit');
var theClubId = $('#theClubId').attr('data-clubid');

// The API object contains methods for each kind of request we'll make
var API = {
    getClub: function (id) {
        return $.ajax({
            url: '/api/clubs/' + id,
            type: 'GET'
        });
    },
    getOwner: function (id) {
        return $.ajax({
            url: '/api/users/' + id,
            type: 'GET'
        });
    },
    saveEvent: function (event) {
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

// // refreshClub gets new info from the db and repopulates the list
var refreshClub = function () {
    API.getClub(theClubId).then(function (data) {
        // console.log("CLUB DATA: ", data);
        var $members = data.Users.map(function (user) {
            var $a = $('<a>')
                .text(user.username)
                .attr('href', '/api/users/' + user.id)
                .append(', ')
            return $a
        })
        $clubMemberListColumn.empty();
        $clubMemberListColumn.append($members);
    });
    API.getOwner(theClubId).then(function (data) {
        // console.log("Ownerdata: ", data[0]);
        $ownerDiv.empty();
        var $owner = data[0];
        var $a = $('<a>')
            .text($owner.username)
            .attr('href', '/api/users/' + $owner.id)
        var $li = $('<li>').attr({ class: 'memberlist' });
        $li.append($a);
        $ownerDiv.append($li);
    });
};

// create a search funtion
function bookSearch() {
    //taking user input and store the value inside of the variable to use
    var search = document.getElementById("search").value;
    document.getElementById("results").innerHTML = "";
    var resultsDiv = $('#results');

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
};

refreshClub();

//event listener to see what's going on
$("#book-search-button").on("click", bookSearch);

$(document).on('click', '.bookselect', function (event) {
    event.preventDefault();
    // console.log("chooseBook clicky", thumbnail);
    var bookthumbnail = $(this).attr("data-bookthumbnail");
    var resultsdiv = $('#results');
    resultsdiv.empty();
    resultsdiv.append('<img id="chosenbook" src="' + bookthumbnail + '" data-bookthumbnail="' + bookthumbnail + '">');
});

$(document).on('click', '#submit-event', function (event) {
    event.preventDefault();
    console.log("event.eventname: ", $eventName.val().trim());
    console.log("event.description: ", $eventDescription.val().trim());
    console.log("event.location: ", $location.val().trim());

    $date = $date.val().trim();
    console.log("$date: ", $date);
    $date = $date.concat(' 05:00:00');
    console.log("$date: ", $date);

    if (!($eventName && $eventDescription && $location && $date)) {
        alert('You must fill out all fields!');
        return;
    };

    // var getEventDate = $( "#test" ).datepicker( "getDate" );
    // console.log("getEventDate: ", getEventDate);


    var clubevent = {
        eventname: $eventName.val().trim(),
        description: $eventDescription.val().trim(),
        date: $date,
        // time: $time.val().trim(),
        location: $location.val().trim(),
    };
    console.log("clubevent: *****", clubevent);

    var thumb = $('#chosenbook').attr('data-bookthumbnail');
    if (thumb) {
        clubevent.bookthumbnail = thumb;
    };
    API.saveEvent(clubevent).then(function (newevent) {
        window.location.replace('/clubs/' + theClubId);
    });
});





