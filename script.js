var routeSelection = document.getElementById("routes");
//console.log(routeSelection)
var userRoute;
var fromLocation = document.getElementById("from-location");

function getRoute () {
    userRoute = routeSelection.options[routeSelection.selectedIndex].text;
    console.log(userRoute);

    switch (userRoute) {
        case "1. Awapuni":
            fromLocation.innerHTML = awapuni();
            break;
        case "2. Rugby":
            fromLocation.innerHTML = rugby();
            break;
    }
}

function awapuni() {
    var content = "<option value = '' disabled selected>";
    for (var i = 0; i < awapuniStops.length; i++) {
        content += "<option>" + awapuniStops[i] + "</option>"
    };
    content += "</option>"
    return content
}

function rugby() {
    var content = "<option value = '' disabled selected>";
    for (var i = 0; i < rugbyStops.length; i++) {
        content += "<option>" + rugbyStops[i] + "</option>"
    };
    content += "</option>"
    return content
}


//$(document).ready(function() {
//
//    $(".route").on('change', function() {
//        userRoute = $(".route").text;
//        console.log(userRoute);
//    })
//})
