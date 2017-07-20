//CLASS
class Bus {
    constructor (name, stops, timesMonFri, timesFri, timesSat, timesSun) {
        this.name = name;
        this.stops = stops;
        this.timesMonFri = timesMonFri;
        this.timesFri = timesFri;
        this.timesSat = timesSat;
        this.timesSun = timesSun;
    }
}

//var awapuniBus = new Bus("Awapuni", data.stops["awapuni"]);
//console.log(data.stops["awapuni"]);

//Array of buses name for loop below
var buses = [
    "awapuni",
    "rugby",
    "highbury",
    "takaro",
    "cloverlea",
    "milson",
    "rhodes",
    "roslyn",
    "rangiora",
    "brightwater",
    "fernlea",
    "heights"
];

//Loop to create bus objects
var routes = {};
for (var i = 0; i < buses.length; i++) {
    var name = buses[i];

    var newRoute = new Bus (
        name,
        data.stops[name],
//        data.stopCoordinates[name],
//        data.colors[name],
        data.timesMonFri[name],
        data.timesFri[name],
        data.timesSat[name],
        data.timesSun[name]
    );

    routes[name] = newRoute;
}

//Grab DOM elements and store into variables
var routeSelection = document.getElementById("routes");
//console.log(routeSelection)
var userRoute;
var fromLocation = document.getElementById("from-location");
var userDeparture;
var toLocation = document.getElementById("to-location");
var userDepartureIndex;
var userArrival;
var userArrivalIndex;
var remainingStops;

//Get the user selected route - Run everytime the selection is changed
function getRoute () {
    userRoute = routeSelection.options[routeSelection.selectedIndex].text
    sessionStorage.setItem("User Route", userRoute);
    userRoute = userRoute.toLowerCase();
    console.log(userRoute);

    //Inserting the stops to the departure selection
//    fromLocation.innerHTML = getStops();

//    function getStops () {
        var content = "<option value = '' disabled selected></option>";
        for (var i = 0; i < routes[userRoute].stops.length; i++) {
            content += "<option>" + routes[userRoute].stops[i] + "</option>"
        };
//        content += "</option>"
        fromLocation.innerHTML = content
//    }

}

//Get the remaining stops for the selected route and departing stop
function getArrival() {
    userDeparture = fromLocation.options[fromLocation.selectedIndex].text;
    console.log(userDeparture);
    sessionStorage.setItem("Departing Stop", userDeparture);

    //Get the index number of the selected departing stop in the array
    userDepartureIndex = routes[userRoute].stops.indexOf(userDeparture);
    console.log(userDepartureIndex);

    //Getting the remaining stops
    remainingStops = routes[userRoute].stops.slice(userDepartureIndex);
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

function arrivalTime() {
    userArrival = toLocation.options[toLocation.selectedIndex].text;
    console.log(userArrival);

    userArrivalIndex = remainingStops.indexOf(userArrival);
    userArrivalIndex += 1;
    console.log(userArrivalIndex);

    sessionStorage.setItem("Arrival Stop", userArrival);
}

function getTimes() {
        var timeNow = new Date().getHours() + "." + ("0" + new Date().getMinutes()).slice(-2);
        console.log (timeNow);
        for (var i = 0; i < routes[userRoute].timesMonFri.length; i++) {
            if (timeNow < routes[userRoute].timesMonFri[i][userDepartureIndex]) {
                var nextDepartingTime = routes[userRoute].timesMonFri[i][userDepartureIndex];
                console.log (nextDepartingTime);
                var nextArrivalTime = routes[userRoute].timesMonFri[i][userDepartureIndex + userArrivalIndex];
                console.log (nextArrivalTime);
                var followingDepartingTime = routes[userRoute].timesMonFri[i+1][userDepartureIndex];
                break;
            }

        }

        sessionStorage.setItem("Next Departure", nextDepartingTime);
        sessionStorage.setItem("Next Arrival", nextArrivalTime);
        sessionStorage.setItem("Following Departure", followingDepartingTime);
    }

/******************************************************************************************
                                    SEARCH RESULTS
******************************************************************************************/
function resultsPage() {

    //DOM elements
    var nextDepart = document.getElementById("depart");
    var nextArrive = document.getElementById("arrive");
    var departStop = document.getElementById("departStop");
    var arriveStop = document.getElementById("arriveStop");
    var chosenRoute = document.getElementById("chosenRoute");
    var countdown = document.getElementById("countdown");
    var followingDepart = document.getElementById("followingDepart");

    nextDepart.innerHTML = sessionStorage.getItem("Next Departure");
    nextArrive.innerHTML = sessionStorage.getItem("Next Arrival");
    departStop.innerHTML = "&nbsp;" + sessionStorage.getItem("Departing Stop") + "&nbsp;";
    arriveStop.innerHTML = "&nbsp;" + sessionStorage.getItem("Arrival Stop") + "&nbsp;";
    chosenRoute.innerHTML = sessionStorage.getItem("User Route");
    followingDepart.innerHTML = sessionStorage.getItem("Following Departure");

    //Countdown
    var timeNow = new Date().getHours() + "." + ("0" + new Date().getMinutes()).slice(-2); //Get time now in H.MM
    console.log(timeNow);
    var a = timeNow.split(".");
    var timeNowMinutes = (+a[0]) * 60 + (+a[1]); //Convert H.MM to MM
    console.log(timeNowMinutes);
    var nextDeparture = sessionStorage.getItem("Next Departure");
    var b = nextDeparture.split(".");
    var nextDepartureMinutes = (+b[0]) * 60 + (+b[1]);
    var duration = nextDepartureMinutes - timeNowMinutes; //Difference in MM between the two times
    console.log(duration);

    var hours = Math.floor(duration / 60);
    var minutes = Math.floor(duration % 60);
    console.log(hours);
    console.log(minutes);

    countdown.innerHTML = hours + "h" + "&nbsp;" + minutes + "m";
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

/////////////////////////////////// Bus Slider on Home Page////////
document.querySelector("input[type=\"range\"]").onmouseup = function() {
    var theRange = this.value;
    if(theRange == 100) {

			unlock();

		} else {
			document.init = setInterval(function() {
				if(document.querySelector("input[type=\"range\"]").value != 0) {
					document.querySelector("input[type=\"range\"]").value = theRange--;
				}
			}, 1);
		}
}

document.querySelector("input[type=\"range\"]").onmousedown = function() {
		clearInterval(document.init);
}

function unlock() {
    document.querySelector("input[type=\"range\"]").style.opacity = "0";
    location.href = "search-result-page.html";
}
//////////////////////////////// Bus Slider on Home Page ////////////////
