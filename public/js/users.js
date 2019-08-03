console.log("HEY");

var $userList = $('#user-list');

// The API object contains methods for each kind of request we'll make
var API = {
    getUsers: function () {
        return $.ajax({
            url: 'api/users',
            type: 'GET'
        });
    },
    getUser: function (id) {
        return $.ajax({
            url: 'api/users' + id,
            type: 'GET'
        });
    },
    deleteUser: function (id) {
        return $.ajax({
            url: 'api/users/' + id,
            type: 'DELETE'
        });
    }, 
    updateUser: function (id){
        return $.ajax({
            url: 'api/users/' + id,
            type: 'PUT'
        });
    },
    
};

// refreshUsers gets new Users from the db and repopulates the list
var refreshUsers = function () {
    API.getUsers().then(function (data) {

        var $users = data.map(function (user) {

            var $d = $('<div class="clearfix odd">')
                .html('<div class=field>Username:</div><div class=value><a href=/api/users/' + user.id + '>' +  user.username + '</a></div>')

            var $e = $('<div class="clearfix even">')
                .html('<div class=field>Email:</div><div class=value>' +  user.email + '</div>')

            var $li = $('<li>')
                .attr({
                    class: 'user-list clearfix',
                    'data-id': user.id
                })
                .append($d, $e)
            // .append($desc)

            var $button = $('<button>')
                .addClass('btn btn-danger delete')
                .text('Delete ' + user.username)

            $li.append($button)

            return $li
        })

        $userList.empty();
        $userList.append($users);
    })
}





// handleDeleteBtnClick is called when a user's delete button is clicked
// Remove the user from the db and refresh the list
var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
        .parent()
        .attr('data-id')

    API.deleteUser(idToDelete).then(function () {
        refreshUsers()
    })
}

refreshUsers();

$userList.on('click', '.delete', handleDeleteBtnClick);


