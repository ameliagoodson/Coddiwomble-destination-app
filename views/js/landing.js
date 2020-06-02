$(document).ready(function(){

  var blogContainer = $(".blog-container"); 
  
  $.get("/api/landing").then(function(data){
    console.log({data});
    let userInfo = data[0].location;
    console.log(userInfo); 

  })







});