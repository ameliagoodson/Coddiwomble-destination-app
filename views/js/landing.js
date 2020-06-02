$(document).ready(function(){

  var blogContainer = $(".blog-container"); 
  
  $.get("/api/landing").then(function(data){
    //console.log({data});
    let destinations = data;
    console.log(destinations); 

    for(let index= 0; index < destinations.length; index++){
      const destination = destinations[index];
      let list = $("<li>"); 
      list.text(destination.location);
      $(blogContainer).append(list);

    }

  })







});