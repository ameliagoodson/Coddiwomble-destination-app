$(document).ready(function(){
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  var destinationInput = $("#location-input");
  var destinationForm = $("#location-button");
  console.log(destinationInput);

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function destinationPost(location) {
    console.log(location);
    $.post("/api/destination", {
      location : location,
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      });
  }

  // When the signup button is clicked, we validate the email and password are not blank
  destinationForm.on("click", function(event) {
    console.log(destinationInput.val());
    event.preventDefault();
    var destinationData = {
      destinationDataname: destinationInput.val().trim(),
    };

    // If we have an email and password, run the signUpUser function
    destinationPost(destinationData.destinationDataname);

  });

  

  $.get("/api/destination").then(function(data){

    let ul = $(".wishlist")[0]
    console.log({data});
    let destinations = data.data;

    for (let index = 0; index < destinations.length; index++) {
      const destination = destinations[index];
      let list = $("<li>")
      let deletebtn = $("<button>")
      list.text(destination.location)
      deletebtn.text("");
      // deletebtn.classList.add(".deletebtn") -- Why is this not working??
      $(ul).append(list)
      $(ul).append(deletebtn)
    }
  })

  $.get("/api/user_data").then(function(data) {
    console.log(data);
    $("#member-name").text(data.username);
  });



});

