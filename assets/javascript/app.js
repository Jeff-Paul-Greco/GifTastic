
var topics = ["cat", "dog", "bunny", "otter", "horse", "goat", "fish", "bird", "hamster", "gerbil"]

function displayAnimals() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=Q3HX0d7TdoKZ3GWcGbRwF86G4Ulh6TG4&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var call = response.data;

        console.log(call);

        for (var i = 0; i < call.length; i++) {

            var animalDiv = $("<div class='col-md-6 animal-line'>");
            var p = $("<p>").text("Rating: " + call[i].rating.toUpperCase());
            var animalGif = $("<img>");
            animalGif.addClass("gif");
            animalGif.attr("src", call[i].images.fixed_height_still.url);
            animalGif.attr("data-state", "still");
            animalGif.attr("data-animate", call[i].images.fixed_height.url);
            animalGif.attr("data-still", call[i].images.fixed_height_still.url);
            animalDiv.append(p);
            animalDiv.append(animalGif);
            $("#gifs-here").prepend(animalDiv);

        }
    });
}

$(document).on("click", ".gif", function () {

    var current = $(this).attr("data-state");

    if (current === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

function renderButtons() {

    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {

        var button = $("<button>");
        button.addClass("animal-btn btn btn-success btn-xs mr-2 mt-2");
        button.attr("id", "rendered");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#buttons").append(button);

    }
}

$("#add-animal").on("click", function (event) {

    event.preventDefault();
    var animal = $("#add-buttons").val().trim();
    topics.push(animal);
    $("#add-buttons").val("");
    renderButtons();

});

$(document).on("click", ".animal-btn", displayAnimals);

renderButtons();
