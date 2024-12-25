// weather.js

// Function to fetch and display the weather information
function fetchWeather() {
    const apiKey = 'f35e00382dc50ab8dd71861ec9b3dd57'; // Replace with your OpenWeatherMap API key
    const city = 'New York'; // You can dynamically get this from user input or the main window
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          const weatherDescription = data.weather[0].description;
          const temperature = data.main.temp;
          const humidity = data.main.humidity;
          const weatherInfo = `
            <h3>Weather in ${city}</h3>
            <p><strong>Description:</strong> ${weatherDescription}</p>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
          `;
          document.getElementById('weather-info').innerHTML = weatherInfo;
        } else {
          document.getElementById('weather-info').innerHTML = 'Failed to retrieve weather data. Please try again.';
        }
      })
      .catch(error => {
        document.getElementById('weather-info').innerHTML = 'Error fetching weather data.';
      });
  }
  
  // Call the fetchWeather function when the window loads
  window.onload = fetchWeather;
  