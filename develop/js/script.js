// Bring in the search form
var searchFormEl = document.querySelector('.search-bar');

// Function for form submit
function handleFormSubmit(event) {
    event.preventDefault();

    var searchInput = document.querySelector('#search-input').value;

    // Error catching if input field is blank
    if (!searchInput){
        console.error('Must type in city!')
        return;
    }

    searchApi(searchInput)
}

// Event Listener for search bar
searchFormEl.addEventListener('submit', handleFormSubmit)

// Function to search 
function searchApi(query) {
    console.log(query);
}

// Function to print results from search
function printResults(resultObj) {
    
}