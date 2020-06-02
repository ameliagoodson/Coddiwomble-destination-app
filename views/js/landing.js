$(document).ready(function(){

  var blogContainer = $(".blog-container"); 

  
  $.get("/api/landing").then(function(data){
    //console.log({data});
    let destinations = data;
    console.log(destinations); 

    for(let index= 0; index < destinations.length; index++){
      const destination = destinations[index];
      const user = destinations[index].User.username; 
      
      console.log(user);
      var author = $("<h2>");
      author.addClass("text-author");
      author.text(user + " wants to go to " + destination.location)
      $(blogContainer).append(author)
    }
  })







});