
var $clubMemberListColumn = $('#club-member-list');
var $ownerDiv = $('#owner');
var idToGet = $('#join-btn-id').attr('data-clubid');


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
    getClubEvents: function (id) {
        return $.ajax({
            url: '/api/clubs/' + id + '/events',
            type: 'GET'
        });
    }
};



// refreshEvent gets new info from the db and repopulates the list
var refreshEvent = function () {

    API.getClub(idToGet).then(function (data) {
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

    API.getOwner(idToGet).then(function (data) {
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

    // THIS CODE DISPLAYS EVENTS ON THE CLUB MAIN PAGE
    API.getClubEvents(idToGet).then(function (data) {

        for (var i = 0; i < data.length; i++) {
            var $date = data[i].date;
            var $year = $date.substring(0, 4);
            var $month = $date.substring(5, 7);
            var $montharray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
            $month = $month - 1;
            var $monthName = $montharray[$month];
            var $day = $date.substring(8, 10);

            var $eventDiv = $('<div class="eventbrief clearfix">');
            var $eventDateDiv = $('<div class="eventdate">');
            var $eventBookDiv = $('<div class="eventbook"></div>');
            var $eventDetailDiv = $('<div class="eventdetail">');

            var $eventId = data[i].id;
            var $eventName = data[i].eventname;
            var $description = data[i].description;
            var $location = data[i].location;
            var $bookthumbnail = data[i].bookthumbnail;

            $eventBookDiv.html('<img src="' + $bookthumbnail + '"><br>');

            $eventDateDiv.append($day + '<br>' + $monthName + '<br>' + $year + '<br>');
            $eventDetailDiv.append('<h5><a href="/clubs/' + idToGet + '/events/' + $eventId + '">' + $eventName + '</a></h5>' + $description + '<br>' + $location);

            $eventDiv.append($eventDateDiv, $eventDetailDiv, $eventBookDiv);
            $clubEventBriefDiv.append($eventDiv);
        }
    });

    refreshEvent();

};