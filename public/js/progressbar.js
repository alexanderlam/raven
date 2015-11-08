//Function to check if the div is visible on the screen
// $(function() {
//     var loaded = false;
//     var oTop = $('#rightSkills').offset().top - window.innerHeight;

//     checkPosition();

//     $(window).scroll(function(){
//         checkPosition();
//     });

//     function checkPosition(){ 
//         var pTop = $('body').scrollTop();
//         if( pTop > oTop ){
//             if(!loaded) {
//                 loaded = true;
//                 loadChart();
//             }
//         }   
//     }  
// });

var loaded = false;

//Data for left div
var dataLeft = 
[{ "skill": "HTML", "progress": 100 }, 
{ "skill": "CSS", "progress": 90 }, 
{ "skill": "JavaScript", "progress": 90 }, 
{ "skill": "jQuery", "progress": 80 }, 
{ "skill": "PHP", "progress": 70 }];

//Data for right div
var dataRight =  
[{"skill": "AngularJS", "progress": 60}, 
{"skill": "SASS", "progress": 60}, 
{"skill": "Bootstrap", "progress": 50}, 
{"skill": "MySQL", "progress": 70}, 
{"skill": "PHP", "progress": 70}];

anchorLeft = d3.select("#leftSkills");

//Bind data for left bars
var divLeft = anchorLeft.selectAll("#leftSkills div")
.data(dataLeft);

//Add shadow for the left bars
divLeft.enter().append("div")
.attr("class", "shadow");

anchorRight = d3.select("#rightSkills");

//Bind data for right bars
var divRight = anchorRight.selectAll("#rightSkills div")
.data(dataRight);

//Add shadow for the right bars
divRight.enter().append("div")
.attr("class", "shadow");

//Create the bars
d3.select("body").selectAll(".shadow")
.append("div")
.attr("class","bar");

//Create the path
d3.select("body").selectAll(".bar")
.append("div")
.attr("class","path");

//Add the pattern for the bars
d3.select("body").selectAll(".path")
.append("div")
.attr("class","pattern");

$("#overall-analysis").click(function() {
    if (!loaded) {
        loadChart();
        loaded = true;
    }
});

//Animate the bars when they are both visible on screen
function loadChart(){

    var start_val = 0;

    //add the percentage to the progress bar and transition the number
    d3.select("body").selectAll(".pattern")
    .append("div")
    .text(start_val)
    .attr("class", "percentage")
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(1000)
    .style("min-width", function(d, i) {
        return (d.progress*3)/2 + "px"; 
        console.log(1);
    })
    .tween(".percentage", function(d) {
        var i = d3.interpolate(this.textContent, d.progress),
        prec = (d.progress + "").split("."),
        round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

        return function(t) {
            this.textContent = Math.round(i(t) * round) / round + "%";
        };
    });

    //transition the width of the path
    d3.select("body").selectAll(".path")
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(1000)
    .style("width", function(d, i) {
        return d.progress*3 + "px"; 
    });

    //transition between the different colors depending on the value
    d3.select("body").selectAll(".pattern")
    //transition to first color
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d.progress < 40) {
            return "#FB7457";
        }
        else {
            return "#FBB272";
        }
    })
    //transition to second color
    .transition()
    .delay(function(d, i) {
        return (i * 200) + 250;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d < 40) {
            return "#FB7457";
        }
        else if (d.progress < 60) {
            return "#FBB272";
        }
        else {
            return "#FFE584";
        }
    })
    //transition to third color
    .transition()
    .delay(function(d, i) {
        return (i * 200) + 500;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d.progress < 40) {
            return "#FB7457";
        }
        else if (d.progress < 60) {
            return "#FBB272";
        }
        else if (d.progress < 80) {
            return "#FFE584";
        }
        else {
            return "#C9D790";
        }
    })
    //transition to fourth color
    .transition()
    .delay(function(d, i) {
        return (i * 200) + 750;
    })
    .duration(250)
    .style("background-color", function(d) {
        if(d.progress < 40) {
            return "#FB7457";
        }
        else if (d.progress < 60) {
            return "#FBB272";
        }
        else if (d.progress < 80) {
            return "#FFE584";
        }
        else  if (d.progress < 100) {
            return "#C9D790";
        }
        else {
            return "#7AC191";
        }
    });

    //transition the sadow under the progress bar
    d3.select("body").selectAll(".shadow")
    .transition()
    .delay(function(d, i) {
        return i * 200;
    })
    .duration(1000)
    .style("width", function(d, i) {
        return d.progress*3-6 + "px"; 
    });
}