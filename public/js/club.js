console.log("HEY");

var $joinButton = $('#join-btn');

// The API object contains methods for each kind of request we'll make
var API = {
    joinClub: function (id) {
        return $.ajax({
            url: 'api/clubs/' + req.params.id,
            type: 'POST'
        });  
    }  
};

// // refreshClubs gets new Clubs from the db and repopulates the list
// var refreshClubs = function () {
//     API.getClubs().then(function (data) {

//         var $clubs = data.map(function (club) {
//             var $a = $('<a>')
//                 .text(club.clubname)
//                 .attr('href', '/clubs/' + club.id)
//                 .append('<br>')

//             var $desc = $('<span>')
//                 .text(club.description)

//             var $li = $('<li>')
//                 .attr({
//                     class: 'list-group-item',
//                     'data-id': club.id
//                 })
//                 .append($a)
//                 .append($desc)

//             var $button = $('<button>')
//                 .addClass('btn btn-danger float-right delete')
//                 .text('ｘ')

//             $li.append($button)

//             return $li
//         })

//         $clubList.empty();
//         $clubList.append($clubs);
//     })
// }





// // handleDeleteBtnClick is called when a club's delete button is clicked
// // Remove the club from the db and refresh the list
// var handleDeleteBtnClick = function () {
//     var idToDelete = $(this)
//         .parent()
//         .attr('data-id')

//     API.deleteClub(idToDelete).then(function () {
//         refreshClubs()
//     })
// }


var handleJoinBtnClick = function () {
    console.log("clicky")
    var idToJoin = $(this)
        .parent()
        .attr('data-id')

    API.joinClub(idToJoin).then(function () {
        // refreshClubs()
        console.log("Eh?")
    })
}


// refreshClubs();

// $clubList.on('click', '.delete', handleDeleteBtnClick);

$joinButton.on('click', handleJoinBtnClick);

