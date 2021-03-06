
         

//On click/'enter' store input as a variable and pass to giantbomb url
$("#click-search").on("click", function(event) {
   var searchTerm = $("#searchValue").val().trim();
    var queryUrl = 'https://www.giantbomb.com/api/search/?format=jsonp&api_key=687d257ace2a1dad49e71172b53403375c11d333&query=' + searchTerm + '&resources=game'; 

    event.preventDefault();
    $("#resultsDiv").html("");
    $("#trailerResults").html("");
    $(".loader").removeClass("hide")
    $("#trailersBtn").removeClass("hide")
  

    
    $("#main-space").empty();
    //request data from giantbomb
    $.ajax({
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        url:  queryUrl, 
    }).done(function(response) {
      console.log(response);

      
        $(".loader").addClass("hide");
        var results = response.results
        console.log(results);

        //sorts the response array in order by date added
        results.sort(function(a, b) {
            return new Date(b.date_added) - new Date(a.date_added);
        });

        //loop through response and get the necessary data for the 10 most recent/relevent search resuts/game results
        for (var i = 0; i < 10; i++) {
            var gameInfoDiv = $("<div class='row gameInfoDiv'>");
            gameInfoDiv.css("animation-direction", "reverse")
            gameInfoDiv.css("padding-top", "30px");
            gameInfoDiv.attr("id", "result-" + i);
            gameInfoDiv.append("<img class='col-md-6 col-md-offset-2 gameImage' src=" + results[i].image.medium_url + ">");
            ;
            gameInfoDiv.append("<div class='col-md-5'><div class='gameName'><p>" + results[i].name + "</p><div>" +
                    "<div class='deck'><p>" + JSON.stringify(results[i].deck) + "</p><div>" +
                    "<div class='deck'><p>" + new Date(" " + results[i].original_release_date).toDateString() + "</p><div>",)
                gameInfoDiv.css("border", "2px solid gray");

            $("#resultsDiv").append(gameInfoDiv);
        }


        $("#trailersBtn").on("click", function() {       
            $("#resultsDiv").html("")
            $.ajax({
                cache: false,
                data: $.extend({
                    key: 'AIzaSyDDj_AcWjGNwn1eXlP4bavbvWzlgj6G5Q8',
                    q: $("#searchValue").val().trim() + "video game trailer",
                    part: 'snippet'
                }, { maxResults: 10, pageToken: $("#pageToken").val() }),
                dataType: 'json',
                type: 'GET',
                timeout: 5000,
                url: 'https://cors-anywhere.herokuapp.com/https://www.googleapis.com/youtube/v3/search'
            }).done(function(response) {
                console.log(response.items[0].id.videoId);
                for (var i = 0; i < response.items.length; i++) {
                    var trailerDiv = $("<div class='col-md-5 gameTrailer'>");
                    trailerDiv.css("margin-top", "20px")
                    trailerDiv.css("margin-bottom", "20px")
                    trailerDiv.css("margin-left", "75px")
                    trailerDiv.append($("<iframe allowfullscreen='allowfullscreen' align='center' width='500' height='315'src='https://www.youtube.com/embed/" + response.items[i].id.videoId + "'></iframe>"));

                    $("#trailerResults").append(trailerDiv);
                }
            }).fail(function() {
        		alert("error");
    		}); 
    	});
	});
});



var ignURL = "https://newsapi.org/v1/articles?source=ign&sortBy=top&apiKey=63e4877bdc6a4e6aa814e270f021ce1f"

$.ajax({
    type: 'GET',
    dataType: 'json',
    crossDomain: true,
    contentType: "text/html",
    url: 'https://cors-anywhere.herokuapp.com/' + ignURL,

}).done(function(response) {
    console.log("response:")
    console.log(response.articles[0]);

    for (var i = 0; i < 5; i++) {
        var newsLink = $("<a href='" + response.articles[i].url + "'>" + response.articles[i].title + "</a>");
        $("#newsFeed").append(newsLink);
        console.log(newsLink);
    }
});

$(".mouseOverSection").click(function() {
    $("#footer").slideToggle();

});