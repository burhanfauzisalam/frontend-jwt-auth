$(document).ready(function() {

  if (localStorage.getItem('token') == null) {
    window.location.replace("./")
  } else {
    window.location.replace("./home.html")
  }

  $('#login-form').submit(function(e) {
    e.preventDefault();

    var email = $('input[name="email"]').val();
    var password = $('input[name="password"]').val();

    $.ajax({
      url: 'https://doubtful-belt-clam.cyclic.app/login',
      method: 'POST',
      data: { email: email, password: password },
      success: function(response) {
        localStorage.setItem('token', response.accessToken);
        window.location.replace("home.html")
        
      },
      error: function(xhr, status, error) {
        // Handle error response
      }
    });
  });
});
