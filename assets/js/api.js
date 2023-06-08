

     
     // Get references to the elements
const searchBar = document.getElementById('textField');
const searchButton = document.getElementById('navigation_icon');

// Function to get geolocation coordinates
function getGeolocation() {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        error => {
          reject(error);
        }
      );
    } else {
      reject(new Error('Geolocation is not supported.'));
    }
  });
}
async function setGeolocationToSearchBar() {
    try {
      const { latitude, longitude } = await getGeolocation();
      searchBar.value = `${latitude},${longitude}`;


    } catch (error) {
      console.error('Error retrieving geolocation:', error);
    }
  }
  
 
  searchButton.addEventListener('click', () => {
    const searchQuery = searchBar.value;
    
    GetHistoryInfo(searchQuery);
  });