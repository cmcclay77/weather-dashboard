// contains list (empty until given event)
var searchHistory = [];
// returns local storage search history
function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedCities !== null) {
        searchHistory = storedCities;
    };
     // lists up to 8 locations
    for (i = 0; i < searchHistory.length; i++) {
        if (i == 8) {
            break;
          }
        //  creates links/buttons https://getbootstrap.com/docs/4./components/list-group/
        cityListButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",
            href: "#"
        });
        // appends history as a button below the search field
        cityListButton.text(searchHistory[i]);
        $(".list-group").append(cityListButton);
    }
};
var city;
var mainCard = $(".card-body");
// prompt getItems
getItems();
// main card
function getData() { // my api code
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=49fb27317373bb54f7d9243387af6df3" // starts call for current conditions
    mainCard.empty();
    $("#weeklyForecast").empty();
    // requests
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // using moment to call the date
        var date = moment().format(" MM/DD/YYYY");
        // takes the icon code from the response and assigns it to iconCode
        var iconCode = response.weather[0].icon;
        // builds the main card icon url
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        // takes the name added from the search and the date/format from moment and creates a single var
        var name = $("<h3>").html(city + date);
        // displays name in main card
        mainCard.prepend(name);
        // displays icon on main card
        mainCard.append($("<img>").attr("src", iconURL));
        // converts K and removes decimals using Math.round
        var temp = Math.round((response.main.temp - 273.15) * 1.80 + 32);
        mainCard.append($("<p>").html("Temperature: " + temp + " &#8457")); //appends fahrenheit degrees using short key code
        var humidity = response.main.humidity;
        mainCard.append($("<p>").html("Humidity: " + humidity)); // appends humidity
        var windSpeed = response.wind.speed;
        mainCard.append($("<p>").html("Wind Speed: " + windSpeed)); // appends windspeed
        // takes from the response and creates a var used in the next request for UV index
        var lat = response.coord.lat;
        var lon = response.coord.lon;