// Bring in the search form
var searchFormEl = document.querySelector('.search-bar');
var savedSearchEl = document.querySelector('.previous-searches');
var savedSearchBtn = document.getElementsByClassName('btn')

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
    console.log(query);

    var locQueryUrl = 'http://api.openweathermap.org/data/2.5/weather';

    locQueryUrl = locQueryUrl + '?lat=' + query.lat + '&lon=' + query.lon + '&appid=bc0ce6a2e099a293c2aab5283a3e0c02';

    console.log(locQueryUrl)

    fetch(locQueryUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
            }

     return response.json();
   })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
    //   resultTextEl.textContent = locRes.search.query;

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


function searchFourDayApi(query) {
    console.log(query);

    var locQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast';

    locQueryUrl = locQueryUrl + '?lat=' + query.lat + '&lon=' + query.lon + '&appid=bc0ce6a2e099a293c2aab5283a3e0c02';

    console.log(locQueryUrl)

    fetch(locQueryUrl)
    .then(function (response) {
        if (!response.ok) {
            throw response.json();
            }

     return response.json();
   })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
    //   resultTextEl.textContent = locRes.search.query;

        if (!locRes) {
            console.log('No results found!');
        } else {
            printFourDayResults(locRes);
        }
      
    })
    .catch(function (error) {
      console.error(error);
    });
    }

// Function to print results from search
function printCurrentResults(resultObj) {
    console.log(resultObj)
}

function printFourDayResults(resultObj) {
    console.log(resultObj)
}

// Function to geocode from city input
function geoCodeApi(searchInput) {
    var locQueryUrl = 'http://api.openweathermap.org/geo/1.0/direct';

    locQueryUrl = locQueryUrl + '?q=' + searchInput + '&appid=bc0ce6a2e099a293c2aab5283a3e0c02';
    console.log(searchInput)

    fetch(locQueryUrl)
    .then(function (response) {
        console.log(response)
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
    //   resultTextEl.textContent = locRes.search.query;

    //   console.log(locRes);

      if (!locRes.length) {
        console.log('No results found!');
        // resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        // resultContentEl.textContent = '';   
        console.log(locRes) 
        for (var i = 0; i < locRes.length; i++) {
            var city = {
            name : locRes[i].name,
            lat : locRes[i].lat,
            lon : locRes[i].lon,
            }    
            // Save city to local storage for future use
            searchedCities.push(city);
            localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

            console.log(city)
            searchCurrentApi(city);
            searchFourDayApi(city);
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

    
    // Create buttons from saved locations
    searchedCities.forEach(element => {
        var cityButton = document.createElement('div')
        cityButton.textContent = element.name
        cityButton.classList.add('btn', 'searched-city')
        cityButton.addEventListener("click", function() {
            geoCodeApi(this.textContent);
        });
        savedSearchEl.appendChild(cityButton)
    });
}

// document.getElementsByClassName('btn').addEventListener("click", function() {
//     geoCodeApi(this.textContent)
// })
// Call init function at page load
init()
