
// Get references to page elements
var $newuserUsername = $('#newuser-username');
var $newuserPassword = $('#newuser-password');
var $newuserEmail = $('#newuser-email');
var $submitBtn = $('#submit');

// The API object contains methods for each kind of request we'll make
var API = {
    saveUser: function (user) {
        return $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'POST',
            url: 'api/register',
            data: JSON.stringify(user)
        })
    }
};

// handleFormSubmit is called whenever we submit a new user
// Save the new user to the db
var handleFormSubmit = function (event) {
    event.preventDefault();
    console.log("clicky");
    var user = {
        username: $newuserUsername.val().trim(),
        password: $newuserPassword.val().trim(),
        email: $newuserEmail.val().trim()
    };
    if (!(user.username && user.password && user.email)) {
        alert('You must enter a username and password and email!')
        return
    };
    API.saveUser(user).then(function () {
        console.log("saved, remember to clear input fields");
        window.location.href = "/login";
    });
};

// Add event listener to the submit button
$submitBtn.on('click', handleFormSubmit);
