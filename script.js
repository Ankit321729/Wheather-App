const apiKey = '781536bce5ff4ea1ba361507252302'; // Use your provided API key
const cityNameElement = document.getElementById('city-name');
const temperatureElement = document.getElementById('temperature');
const conditionElement = document.getElementById('condition');
const humidityElement = document.getElementById('humidity');
const airQualityElement = document.getElementById('air-quality');
const locationInput = document.getElementById('location');
const getWeatherButton = document.getElementById('get-weather');

getWeatherButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    
    if (location !== '') {
        fetchWeatherData(location);
    } else {
        alert('Please enter a valid city or location');
    }
});

async function fetchWeatherData(location) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`);
        const data = await response.json();

        if (data.error) {
            alert('Location not found! Please try again.');
            return;
        }

        // Display weather information
        cityNameElement.textContent = `${data.location.name}, ${data.location.country}`;
        temperatureElement.textContent = `Temperature: ${data.current.temp_c}°C`;
        conditionElement.textContent = `Condition: ${data.current.condition.text}`;
        humidityElement.textContent = `Humidity: ${data.current.humidity}%`;
        airQualityElement.textContent = `Air Quality (US-EPA): ${data.current.air_quality['us-epa-index']}`;

    } catch (error) {
        alert('Error fetching weather data. Please try again.');
    }
}
