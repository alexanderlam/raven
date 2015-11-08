var url = 'https://yraven.herokuapp.com';

function serverLookup(authResponse) {
    jQuery.ajax({
        type:"POST",
        url:url+"/doctor/register",
        body:{
            "token": authResponse.accessToken,
            "userId": authResponse.userID
        },
        dataType:"json"
    }).done(
        function(data){
            console.log(data);
        }
    ).fail(
        function(data){
            console.log('err');
            console.log(JSON.stringify(data));
            console.log(data.status);
            console.log(data.statusMessage);
        });

}
