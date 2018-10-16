var topics = ["Fc Barcelona", "Manchester city", "Yankees", "Steelers", "Golden State"];

function displayGif(){
    $("#gif-view").empty();
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=5hQUxd8fj1QLuMann6Yf6LGGPhoE1ZY9&q=" + topic + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var results = response.data;
        console.log(response)
        for(var i = 0; i < results.length; i++){
            var topicDiv = $("<div class=gif-holder>");

            var topicImg = $("<img class='gif'>");

            topicImg.attr({
                "src": results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still" 
            });

            var p = $("<p>").text("Rating: " + results[i].rating);

            topicDiv.append(topicImg);
            topicDiv.append(p);

            $("#gif-view").append(topicDiv);
        }
    });
}

function renderButtons(){
    $("#btn-display").empty();

    for(var i = 0; i < topics.length; i++){
        var a = $("<button>");
        a.addClass("topic-btn btn btn-danger");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#btn-display").append(a);
    }
}

$("#add-topic").on("click", function(event){
    event.preventDefault();

    var topic = $("#text-input").val().trim();

    topics.push(topic);

    renderButtons();
});

$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");

    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");        
    }
});

$(document).on("click", ".topic-btn", displayGif);

renderButtons();