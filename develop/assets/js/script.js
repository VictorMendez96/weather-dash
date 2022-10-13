// Bring in the search form
var searchFormEl = document.querySelector('.search-bar');
var savedSearchEl = document.querySelector('.previous-searches');
var savedSearchBtn = document.getElementsByClassName('btn');
var cityDateOutputEl = document.querySelector('.city-date');
var currentWeatherEl = document.querySelector('.current-weather')
var fiveDayWeatherEl = document.querySelector('.five-day')

// Define variables
var searchedCities = []

// Function that loads screen
function init() {

    savedLocations()
}

// Function for form submit
function handleFormSubmit(event) {
    event.preventDefault();

    var searchInput = document.querySelector('#search-input').value;

    // Error catching if input field is blank
    if (!searchInput){
        console.error('Must type in city!')
        return;
    }



    geoCodeApi(searchInput);
}

// Event Listener for search bar
searchFormEl.addEventListener('submit', handleFormSubmit)


// Function to search 
function searchCurrentApi(query) {

    var locQueryUrl = 'http://api.openweathermap.org/data/2.5/weather';

    locQueryUrl = locQueryUrl + '?lat=' + query.lat + '&lon=' + query.lon + '&appid=bc0ce6a2e099a293c2aab5283a3e0c02&units=imperial';

    fetch(locQueryUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
            }

     return response.json();
   })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
      var city = locRes.name
      var date = new Date(locRes.dt * 1000);
      cityDateOutputEl.textContent = 'Showing forecast for ' +  city + ' on ' + date.toLocaleDateString("en-US") + '!';

      if (!locRes) {
          console.log('No results found!');
      } else {
          printCurrentResults(locRes);
      }
      
      
    })
    .catch(function (error) {
      console.error(error);
    });
    }


function searchFiveDayApi(query) {

    var locQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast';

    locQueryUrl = locQueryUrl + '?lat=' + query.lat + '&lon=' + query.lon + '&appid=bc0ce6a2e099a293c2aab5283a3e0c02&units=imperial';

    fetch(locQueryUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
            }

     return response.json();
   })
    .then(function (locRes) {

      if (!locRes) {
          console.log('No results found!');
      } else {
        printFiveDayResults(locRes);
      }
      
    })
    .catch(function (error) {
      console.error(error);
    });
    }

// Function to print results from search
function printCurrentResults(resultObj) {
  console.log(resultObj)
  currentWeatherEl.textContent = ""
  var currentWeather = document.createElement('div');
  currentWeather.classList.add('current-card');

  var currentIconDes = document.createElement('div');
  var currentIcon = document.createElement('img')
  var currentDes = document.createElement('h3')
  currentDes.textContent = resultObj.weather[0].description
  var iconUrl = 'http://openweathermap.org/img/wn/' + resultObj.weather[0].icon + '@2x.png'
  currentIcon.setAttribute('src', iconUrl);+
  currentIconDes.classList.add('icon-des')
  currentIconDes.append(currentIcon, currentDes)

  var currentTemp = document.createElement('div')
  currentTemp.innerHTML = 'Temp: ' + resultObj.main.temp + '<span>&#8457;</span>';

  var currentWind = document.createElement('div')
  currentWind.textContent = 'Wind: ' + resultObj.wind.speed + 'mph';

  var currentHumidity = document.createElement('div')
  currentHumidity.textContent = 'Humidity: ' + resultObj.main.humidity + '%';

  currentWeather.append(currentIconDes, currentTemp, currentWind, currentHumidity)

  currentWeatherEl.append(currentWeather)
}

function printFiveDayResults(resultObj) {
  console.log(resultObj)
  fiveDayWeatherEl.textContent = ""
  var fiveDay = document.createElement('div')
  fiveDay.classList.add('five-day-container')

  for (let i = 0; i < 40; i+= 8) {

    var dayCard = document.createElement('div');
    dayCard.classList.add('day-card');

    var date = new Date(resultObj.list[i].dt * 1000)
    var day = document.createElement('h3')
    day.textContent = date.toLocaleDateString("en-US")
  
    var dayIconDes = document.createElement('div');
    var dayIcon = document.createElement('img')
    var dayDes = document.createElement('h4')
    dayDes.textContent = resultObj.list[i].weather[0].description
    var iconUrl = 'http://openweathermap.org/img/wn/' + resultObj.list[i].weather[0].icon + '@2x.png'
    dayIcon.setAttribute('src', iconUrl);+
    dayIconDes.classList.add('icon-des')
    dayIconDes.append(dayIcon, dayDes)
  
    var dayTemp = document.createElement('div')
    dayTemp.classList.add('temps')
    dayTemp.innerHTML = 'Temp: ' + resultObj.list[i].main.temp + '<span>&#8457;</span>' + '<br/>' +'Min Temp: ' + resultObj.list[i].main.temp + '<span>&#8457;</span>' + '<br/>' + 'Max Temp: ' + resultObj.list[i].main.temp + '<span>&#8457;</span>' ;
  
    var dayWind = document.createElement('div')
    dayWind.textContent = 'Wind: ' + resultObj.list[i].wind.speed + 'mph';
  
    var dayHumidity = document.createElement('div')
    dayHumidity.textContent = 'Humidity: ' + resultObj.list[i].main.humidity + '%';
  
    dayCard.append(day, dayIconDes, dayTemp, dayWind, dayHumidity);
    
    fiveDay.append(dayCard)
  }



  fiveDayWeatherEl.append(fiveDay)
}

// Function to geocode from city input
function geoCodeApi(searchInput) {
    var locQueryUrl = 'http://api.openweathermap.org/geo/1.0/direct';

    locQueryUrl = locQueryUrl + '?q=' + searchInput + '&appid=bc0ce6a2e099a293c2aab5283a3e0c02';

    fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {

      if (!locRes.length) {
        console.log('No results found!');
      } else {   
        for (var i = 0; i < locRes.length; i++) {
            var city = {
            name : locRes[i].name,
            lat : locRes[i].lat,
            lon : locRes[i].lon,
            }    
            // Save city to local storage for future use
            searchedCities.push(city);
            localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

            searchCurrentApi(city);
            searchFiveDayApi(city);
            }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
 }

// Function to create buttons of saved locations in local storage
function savedLocations() {

    // Retrieve saved locations in local storage
    searchedCities = JSON.parse(localStorage.getItem("searchedCities") || '[]');
    var uniqueCities = [... new Map(searchedCities.map((m) => [m.name, m])).values()];
    localStorage.setItem("searchedCities", JSON.stringify(uniqueCities))

    
    // Create buttons from saved locations
    uniqueCities.forEach(element => {
        var cityButton = document.createElement('div')
        cityButton.textContent = element.name
        cityButton.classList.add('btn', 'searched-city')
        cityButton.addEventListener("click", function() {
            geoCodeApi(this.textContent);
        });
        savedSearchEl.appendChild(cityButton)
    });
}

// Call init function at page load
init()
