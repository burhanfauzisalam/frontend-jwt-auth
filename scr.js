$(document).ready(function () {
  const welcome = $("body").html(`
                <h4>Selamat datang, <span id="name"></span></h4>
                <br /><br />
                <button id="logout">Logout</button>
              `);
  const logout = $("#logout").click(() => {
    localStorage.clear();
    window.location.replace("./");
  });

  if (localStorage.getItem("token") == null) {
    $("body").html(`
      <form id="login-form">
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    `);
    $("#login-form").submit(function (e) {
      e.preventDefault();

      var email = $('input[name="email"]').val();
      var password = $('input[name="password"]').val();

      $.ajax({
        url: "https://doubtful-belt-clam.cyclic.app/login",
        method: "POST",
        data: { email: email, password: password },
        success: function (response) {
          localStorage.setItem("token", response.accessToken);
          $.ajax({
            url: "https://doubtful-belt-clam.cyclic.app/parents",
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            success: function (response) {
              const token = localStorage.getItem("token");
              console.log(response.parents.p_email);
              console.log(token);
              window.location.replace("./");
              welcome;
              $("#name").text(response.parents.p_name);
              logout;
            },
            error: function (xhr, status, error) {},
          });
        },
        error: function (xhr, status, error) {
          // Handle error response
        },
      });
    });
  } else {
    $.ajax({
      url: "https://doubtful-belt-clam.cyclic.app/parents",
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      success: function (response) {
        const token = localStorage.getItem("token");
        console.log(response.parents.p_email);
        console.log(token);
        welcome;
        $("#name").text(response.parents.p_name);
        logout;
      },
      error: function (xhr, status, error) {},
    });
  }
});
