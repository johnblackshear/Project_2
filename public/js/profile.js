


console.log("HI PROFILE PAGE");

var $clubList = $('#club-list');

// The API object contains methods for each kind of request we'll make
var API = {
    getClubs: function (id) {
        return $.ajax({
            url: '/api/users/' + id + '/clubs',
            type: 'GET'
        });
    },
    getClubCount: function (id) {
        return $.ajax({
            url: '/api/users/' + id + '/clubs',
            type: 'GET'
        });
    }
};



// // // refreshClubs gets new Clubs from the db and repopulates the list
var refreshClub = function () {

    var idToGet = $clubList
        .attr('data-userid');
    console.log("IDTOGET: ", idToGet);

    API.getClubs(idToGet).then(function (data) {
        var county = data[0].Clubs2.length;
        if(county === 0){
            county = "<a href='/clubs'>Join a book club!</a>";
        }else if (county === 1){
            county = "Member of " +county + " book club:";
        }else {
            county = "Member of " +county + " book clubs:";
        };
        console.log("YO DATA: ", data);
        var $clubs = data[0].Clubs2.map(function (club) {
            var $a = $('<a>')
                .text(club.clubname)
                .attr('href', '/api/clubs/' + club.id)
                .append('<br>')

            var $li = $('<li>')
                .attr({
                    class: 'list-group-item',
                    'data-id': club.id
                })
                .append($a)
            return $li
        });
        $clubList.empty();
        $clubList.append($clubs);
        $(".count").append(county);
    });

};


// var handleJoinBtnClick = function () {
//     $(this).attr("data-clubid")
//     console.log("clicky");
//     var idToJoin = $(this)
//         .attr('data-clubid');
//     console.log(idToJoin);
//     API.joinClub(idToJoin);
// };


refreshClub();


// $joinButton.on('click', handleJoinBtnClick);

