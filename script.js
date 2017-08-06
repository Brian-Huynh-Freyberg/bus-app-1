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
var userRoute;
var fromLocation = document.getElementById("from-location");
var userDeparture;
var toLocation = document.getElementById("to-location");
var userDepartureIndex;
var userArrival;
var userArrivalIndex;
var remainingStops;
var busSlider= document.getElementById("bus-slider");
//Counters for the three selection boxes
var flag1;
var flag2;
var flag3;

//Google Maps
var theSquare = {
    lat: -40.353085,
    lng: 175.610677
}

    //Create a new Map object
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: theSquare,
        zoom: 13
    })

//Get the user selected route - Run every time the selection is changed
function getRoute () {
    userRoute = routeSelection.options[routeSelection.selectedIndex].text
    sessionStorage.setItem("User Route", userRoute);
    userRoute = userRoute.toLowerCase();
    console.log(userRoute);

    //Inserting the stops to the departure selection
    var content = "<option value = '' disabled selected></option>";
    for (var i = 0; i < routes[userRoute].stops.length; i++) {
        content += "<option>" + routes[userRoute].stops[i] + "</option>"
    };
    fromLocation.innerHTML = content
    flag1 = 1;

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
    var content = "<option value = '' disabled selected></option>";
    for (var i = 0; i < remainingStops.length; i++) {
        content += "<option>" + remainingStops[i] + "</option>"
    };

    toLocation.innerHTML = content;
    flag2 = 1;
}

function arrivalTime() {
    userArrival = toLocation.options[toLocation.selectedIndex].text;
    console.log(userArrival);

    userArrivalIndex = remainingStops.indexOf(userArrival);
    userArrivalIndex += 1;
    console.log(userArrivalIndex);

    sessionStorage.setItem("Arrival Stop", userArrival);
    flag3 = 1;
    if (flag1 == 1 && flag2 == 1 && flag3 == 1) {
       busSlider.style.display = "block";
    }
}

function getTimes() {
        var timeNow = new Date().getHours() + "." + ("0" + new Date().getMinutes()).slice(-2);
        console.log (timeNow);
        var dayOfWeek = new Date().getDay();
        console.log(dayOfWeek);

        //Getting the the correct timetable and first time for the selected stop for tomorrow
        //Monday - Thursday
        if (dayOfWeek > 0 && dayOfWeek < 5) {
            var timestableOfDay = routes[userRoute].timesMonFri;
            var nextFirstTime = routes[userRoute].timesMonFri[0][userDepartureIndex];
            nextFirstTime = nextFirstTime.toFixed(2);
            console.log(nextFirstTime);
            sessionStorage.setItem("Next First Departure", nextFirstTime);
        }
        //Friday
        else if (dayOfWeek == 5) {
            var timestableOfDay = routes[userRoute].timesMonFri.concat(routes[userRoute].timesFri);
            var nextFirstTime = routes[userRoute].timesSat[0][userDepartureIndex];
            nextFirstTime = nextFirstTime.toFixed(2);
            console.log(nextFirstTime);
            sessionStorage.setItem("Next First Departure", nextFirstTime);
        }
        //Saturday
        else if (dayOfWeek == 6) {
            var timestableOfDay = routes[userRoute].timesSat;
            var nextFirstTime = routes[userRoute].timesSun[0][userDepartureIndex];
            nextFirstTime = nextFirstTime.toFixed(2);
            console.log(nextFirstTime);
            sessionStorage.setItem("Next First Departure", nextFirstTime);
        }
        //Sunday
        else if (dayOfWeek == 0) {
            var timestableOfDay = routes[userRoute].timesSun;
            var nextFirstTime = routes[userRoute].timesMonFri[0][userDepartureIndex];
            nextFirstTime = nextFirstTime.toFixed(2);
            console.log(nextFirstTime);
            sessionStorage.setItem("Next First Departure", nextFirstTime);
        }
        //Looping through the timetable to get the times
        for (var i = 0; i < timestableOfDay.length; i++) {
            var homeOnlyTime = timestableOfDay[timestableOfDay.length - 1];
            sessionStorage.setItem("Home Only Time", homeOnlyTime);
            if (timeNow < timestableOfDay[i][userDepartureIndex]) {
                var nextDepartingTime = timestableOfDay[i][userDepartureIndex];
                nextDepartingTime = nextDepartingTime.toFixed(2);
                console.log (nextDepartingTime);
                sessionStorage.setItem("Next Departure", nextDepartingTime);
                var nextArrivalTime = timestableOfDay[i][userDepartureIndex + userArrivalIndex];
                nextArrivalTime = nextArrivalTime.toFixed(2);
                console.log (nextArrivalTime);
                sessionStorage.setItem("Next Arrival", nextArrivalTime);
                var followingDepartingTime = timestableOfDay[i+1][userDepartureIndex];
                followingDepartingTime = followingDepartingTime.toFixed(2);
                sessionStorage.setItem("Following Departure", followingDepartingTime);
                break;
            }
        }

    }

