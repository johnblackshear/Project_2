console.log("addevent.js");

// Get references to page elements
var $eventName = $('#newevent-eventname');
var $eventDescription = $('#newevent-description');
var $date = $('#calendarDate');
var $location = $('#newevent-location');
var $clubEventBriefDiv = $('#club-event-brief');
var $clubMemberListColumn = $('#club-member-list');
var $ownerDiv = $('#owner');
var $submitBtn = $('#submit');
var theClubId = $('#theClubId').attr('data-clubid');
var idToGet = $('#join-btn-id').attr('data-clubid');

// The API object contains methods for each kind of request we'll make
var API = {
    getClub: function (id) {
        return $.ajax({
            url: '/api/clubs/' + id,
            type: 'GET'
        });
    },
    getClubOwner: function (id) {
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
    API.getClub(idToGet).then(function (data) {
        console.log("CLUB DATA: ", data);
        var $clubOwnerId = data.UserId;
        var $members = data.Users.map(function (user) {
            var $a = $('<a>')
                .text(user.username)
                .attr('href', '/api/users/' + user.id)
                .append(', ')
            return $a
        });
        $clubMemberListColumn.empty();
        $clubMemberListColumn.append($members);

        API.getClubOwner($clubOwnerId).then(function (data) {
            console.log("data : ", data);
            console.log("data[0].username : ", data[0].username);
            var $clubOwner = data[0].username;
            var $ownerLink = $('<a>')
                .text($clubOwner)
                .attr('href', '/api/users/' + $clubOwnerId);
            $ownerDiv.empty();
            $ownerDiv.append($ownerLink);
        });
    });

};

refreshClub();

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

