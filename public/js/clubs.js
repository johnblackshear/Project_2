console.log("HEY");

var $clubList = $('#club-list');
var $yourClubList = $('#your-club-list');

// The API object contains methods for each kind of request we'll make
var API = {
    getClubs: function () {
        return $.ajax({
            url: 'api/clubs',
            type: 'GET'
        });
    },
    getYourClubs: function (id) {
        return $.ajax({
            url: 'api/users/' + id + '/clubs',
            type: 'GET'
        });
    },
    joinClub: function (id) {
        return $.ajax({
            url: 'api/clubs/' + id,
            type: 'POST'
        });
    },
    deleteClub: function (id) {
        return $.ajax({
            url: 'api/clubs/' + id,
            type: 'DELETE'
        });
    }
};

// refreshClubs gets new Clubs from the db and repopulates the list
var refreshClubs = function () {

    API.getClubs().then(function (data) {
        console.log("check this data: ", data);
        var $clubs = data.map(function (club) {
            var $a = $('<a class="clubtitle">')
                .text(club.clubname)
                .attr('href', '/clubs/' + club.id)
            var $desc = $('<div>')
                .text(club.description);
            var $date = club.createdAt;
            if ($date) {
                var $year = $date.substring(0, 4);
                var $month = $date.substring(5, 7);
                var $montharray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
                $month = $month - 1;
                var $monthName = $montharray[$month];
                var $day = $date.substring(8, 10);
                var $createdAtDateDiv = $('<div class="createdAtdate">');
                $createdAtDateDiv.append('Created: ' + $monthName + ' ' + $day + ', ' + $year);
            }
            var $li = $('<li>')
                .attr({
                    class: 'list-group-item',
                    'data-id': club.id
                })
                .append($a)
                .append($desc)
                .append($createdAtDateDiv)

            var $button = $('<button>')
                .addClass('btn btn-danger float-right delete')
                .text('ｘ')

            // $li.append($button)

            var $joinclub = $('<button>')
                .addClass('btn float-right joinbutton')
                .text('Join')

            // $li.append($joinclub)

            return $li
        })

        $clubList.empty();
        $clubList.append($clubs);
    });

    API.getYourClubs().then(function (data) {
        console.log("this data: ", data);
        if (data.length > 0) {
            console.log("check this data: ", data);
            $yourClubList.append('<h5>Your clubs:</h5>');

        }
    });

}





// handleDeleteBtnClick is called when a club's delete button is clicked
// Remove the club from the db and refresh the list
var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
        .parent()
        .attr('data-id')

    API.deleteClub(idToDelete).then(function () {
        refreshClubs()
    })
}

var handleJoinBtnClick = function () {
    console.log("clicky")
    var idToJoin = $(this)
        .parent()
        .attr('data-id')
    console.log("idtojoin", idToJoin);
    API.joinClub(idToJoin).then(function () {
        refreshClubs()
        console.log("Eh?")
    })
}


refreshClubs();

$clubList.on('click', '.delete', handleDeleteBtnClick);

$clubList.on('click', '.joinbutton', handleJoinBtnClick);


// handleJoinBtnClick);