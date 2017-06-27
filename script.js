//Grab DOM elements and store into variables
var routeSelection = document.getElementById("routes");
//console.log(routeSelection)
var userRoute;
var fromLocation = document.getElementById("from-location");

//Get the user selected route - Run everytime the selection is changed
function getRoute () {
    userRoute = routeSelection.options[routeSelection.selectedIndex].text;
    userRoute = userRoute.toLowerCase();
    userRoute += "Stops";
    console.log(userRoute);

    //Inserting the stops to the departure selection
    fromLocation.innerHTML = getStops();

    function getStops () {
        var content = "<option value = '' disabled selected>";
        for (var i = 0; i < eval(userRoute).length; i++) {
            content += "<option>" + eval(userRoute)[i] + "</option>"
        };
        content += "</option>"
        return content
    }
}


//$(document).ready(function() {
//
//    $(".route").on('change', function() {
//        userRoute = $(".route").text;
//        console.log(userRoute);
//    })
//})
