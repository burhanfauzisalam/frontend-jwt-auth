$(document).ready(function(){

    if (localStorage.getItem('token') == null) {
        window.location.replace("index.html")
    } else {
        $.ajax({
            url: 'https://doubtful-belt-clam.cyclic.app/parents',
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            success: function(response) {
              const token = localStorage.getItem('token')
              console.log(response.parents.p_email)
              console.log(token)
              $('#name').text(response.parents.p_name)
            },
            error: function(xhr, status, error) {
                window.location.replace("../")
            }
        });
    }

    
    
    $('#logout').click(()=>{
        localStorage.clear()
        window.location.replace("index.html")
    })

})