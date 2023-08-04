    
  async function getWeatherData(location) {
    const apiKey = "79d5db80a6eb86c277c56aaf926b4671";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
          return data;
        } else {
          throw new Error(data.message || 'Failed to fetch weather data');
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }

    function extractWeatherInfo(data) {
      if (!data) {
        return null;
      }

      const weatherInfo = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };

      return weatherInfo;
    }

    function displayWeatherInfo(weatherInfo) {
      const weatherInfoDiv = document.getElementById('weatherInfo');
      if (!weatherInfo) {
        weatherInfoDiv.textContent = 'No weather information available.';
        return;
      }

      const content = `
        <h2>Weather Information</h2>
        <p>City: ${weatherInfo.city}</p>
        <p>Country: ${weatherInfo.country}</p>
        <p>Temperature: ${weatherInfo.temperature} °C</p>
        <p>Description: ${weatherInfo.description}</p>
        <p>Humidity: ${weatherInfo.humidity}%</p>
        <p>Wind Speed: ${weatherInfo.windSpeed} m/s</p>
      `;
      weatherInfoDiv.innerHTML = content;
    }

    document.getElementById('weatherForm').addEventListener('submit', async function (event) {
      event.preventDefault();

      const locationInput = document.getElementById('location');
      const location = locationInput.value.trim();

      if (location) {
        const weatherData = await getWeatherData(location);
        const weatherInfo = extractWeatherInfo(weatherData);
        displayWeatherInfo(weatherInfo);
      }
    });
