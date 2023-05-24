// Function to get the ISO week number for a date
function getISOWeekNumber(date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Function to select a random restaurant excluding the previous week's list
function selectRandomRestaurant() {
  const currentDate = new Date();
  const currentWeek = getISOWeekNumber(currentDate);

  const previousRestaurants = ['Chinese', 'Indian', 'Mexican']; // Replace with your list of previous restaurants

  const restaurants = ['Chinese', 'Korean', 'Japanese', 'Mexican', 'Indian', 'Vietnamese', 'Thai'];

  // Exclude previous week's restaurants
  const availableRestaurants = restaurants.filter(restaurant => !previousRestaurants.includes(restaurant));

  // Generate the seed for random number generation
  const seed = currentWeek * previousRestaurants.length;

  // Create a random number generator with the seed
  const randomGenerator = new Math.seedrandom(seed.toString());

  // Select a random restaurant
  const randomIndex = Math.floor(randomGenerator() * availableRestaurants.length);
  const randomRestaurant = availableRestaurants[randomIndex];

  // Get the last week's restaurant
  const lastWeekRestaurant = previousRestaurants[previousRestaurants.length - 1];

  // Get the current date and time
  const currentDateTime = new Date();
  const currentDateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const currentTimeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
  const lastUpdatedDate = currentDateTime.toLocaleDateString(undefined, currentDateOptions);
  const lastUpdatedTime = currentDateTime.toLocaleTimeString(undefined, currentTimeOptions);

  // Display the random restaurant, last week's restaurant, and last updated date
  const randomRestaurantElement = document.getElementById('randomRestaurant');
  const lastWeekRestaurantElement = document.getElementById('lastWeekRestaurant');
  const lastUpdatedElement = document.getElementById('lastUpdated');
  randomRestaurantElement.textContent = randomRestaurant;
  lastWeekRestaurantElement.textContent = "Last week's restaurant was " + lastWeekRestaurant + ".";
  lastUpdatedElement.textContent = "Last Updated: " + lastUpdatedDate + " at " + lastUpdatedTime;
}

// Call the function to select and display a random restaurant
selectRandomRestaurant();
