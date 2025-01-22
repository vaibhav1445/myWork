const url = 'https://openweather43.p.rapidapi.com/weather?q=Delhi&units=metric';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6856b6547cmshf2cf672f006d824p1d300ajsn2e71c6571d70',
        'X-RapidAPI-Host': 'openweather43.p.rapidapi.com'
    }
};

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${url}&q=${city}`, options);
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Update UI with weather data
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        // Use the icon property to dynamically update the weather icon
        const iconCode = data.weather[0].icon; // Example: "01d" for clear day, "01n" for clear night
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Display the weather info
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        console.error(error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Event listener for search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Check weather for the default city (e.g., Delhi) on page load
checkWeather("Delhi");
