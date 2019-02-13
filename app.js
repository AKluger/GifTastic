window.onload = function () {

    var APIKey = "yQCxNg8ge124VevFZPY3tVrN0POiyQEx";
    var topics = ["cat", "fish", "sloth", "otter", "seal", "monkey", "puppy", "penguin", "pigeon"];
    var counter = 0;
    function displayAnimals() {
        $(this).attr("data-clicks");
        var l = 24;

        if ($(this).attr("data-clicks") != undefined) {
            l = 10;
        }

        $(this).attr("data-clicks", counter++)
       
        var topic = $(this).attr("data-name");

        var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=yQCxNg8ge124VevFZPY3tVrN0POiyQEx&limit=" + l;

        var movieURL = "https://www.omdbapi.com/?t=" + topic + "&y=&plot=short&apikey=trilogy"
        //returns object with array called data.
        // Creates AJAX call for the specific animal button being clicked
        $.ajax({
            url: giphyURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            for (var i = 0; i < results.length; i++) {

                var animalDiv = $("<div/>");
                var p = $("<p/>");
                var t = $("<p/>");
                var c = $("<button>");
                $(p).text("Rating: " + results[i].rating).addClass("h5 mb-2")
                $(t).text(results[i].title).addClass("h5 mb-1");
                $(c).text("Add to Favorites").addClass("btn-primary favorites mb-4")
                var animalImage = $("<img/>");
                $(animalImage).attr("src", results[i].images.fixed_height_still.url);
                $(animalDiv).append(t, animalImage, p, c).addClass("bg-white")
                $(animalImage).attr("data-still", results[i].images.fixed_height_still.url)
                $(animalImage).attr("data-animate", results[i].images.fixed_height.url)
                $(animalImage).attr("data-state", "still").addClass("gif mw-100")
                $("#animals-view").prepend(animalDiv)
            }
        });

    }

    //button to add gif to favorites
    //need to reference to document first because that will exist on page load, as opposed to favorites classes which does not yet..
    $(document).on("click", ".favorites", function () {
        var fave = $(this).closest("div").find(".gif")   //looks up to next div then back in for closest .gif
        $(fave).clone().appendTo("#favoriteDiv").addClass("m-2");  
    })

    
    // create ajax callback function to query giphy using my API.
    function renderButtons() {

        $("#buttons-view").empty();

        // Loops through the array of animals
        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("animal btn-dark mr-2 mb-1 p-3");
            // Added a data-attribute
            a.attr("data-name", topics[i]);
            // Provided the initial button text
            a.text(topics[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where the add topic button is clicked
    $("#add-animal").on("click", function (event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();
        topics.push(animal);
        renderButtons();
        $("#animal-input").val("")
    })

    $(document).on("click", ".gif", function () {

        // variable named state to store the image's data-state into it.
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", 'animate')
        }

        if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", 'still')
        }
    });

    renderButtons();
    $(document).on("click", ".animal", displayAnimals);
   

}