$(document).ready(function() {
	var key = "866b34bb62900cd6433b7a2448d1126b";
	var latitude;
	var longitude;
	var location;

	function obtainLocation(currentPosition) {
		latitude = currentPosition.coords.latitude.toString();
		longitude = currentPosition.coords.longitude.toString();

		console.log( "Latitude: " + latitude );
  		console.log( "Longitude: " + longitude );
  		call();
	}

	//this function processes all of the data from Forecast IO and constructs the html for the webapp
	function call() {
		//first get get our JSON data,
		$.getJSON("https://api.forecast.io/forecast/" + key + "/" + latitude + "," + longitude + "?callback=?", function(data) {

			//variables to be output to the user
			var place = data.timezone;
		    var icn = data.currently.icon;
		    var summary = data.currently.summary;
		    var longit = data.longitude;
		    var latit = data.latitude;
		    var temp = data.currently.temperature;
		    var feelsLike = data.currently.apparentTemperature;
		    var windSpeed = data.currently.windSpeed;
		    var hmdy = data.currently.humidity;
		    var time = data.currently.time;

		    //weatherInfo stores all of the data to be put into the html document at the end
  			var weatherInfo = "<div id= 'container'>";
  			var icon;

  			//The correct icon is picked based on 'icn' 
  			if(icn == "clear-day") {
  				icon="sunny";
  			}
  			else if(icn == "clear-night") {
  				icon="moon144";
  			}
  			else if(icn == "rain") {
  				icon="raindrops2";
  			}
  			else if(icn == "snow") {
  				icon="snowflake3";
  			}
  			else if(icn == "sleet") {
  				icon="sleet";
  			}
  			else if(icn == "wind") {
  				icon="windy";
  			}
  			else if(icn == "fog") {
  				icon="fog";
  			}
  			else if(icn == "cloudy") {
  				icon="cloud";
  			}
  			else if(icn == "partly-cloudy-day") {
  				icon="partlyDay";
  			}
  			else if(icn == "partly-cloudy-night") {
  				icon="partlyNight";
  			}
  			else {
  				icon = "questions";
  			}


  			//Creating the HTML that will be printed in lab2index.html
			weatherInfo += "<div id='everything'>";
			weatherInfo += "<h2>Latitude: " + latit + "</h2>"; 
			weatherInfo += "<h2>Longitude: " + longit + "</h2><br>"
			weatherInfo += "<img src='logos/" + icon + ".png' height='100' width='100' id='icon' />";
			weatherInfo += "<section>" + summary + "</section>";
			weatherInfo += "<section>Current Temperature: " + Math.round(temp) + "<sup>&deg;F</sup></section>";
			weatherInfo += "<section>Feels like: " + Math.round(feelsLike) + " &deg;F</section>";
			weatherInfo += "<section>Wind speed: " + windSpeed + " mph</section>";
			weatherInfo += "<section>Humidity: " + hmdy * 100 + "&#37;</section>";

 			//Print everything to lab2index.html inside the "weather" id
  			document.getElementById("weather").innerHTML = weatherInfo;
		})
	}

	//This line begins running (executing) the app
	navigator.geolocation.getCurrentPosition(obtainLocation);
});