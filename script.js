// Function to get the ISO week number for a date
function getWeekNumber(date) {
  const modifiedDate = new Date(date);
  modifiedDate.setDate(modifiedDate.getDate() + 4 - (modifiedDate.getDay() || 7));
  const yearStart = new Date(modifiedDate.getFullYear(), 0, 1);
  const weekNumber = Math.ceil((((modifiedDate - yearStart) / 86400000) + 1) / 7);
  return weekNumber;
}

// Function to select a random restaurant excluding the previous week's list
function selectRandomRestaurant() {
  const currentDate = new Date();
  const currentWeek = getWeekNumber(currentDate);

  const previousRestaurants = ['Chinese', 'Indian', 'Mexican', 'Chinese', 'Korean', 'Chinese', 'Mexican'];

  // Include the week number and last entry of previous restaurants list in the seed
  const seed = currentWeek.toString() + previousRestaurants[previousRestaurants.length - 1];

  // Create a seeded random number generator using the seed
  const rng = new Math.seedrandom(seed);

  const restaurants = ['Chinese', 'Korean', 'Mexican', 'Mexican', 'Thai'];

  // Exclude previous week's restaurants
  const availableRestaurants = restaurants.filter(restaurant => !previousRestaurants.includes(restaurant));

  // If there are no available restaurants, set the randomRestaurant to "Free Choice"
  const randomRestaurant = availableRestaurants.length > 0 ? availableRestaurants[Math.floor(rng() * availableRestaurants.length)] : "Free Choice";

  // Get the last week's restaurant
  const lastWeekRestaurant = previousRestaurants[previousRestaurants.length - 1];

  // Get the current date and time
  const currentDateTime = new Date();
  const day = currentDateTime.getDate();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'];
  const month = monthNames[currentDateTime.getMonth()];
  const lastUpdatedDate = `${day} ${month}`;
  
  const currentTimeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const lastUpdatedTime = currentDateTime.toLocaleTimeString(undefined, currentTimeOptions);
  
  // Display the random restaurant, last week's restaurant, and last updated date
  const randomRestaurantElement = document.getElementById('randomRestaurant');
  const lastWeekRestaurantElement = document.getElementById('lastWeekRestaurant');
  const lastUpdatedElement = document.getElementById('lastUpdated');
  randomRestaurantElement.textContent = randomRestaurant;
  lastWeekRestaurantElement.textContent = "Our last restaurant was " + lastWeekRestaurant + ".";
  lastUpdatedElement.textContent = "Last Updated: " + lastUpdatedDate + " at " + lastUpdatedTime;
}

// Call the function to select and display a random restaurant
selectRandomRestaurant();