// Define the fetchWeather function
async function fetchWeather(cityName) {
    const apiKey = 'd7839d40e774896a6bc81541a035df48'; // Replace 'YOUR_API_KEY' with your actual API key
    const units = 'metric'; // Specify units for temperature (metric for Celsius)
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Define the displayWeather function
function displayWeather(weatherData) {
    const weatherInfoElement = document.getElementById('weather-info');
    if (!weatherData || !weatherData.main || !weatherData.weather || !weatherData.wind) {
        weatherInfoElement.innerHTML = '<p>Failed to fetch weather data.</p>';
        return;
    }

    const location = weatherData.name;
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;
    const windSpeed = weatherData.wind.speed;
    const iconCode = weatherData.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    // Construct the HTML for different parts of the weather data
    const mainInfoHtml = `
      <div class="main-info">
        <p>Location: ${location}</p>
        <p>Temperature: ${temperature} &#176;C</p>
      </div>
    `;
    const iconHtml = `
      <div class="icon">
        <img src="${iconUrl}" alt="Weather Icon">
      </div>
    `;

    const weatherInfoHtml = `
      <div class="weather-info">
        <p>Description: ${description}</p>
      </div>
    `;

    const windInfoHtml = `
      <div class="wind-info">
        <p>Wind Speed: ${windSpeed} m/s</p>
      </div>
    `;



    // Combine all HTML parts
    const fullHtml = `
      <div class="weather-container">
        ${mainInfoHtml}
        ${weatherInfoHtml}
        ${windInfoHtml}
        ${iconHtml}
      </div>
    `;

    // Update the HTML with weather information
    weatherInfoElement.innerHTML = fullHtml;
}


// Add an event listener to the form
document.getElementById('city-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const cityName = document.getElementById('city-input').value.trim();
    if (!cityName) {
        alert('Please enter a city name.');
        return;
    }

    // Call fetchWeather function
    const weatherData = await fetchWeather(cityName);
    displayWeather(weatherData);
});
