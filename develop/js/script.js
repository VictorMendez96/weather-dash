// Bring in the search form
var searchFormEl = document.querySelector('.search-bar');

// Function for form submit
function handleFormSubmit(event) {
    event.preventDefault();

    var searchInput = document.querySelector('#search-input')

    // Error catching if input field is blank
    if (!searchInput){
        console.error('Must type in city!')
        return;
    }


}

// Event Listener for search bar
searchFormEl.addEventListener('submit', handleFormSubmit)

// Function to search 

// Function to print results from 