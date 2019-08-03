console.log("club.js");
var $joinButton = $('#club-join-btn');
var $addEventButton = $('#event-add-btn');
var $clubEventBriefDiv = $('#club-event-brief');
var $clubMemberListColumn = $('#club-member-list');
var $ownerDiv = $('#owner');
var idToGet = $('#join-btn-id').attr('data-clubid');
console.log("idToGet: ", idToGet);

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
    joinClub: function (id) {
        return $.ajax({
            url: '/api/clubs/' + id,
            type: 'POST'
        });
    },
    addEvent: function (id) {
        return $.ajax({
            url: '/api/clubs/' + id + '/addevent',
            type: 'GET'
        });
    },
    getClubEvents: function (id) {
        return $.ajax({
            url: '/api/clubs/' + id + '/events',
            type: 'GET'
        });
    }
};

// // refreshClub gets new info from the db and repopulates the list
var refreshClub = function () {

    API.getClub(idToGet).then(function (data) {
        console.log("CLUB DATA: ", data);
        var $members = data.Users.map(function (user) {
            var $a = $('<a>')
                .text(user.userName)
                .attr('href', '/api/users/' + user.id)
                .append(', ')
            return $a
        })
        $clubMemberListColumn.empty();
        $clubMemberListColumn.append($members);
    });

    API.getOwner(idToGet).then(function (data) {
        console.log("Ownerdata: ", data[0]);
        $ownerDiv.empty();
        var $owner = data[0];
        var $a = $('<a>')
            .text($owner.username)
            .attr('href', '/api/users/' + $owner.id)
        var $li = $('<li>').attr({ class: 'memberlist' });
        $li.append($a);
        $ownerDiv.append($li);
    });
    // THIS CODE DISPLAYS EVENTS ON THE CLUB MAIN PAGE
    API.getClubEvents(idToGet).then(function (data) {
        console.log("Events: ", data);

        for (var i = 0; i < data.length; i++) {
            console.log("data[i]", data[i]);

            var $date = data[i].date;
            console.log("date: ", $date);
            var $year = $date.substring(0, 4);
            console.log("year: ", $year);
            var $month = $date.substring(5, 7);
            var $montharray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            $month = $month - 1;
            console.log("month: ", $month);
            var $monthName = $montharray[$month];
            console.log("monthName: ", $monthName);
            var $day = $date.substring(8, 10);
            console.log("day: ", $day);

            var $eventDiv = $('<div class="eventbrief clearfix">');
            var $eventDateDiv = $('<div class="eventdate">');
            var $eventBookDiv = $('<div class="eventbook"></div>');
            var $eventDetailDiv = $('<div class="eventdetail">');

            var $eventName = data[i].eventname;
            var $description = data[i].description;
            var $location = data[i].location;
            var $book = data[i].book;

            $eventBookDiv.html('<img src="../../public/images/logo-icon.png"><br>' + $book);

            $eventDateDiv.append($day + '<br>' + $monthName + '<br>' + $year + '<br>');
            // $eventBookDiv.append();
            $eventDetailDiv.append('<h5>' + $eventName + '</h5>' + $description + '<br>' + $location);

            $eventDiv.append($eventDateDiv, $eventDetailDiv, $eventBookDiv);
            $clubEventBriefDiv.append($eventDiv);
        }
    });

};

var handleJoinBtnClick = function () {
    $(this).attr("data-clubid")
    console.log("clicky");
    var idToJoin = $(this)
        .attr('data-clubid');
    console.log(idToJoin);
    API.joinClub(idToJoin);
    $joinButton.hide();
    refreshClub();
};

// Club owner will see Add Event button, click will redirect to the addevent page
var handleAddEventBtnClick = function () {
    console.log("clicky");
    console.log("idToGet: ", idToGet);
    window.location.href = "/clubs/" + idToGet + "/addevent";
};

refreshClub();

$joinButton.on('click', handleJoinBtnClick);
$addEventButton.on('click', handleAddEventBtnClick);
