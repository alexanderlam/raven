var url = 'https://yraven.herokuapp.com';

function serverLookup(authResponse,type,successAction) {
    var endpoint;
    if(type=="doctor-registration"){
        endpoint = "/doctor/register";
    }else if (type=="doctor-login"){
        endpoint = "/doctor/login";        
    }else if (type=="patient-registration"){
        endpoint = "/patient/register";        
    }else if (type=="patient-login"){
        endpoint = "/patient/login";        
    }
    jQuery.ajax({
        type:"POST",
        url:url+endpoint,
        body:{
            "token": authResponse.accessToken,
            "userId": authResponse.userID
        },
        dataType:"json"
    }).done(
        function(data){
            successAction(data);
        }
    ).fail(
        function(data){
            console.log('err');
            console.log(JSON.stringify(data));
            console.log(data.status);
            console.log(data.statusMessage);
        });

}
