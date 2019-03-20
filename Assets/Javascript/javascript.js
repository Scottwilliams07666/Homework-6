$(function() {

})


const marvelHeroes = ["Wolverine", "Hulk", "Captain America", "Magneto", "Thor", "Iron Man", "Spider-Man", "Black Panther", "Deadpool", "Thanos", "X-Men", "Ant-Man", "Loki"];


function renderButtons() {

    
    $("#buttons-view").empty();

    
    for (var i = 0; i < marvelHeroes.length; i++) {
        
        const b = $("<button class='btn btn-info'>");
        
        b.addClass("hero-btn");
        
        b.attr("data-name", marvelHeroes[i]);
        
        b.text(marvelHeroes[i]);
        
        $("#buttons-view").append(b);
    }
};   



function displayRatingInfo() {

    const h = $(this).attr('data-name');
    
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + h + "&api_key=JeS62reL77iUCRE2UKqmCbS2H7X1JkAw&limit=10";
    
    $.ajax({
        url:queryURL, 
        method: 'GET'
    }).then(function(response) {
        var results = response.data;
        

        $('#heroes-view').empty();

            for(var i=0; i < results.length; i++) {
            
                const heroesDiv = $("<div class='superH'>"); 
                const rating = results[i].rating;
                
                const p = $("<p>").text("Rating: " + rating);
                const heroImage = $("<img>");

                heroImage.attr("src", results[i].images.fixed_height_still.url);
                heroImage.attr("data-still", results[i].images.fixed_height_still.url);
                heroImage.attr("data-animate", results[i].images.fixed_height.url);
                heroImage.attr("data-state", "still")
                heroImage.attr("class", "pause")

                heroesDiv.prepend(p);
                heroesDiv.prepend(heroImage);

                $('#heroes-view').prepend(heroesDiv);

                
                
            }
        });
};




$('#add-hero').on('click', function(event) {
    


    event.preventDefault();

    const hero = $("#heroes-input").val().trim();

    marvelHeroes.push(hero);


    renderButtons();
});

$('#heroes-view').on('click', '.pause', function() {
    
   
   const state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
 });




$(document).on('click', '.hero-btn', displayRatingInfo);

renderButtons();
