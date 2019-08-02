
// Get references to page elements
// var $Username = $('#newuser-username');
// var $newuserPassword = $('#newuser-password');
var $newuserEmail = $('#newuser-email');
var $submitBtn = $('#submit');
var $location = $('#location');
var $genres = $('#favGenres');
var $authors = $('#favAuthors');
var $books = $('#favBooks');

// The API object contains methods for each kind of request we'll make
var API = {
    saveUser: function (user) {
        return $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: 'api/edit',
            data: JSON.stringify(user)
        })
    }
};

// Add event listener to the submit button
$submitBtn.on('click', handleEditFormSubmit);
// handleFormSubmit is called whenever we submit a new user
// Save the new user to the db
var handleEditFormSubmit = function (event) {
    event.preventDefault();
    console.log("UPDATE PROFILE");
    var user = {
        email: $newuserEmail.val().trim(),
        location: $location.val().trim(),
        favGenres: $favGenres.val().split(","),
        favAuthors: $favAuthors.val().split(","),
        favBooks: $favBooks.val().split(""),
        
    };
   
    API.saveUser(user).then(function () {
        
        window.location.href = "/profile";
    });
};

// Add event listener to the submit button
$submitBtn.on('click', handleEditFormSubmit);