$(document).ready(function(){
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $("#button").on("click", function(){
    event.preventDefault(); 
    console.log(" click")
    search()
  }); 

  function search(){
    var destination = $("#location-input").val().trim();
    console.log(destination)
  }
  
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.username);
  });



});

