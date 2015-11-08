var path = "";
var QueryString = function () {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
        // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
        // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
      query_string[pair[0]] = arr;
        // If third or later entry with this name
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  } 
    return query_string;
}();

function submitDoctorForm(){
    var doctorDetails = [];
    doctorDetails['institution'] = document.getElementById("institution-field").value;
     doctorDetails['degree'] = document.getElementById("degree-field").value;
     doctorDetails['grad'] = document.getElementById("grad-field").value;
     doctorDetails['state'] = document.getElementById("state-field").value;
    //get doctor id or whatever identifier was made
    doctorDetails['id'] = sessionStorage.getItem('doctorId').id;
    //give values to maidi
    doctorUpdate(doctorDetails, function(data){        
                window.location.replace(document.location.hostname+"/patientlist.html");      
    });
    
}

function populatePatients(docId){
        var imageKey = "";
        var nameKey = "";
        var idKey = "";
        
    //Call server to get JSON response of patient data
    
    //Turn JSON response into array
    var patientArray = Object.keys(obj).map(function(k) { return obj[k] });
    var count = 0;
    //foreach patient, get the picture, name and profile ID
    for (var value in patientArray){

        //Set picture, name, profile link
        var entireElement = document.getElementByClassName("patientCol")[count];
        var profileImage = entireElement.getElementById("profile_image");
        var profileName = entireElement.getElementsByClassName("patientCol")[count].getElementById("profile_name");
        var profileLink = entireElement.getElementsByClassName("patientCol")[count].getElementById("profile_link");
        entireElement.style.display = "block";
        //Create link
        var refLink = path+"?ref="value[idKey];
        var imageSrc = value[imageKey];
        var name = value[nameKey];
        var imageRef = "Profile picture for "+name;
        
        
        profileImage.src = imageSrc;
        profileImage.ref = imageRef;
        profileName.innerHTML = name;
        profileName.href = refLink;
        profileLink.href = refLink;
        
        count++;
        
        
    }
    
    
}

function populatePatientDashboard(patientId){
     var name = document.getElementById("pName").innerHTML;
     var email = document.getElementById("pEmail").innerHTML;
     var dob = document.getElementById("pDob").innerHTML;
     var gender = document.getElementById("pGender").innerHTML;
     var doctor = document.getElementById("pDoctor").innerHTML;

    
}