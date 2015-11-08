var url = 'http://yraven.herokuapp.com';

function serverLookup(authResponse,type,successAction) {
    var endpoint = "";
    if(type=="doctor-registration"){
        endpoint = "/doctor/register";
    }else if (type=="doctor-login"){
        endpoint = "/doctor/login";        
          
    }else if (type=="patient-login"){
        endpoint = "/patient/login";
    }
    
    if (type=="patient-registration"){
        endpoint = "/patient/register";  
        jQuery.ajax({
        type:"POST",
        url:url+endpoint,
        data:{
            "token": authResponse.accessToken,
            "userId": authResponse.userID,
            "doctorId": sessionStorage.getItem('doctorRef')
        },
        dataType:"json"
    }).done(
        function(data){
             sessionStorage.setItem('userId', data.userId);
             sessionStorage.setItem('token', data.accessToken);

            successAction(data.userId);
        }
    ).fail(
        function(data){
            console.log('err');
            console.log(JSON.stringify(data));
            console.log(data.status);
            console.log(data.statusMessage);
        });
    }else{ 
    
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
             sessionStorage.setItem('userId', data.userId);
             sessionStorage.setItem('token', data.accessToken);
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

}

function doctorUpdate (doctorDetails,successAction){
    jQuery.ajax({
        type:"POST",
        url:url+"/doctor/update",
        data:{
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

function patientUpdate (patientDetails,successAction){
    jQuery.ajax({
        type:"POST",
        url:url+"/patient/update",
        data:{
            "patientId": patientDetails["patientId"],
            "doctorId": patientDetails["doctorId"]

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

function getPatients (docId, successAction){
    jQuery.ajax({
        type:"GET",
        url:url+"/patient/list",
        data:{
            "doctorId": docId
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

