window.onload = function() {

var APIKey = "yQCxNg8ge124VevFZPY3tVrN0POiyQEx";

var topics = ["cat", "fish", "sloth", "otter", "seal", "monkey", "beaver", "penguin"];


// var response = [];


function displayAnimals() {

    //this should refer to the button clicked
    console.log(this)
    var topic = $(this).attr("data-name");    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=yQCxNg8ge124VevFZPY3tVrN0POiyQEx&limit=24";

    //returns object with array called data.

    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
        console.log((response))  

        var results = response.data;
    for (var i = 0; i < results.length; i++)    {
    

    var animalDiv = $("<div/>");
    var p = $("<p/>");
    $(p).text("Rating: " + results[i].rating);
    var animalImage = $("<img/>");
    $(animalImage).attr("src", results[i].images.fixed_height.url);
    $(animalDiv).append(p, animalImage)

    $("#animals-view").prepend(animalDiv)
    }
    // // JSON.stringify
    // var image = $("<img/>");
    // $(image).attr("src", results[i].images.original_still.url )
   
    //   $("#animals-view").prepend(
    //     "<p> Rating: " + results[i].rating + "</p>",
    //     image

    //     // `<img src=${response.data[i].images.original_still.url}/>`
      
    //   )
        
    });

  }
// create ajax callback function to query giphy using my API.

function renderButtons() {

    $("#buttons-view").empty();

    // Loops through the array of animals
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generates buttons for each animal in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
   
    var a = $("<button>");
    // Adds a class of movie to our button
    a.addClass("animal");
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
    // This line of code will grab the input from the textbox
    var animal = $("#animal-input").val().trim();

    // The animal from the textbox is then added to our array
    topics.push(animal);

    // Calling renderButtons which handles the processing of our topics array
    renderButtons();

  })

  renderButtons();

  $(document).on("click", ".animal", displayAnimals);
  



}
//create button render function to begin.  Run at bottom of page.  Clear/empty then rerun upon input submit