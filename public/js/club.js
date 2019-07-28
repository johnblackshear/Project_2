console.log("HEY");

var $joinButton = $('#club-join-btn');

// var $clubID = $('')
var $clubMemberListColumn = $('#club-member-list');
var $ownerDiv = $('#owner');

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
    }
};

// // refreshClubs gets new Clubs from the db and repopulates the list
var refreshClub = function () {

    var idToGet = $('#join-btn-id').attr('data-clubid');

    API.getClub(idToGet).then(function (data) {
        console.log("YO DATA: ", data);
        var $members = data.Users.map(function (user) {
            var $a = $('<a>')
                .text(user.username)
                .attr('href', '/api/users/' + user.id)
                .append('<br>')

            var $li = $('<li>')
                .attr({
                    class: 'memberlist',
                    'data-id': user.id
                })
                .append($a)
            return $li
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


refreshClub();


$joinButton.on('click', handleJoinBtnClick);
