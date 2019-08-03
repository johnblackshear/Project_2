
// Get the search string User types in
var $clubIdSearchTerm = $('#club-name-search');
var $clubNameSearchTerm = $('#club-id-search');

// var q = $clubSearchTerms.val().trim();

var $idSubmitBtn = $('#club-id-search-submit');
var $nameSubmitBtn = $('#club-name-search-submit');


// The API object contains methods for each kind of request we'll make
var API = {
    nameSearchClubs: function (search) {
        return $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: '/api/clubs/namesearch/' + search,
            data: JSON.stringify(search)
        })
    },
    idSearchClubs: function (search) {
        return $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'GET',
            url: '/api/clubs/idsearch/' + search,
            data: JSON.stringify(search)
        })
    }
};


// Click handler for club name search submit button
var handleClubNameSearch = function (event) {
    event.preventDefault();
    // console.log("clicky");
    var search = $clubIdSearchTerm.val().trim();
    console.log("search term: ", search);
    if (!(search)) {
        alert('You must enter a search term!')
        return
    };
    API.nameSearchClubs(search).then(function (results) {
        console.log("results: ", results);
        // window.location.href = "/login";
    });
};

// Click handler for club id search submit button
var handleClubIdSearch = function (event) {
    event.preventDefault();
    // console.log("clicky");    
    var search = $clubNameSearchTerm.val().trim();
    console.log("search term: ", search);
    if (!(search)) {
        alert('You must enter a search term!')
        return
    };
    API.idSearchClubs(search).then(function (results) {
        console.log("results: ", results);
        // window.location.href = "/login";
    });
};

// Add event listener to the submit button
$nameSubmitBtn.on('click', handleClubNameSearch);
$idSubmitBtn.on('click', handleClubIdSearch);

