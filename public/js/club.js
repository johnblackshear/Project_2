console.log("HEY");

var $joinButton = $('#club-join-btn');

var $addEventButton = $('#event-add-btn');

// var $clubID = $('')
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
    }
};

// // refreshClubs gets new Clubs from the db and repopulates the list
var refreshClub = function () {

    API.getClub(idToGet).then(function (data) {
        console.log("YO DATA: ", data);
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
        console.log("Ownerdata: ", data[0]);
        $ownerDiv.empty();
        var $owner = data[0];
        var $a = $('<a>')
            .text($owner.username)
            .attr('href', '/api/users/' + $owner.id)

        var $li = $('<li>').attr({class: 'memberlist'});


        $li.append($a);
        
        $ownerDiv.append($li);
    })
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

var handleAddEventBtnClick = function () {
    console.log("clicky");
    console.log("idToGet: ", idToGet);
    window.location.href = "/clubs/" + idToGet + "/addevent";

    // API.addEvent(idToGet);
}


refreshClub();


$joinButton.on('click', handleJoinBtnClick);
$addEventButton.on('click', handleAddEventBtnClick);