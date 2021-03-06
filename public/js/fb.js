  
window.fbAsyncInit = function() {
    FB.init({
        appId   : '1037035339669877',
        oauth   : true,
        status  : true, // check login status
        cookie  : true, // enable cookies to allow the server to access the session
        xfbml   : true // parse XFBML
    });

  };

function fb_login(type){
    FB.login(function(response) {

        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            //console.log(response); // dump complete info
            access_token = response.authResponse.accessToken; //get access token
            user_id = response.authResponse.userID; //get FB UID
            serverLookup(response.authResponse,type, function(data){
                if(type == "doctor-registration"){
                    sessionStorage.setItem('doctorId', data);
                    window.location.replace("http://"+document.location.hostname+"/doctorform.html");
                }
                else if (type=="doctor-login"){
                    sessionStorage.setItem('doctorId', data);
                    
                    window.location.replace("http://"+document.location.hostname+"/doctorhomepage.html");    
                }
                else if (type=="patient-registration"){
                    sessionStorage.setItem('patientId', data);
                    window.location.replace("http://"+document.location.hostname+"/patientdashboard.html");        
                }
                else if (type=="patient-login"){
                    sessionStorage.setItem('patientId', data);
                    window.location.replace("http://"+document.location.hostname+"/patientdashboard.html");      
                }
            });

        } else {
            //user hit cancel button
            console.log('User cancelled login or did not fully authorize.');

        }
    }, {
        scope: 'email,user_posts,user_about_me'
    });
}

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
