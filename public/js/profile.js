console.log("HI PROFILE PAGE");

var $clubList = $('#club-list');

// The API object contains methods for each kind of request we'll make
var API = {
    getClubs: function () {
        return $.ajax({
            url: 'api/clubs',
            type: 'GET'
        });
    }
};

// // The API object contains methods for each kind of request we'll make
// var API = {
//     getClub: function (id) {
//         return $.ajax({
//             url: '/api/clubs/' + id,
//             type: 'GET'
//         });
//     },
//     joinClub: function (id) {
//         return $.ajax({
//             url: '/api/clubs/' + id,
//             type: 'POST'
//         });
//     }
// };

// // // refreshClubs gets new Clubs from the db and repopulates the list
// var refreshClub = function () {

//     var idToGet = $joinButton
//         .attr('data-clubid');
//     console.log("IDTOGET: ", idToGet);

//     API.getClub(idToGet).then(function (data) {
//         console.log("YO DATA: ", data);
//         var $members = data.Users.map(function (user) {
//             var $a = $('<a>')
//                 .text(user.username)
//                 .attr('href', '/api/users/' + user.id)
//                 .append('<br>')

//             var $li = $('<li>')
//                 .attr({
//                     class: 'list-group-item',
//                     'data-id': user.id
//                 })
//                 .append($a)
//             return $li
//         })
//         $clubList.empty();
//         $clubList.append($members);
//     });
// };


// var handleJoinBtnClick = function () {
//     $(this).attr("data-clubid")
//     console.log("clicky");
//     var idToJoin = $(this)
//         .attr('data-clubid');
//     console.log(idToJoin);
//     API.joinClub(idToJoin);
// };


// refreshClub();


// $joinButton.on('click', handleJoinBtnClick);

