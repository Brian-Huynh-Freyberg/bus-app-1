//Grab DOM elements and store into variables
var routeSelection = document.getElementById("routes");
//console.log(routeSelection)
var userRoute;
var fromLocation = document.getElementById("from-location");
var userDeparture;
var toLocation = document.getElementById("to-location");

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

//Get the remaining stops for the selected route and departing stop
function getArrival() {
    userDeparture = fromLocation.options[fromLocation.selectedIndex].text;
    console.log(userDeparture);

    //Get the index number of the selected departing stop in the array
    var userDepartureIndex = eval(userRoute).indexOf(userDeparture);
    console.log(userDepartureIndex);

    //Getting the remaining stops
    var remainingStops = eval(userRoute).slice(userDepartureIndex);
    remainingStops.shift();
    console.log(remainingStops);

    //Inserting the remaining stops into the selection box
    toLocation.innerHTML = getRemainingStops();

    function getRemainingStops () {
        var content = "<option value = '' disabled selected>";
        for (var i = 0; i < remainingStops.length; i++) {
            content += "<option>" + remainingStops[i] + "</option>"
        };
        content += "</option>"
        return content
    }
}

/* NEXT STEPS: Have usage of a class somewhere in the script. Start with making bus objects from a class, drawing info of each bus from the bus-stops-and-times-final.js

Then make all reference to the class, rather than to the .js file. Basically, this script ----> Class -----> .js file

        class Bus {
            constructor(name, stops, timesMonFri, ) {
                this.name = name;

                this.routeSelection = document.getElementById("routes");
            }

        }

*/


//$(document).ready(function() {
//
//    $(".route").on('change', function() {
//        userRoute = $(".route").text;
//        console.log(userRoute);
//    })
//})
