// Bring in the search form
var searchFormEl = document.querySelector('.search-bar');

// Define variables
var searchedCities = []

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
function searchApi(query) {
    console.log(query);

    var locQueryUrl = 'api.openweathermap.org/data/2.5/forecast';

    locQueryUrl = locQueryUrl + '?lat=' + lat + '&lon=' + lon + '&appid=' + key;
}

// Function to print results from search
function printResults(resultObj) {
    
}

// Function to geocode from city input
function geoCodeApi(searchInput) {
    var locQueryUrl = 'http://api.openweathermap.org/geo/1.0/direct';

    locQueryUrl = locQueryUrl + '?q=' + searchInput + '&appid=' + key;

    // Variable to store city info once retrieved from API call
    var city = {
        name : searchInput,
        lat : lat,
        lon : lon,
    }

    // Save city to local storage for future use
    searchedCities.push(city);
    searchedCities = searchedCities.concat(JSON.parse(localStorage.getItem("searchedCities")|| '[]'));
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
}