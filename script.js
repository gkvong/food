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

  // Select a random restaurant
  const randomIndex = Math.floor(Math.random() * availableRestaurants.length);
  const randomRestaurant = availableRestaurants[randomIndex];

  // Display the random restaurant
  const randomRestaurantElement = document.getElementById('randomRestaurant');
  randomRestaurantElement.textContent = randomRestaurant;
}

// Call the function to select and display a random restaurant
selectRandomRestaurant();
