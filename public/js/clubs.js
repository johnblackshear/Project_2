var $clubList = $('#club-list');

// The API object contains methods for each kind of request we'll make
var API = {
    getClubs: function () {
        return $.ajax({
            url: 'api/clubs',
            type: 'GET'
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

        var $clubs = data.map(function (club) {
            var $a = $('<a>')
                .text(club.clubname)
                .attr('href', '/clubs/' + club.id)
                .append('<br>')

            var $desc = $('<span>')
                .text(club.description)

            var $li = $('<li>')
                .attr({
                    class: 'list-group-item',
                    'data-id': club.id
                })
                .append($a)
                .append($desc)

            var $button = $('<button>')
                .addClass('btn btn-danger float-right delete')
                .text('ｘ')

            $li.append($button)

            return $li
        })

        $clubList.empty();
        $clubList.append($clubs);
    })
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

refreshClubs();

$clubList.on('click', '.delete', handleDeleteBtnClick);