/////////////////////////////// Bus Slider on Home Page/////////////////
document.querySelector("input[type=\"range\"]").onmouseup = function() {
    var theRange = this.value;
    if(theRange == 100) {

			loadNew();

		} else {
            //Decrements the current value by 1 every 1 milisecond if the current value is not zero
			document.init = setInterval(function() {
				if(document.querySelector("input[type=\"range\"]").value != 0) {
					document.querySelector("input[type=\"range\"]").value = theRange--;
				}
			}, 1);
		}
}

//Clear the timer set above
document.querySelector("input[type=\"range\"]").onmousedown = function() {
		clearInterval(document.init);
}

function loadNew() {
    document.querySelector("input[type=\"range\"]").style.opacity = "0";
    location.href = "search-result-page.html";
}
//////////////////////////////// Bus Slider on Home Page ////////////////





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
    var resultBox = document.getElementById("result");
    var afterHours = document.getElementById("after-hours");
    var stop = document.getElementById("stop");
    var route = document.getElementById("route");
    var firstDepart = document.getElementById("firstTime");
    var homeOnlyTime = document.getElementById("homeOnlyTime");

    nextDepart.innerHTML = sessionStorage.getItem("Next Departure");
    nextArrive.innerHTML = sessionStorage.getItem("Next Arrival");
    departStop.innerHTML = "&nbsp;" + sessionStorage.getItem("Departing Stop") + "&nbsp;";
    arriveStop.innerHTML = "&nbsp;" + sessionStorage.getItem("Arrival Stop") + "&nbsp;";
    chosenRoute.innerHTML = sessionStorage.getItem("User Route");
    followingDepart.innerHTML = sessionStorage.getItem("Following Departure");
    firstDepart.innerHTML = sessionStorage.getItem("Next First Departure");
    stop.innerHTML = sessionStorage.getItem("Departing Stop");
    route.innerHTML = sessionStorage.getItem("User Route");
    homeOnlyTime.innerHTML = sessionStorage.getItem("Home Only Time");

    //After hours
    var timeNow = new Date().getHours() + "." + ("0" + new Date().getMinutes()).slice(-2); //Get time now in H.MM
    var dayOfWeek = new Date().getDay();
        //Monday - Friday
        if (dayOfWeek > 0 && dayOfWeek < 6) {
            if (18.35 < timeNow && timeNow < 24.00) {
                resultBox.style.display = "none";
                afterHours.style.display = "block";
            }
        }
        //Weekend
        else if (dayOfWeek == 6 || dayOfWeek == 0) {
            if (16.20 < timeNow && timeNow < 24.00) {
                resultBox.style.display = "none";
                afterHours.style.display = "block";
            }
        }

    //Countdown
    console.log(timeNow);
    var a = timeNow.split("."); //Turn string into array
    var timeNowMinutes = (+a[0]) * 60 + (+a[1]); //Convert H.MM to MM
    console.log(timeNowMinutes);
    var nextDeparture = sessionStorage.getItem("Next Departure");
    console.log(nextDeparture);
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
