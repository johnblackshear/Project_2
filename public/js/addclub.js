// Get references to page elements
var $clubName = $('#newclub-clubname');
var $clubDescription = $('#newclub-description');
var $submitBtn = $('#submit');

// The API object contains methods for each kind of request we'll make
var API = {
    saveClub: function (club) {
        return $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: 'api/addclub',
            data: JSON.stringify(club)
        });
    }
};

// handleFormSubmit is called whenever we submit a new club
// Save the new club to the db and refresh the list
var handleFormSubmit = function (event) {
    event.preventDefault()
    console.log("clicky");
    var club = {
        clubname: $clubName.val().trim(),
        description: $clubDescription.val().trim()
    }

    if (!(club.clubname && club.description)) {
        alert('You must enter a club name and description!')
        return
    }

    API.saveClub(club).then(function (newClub) {
        // refreshClubs()
        window.location.replace('/profile/');

    })


};

// Add event listener to the submit button
$submitBtn.on('click', handleFormSubmit)