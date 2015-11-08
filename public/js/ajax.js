var url = 'http://yraven.herokuapp.com';

function serverLookup(authResponse,type,successAction) {
    var endpoint = "";
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
        data:{
            "token": authResponse.accessToken,
            "userId": authResponse.userID
        },
        dataType:"json"
    }).done(
        function(data){
            successAction(data.userId);
        }
    ).fail(
        function(data){
            console.log('err');
            console.log(JSON.stringify(data));
            console.log(data.status);
            console.log(data.statusMessage);
        });

}

function doctorUpdate (doctorDetails,successAction){
    jQuery.ajax({
        type:"POST",
        url:url+"/doctor/update",
        body:{
            "institution": doctorDetails["institution"],
            "degree": doctorDetails["degree"],
            "year": doctorDetails["grad"],
            "state": doctorDetails["state"],
            "userId": doctorDetails["id"]
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