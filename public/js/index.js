
// Get the search string User types in
var $clubNameSearchTerm = $('#club-name-search');
var $clubIdSearchTerm = $('#club-id-search');
// Search submit buttons
var $nameSubmitBtn = $('#club-name-search-submit');
var $idSubmitBtn = $('#club-id-search-submit');
// Results divs
var $clubNameResults = $('#club-name-search-results');
var $clubIdResults = $('#club-id-search-results');

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
    var search = $clubNameSearchTerm.val().trim();
    console.log("search term: ", search);
    if (!(search)) {
        alert('You must enter a search term!')
        return
    };
    API.nameSearchClubs(search).then(function (data) {
        console.log("data: ", data);
        console.log("data.length: ", data.length);

        for (var i = 0; i < data.length; i++) {
            var $clubid = data[i].id;
            var $clubname = data[i].clubname;

            var $a = $('<a>')
                .text($clubname)
                .attr('href', '/clubs/' + $clubid);

            var $li = $('<li>')
                .append('Club Name: ')
                .append($a)
                .append('<br>Club Id: ' + $clubid);

            $clubNameResults.empty();
            $clubNameResults.append('<h3>Results:</h3>');
            $clubNameResults.append($li);
        }


    });
};

// Click handler for club id search submit button
var handleClubIdSearch = function (event) {
    event.preventDefault();
    // console.log("clicky");    
    var search = $clubIdSearchTerm.val().trim();
    console.log("search term: ", search);
    if (!(search)) {
        alert('You must enter a search term!')
        return
    };
    API.idSearchClubs(search).then(function (data) {
        console.log("data: ", data);

        var $clubid = data.id;
        var $clubname = data.clubname;

        var $a = $('<a>')
            .text($clubname)
            .attr('href', '/clubs/' + $clubid);

        var $li = $('<li>')
            .append('Club Name: ')
            .append($a)
            .append('<br>Club Id: ' + $clubid);

        // return $li;
        $clubIdResults.empty();
        $clubIdResults.append('<h3>Results:</h3>');
        $clubIdResults.append($li);
    });

};

// Add event listener to the submit button
$nameSubmitBtn.on('click', handleClubNameSearch);
$idSubmitBtn.on('click', handleClubIdSearch);



