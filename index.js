const inputCity = document.getElementById("cityName");
const button = document.getElementById("get-weather");
const weatherInfo = document.getElementsByClassName("info");
const weatherInfo1 = document.getElementsByClassName("info1");
const weatherInfo2 = document.getElementsByClassName("info2");
const weatherInfo3 = document.getElementsByClassName("info3");

button.addEventListener("click", async (event) => {
    event.preventDefault();
    const cityName = inputCity.value;
    if(cityName) {
        try {
            const weatherData = await getWeatherDetails(cityName);
            displayWeather(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city");   
    }
})

async function getWeatherDetails(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=26030a14a9d8e57a19e9405e7fc014d4`;
    let response = await fetch(api);

    if(!response.ok) {
        throw new Error("Couldn't fetch weather data for the city!");
    }

    return await response.json();
}

function displayWeather(data) {
    const {
        name: city, 
        main: {temp, humidity},
        coord: {lon, lat}, 
        weather: [{description, id}]
    } = data;

    weatherInfo.textContent = "";
    weatherInfo.style.display = "flex";

    const cityDisplay = document.createElement("p");
    cityDisplay.textContent = city;
    weatherInfo1.appendChild(cityDisplay);
    cityDisplay.classList.add("city");

    const tempDisplay = document.createElement("h1");
    tempDisplay.textContent = `${temp-273.15} °C`;
    weatherInfo1.appendChild(tempDisplay);
    tempDisplay.classList.add("temperature");

    const latDisplay = document.createElement("p");
    latDisplay.textContent = lat;
    weatherInfo2.appendChild(latDisplay);
    latDisplay.classList.add("lat");

    const lonDisplay = document.createElement("p");
    lonDisplay.textContent = lon;
    weatherInfo2.appendChild(lonDisplay);
    lonDisplay.classList.add("lon");

    const humDisplay = document.createElement("p");
    humDisplay.textContent = humidity;
    weatherInfo3.appendChild(humDisplay);
    humDisplay.classList.add("humidity");

    const descDisplay = document.createElement("p");
    descDisplay.textContent = description;
    weatherInfo3.appendChild(descDisplay);
    descDisplay.classList.add("description");

    const emojiDisplay = document.createElement("span");
    emojiDisplay.textContent = weatherEmoji(id);
    document.querySelector("alg").appendChild(emojiDisplay);
    emojiDisplay.classList.add("emoji");
}

function weatherEmoji(weatherId) {
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "";
        case (weatherId >= 300 && weatherId < 400):
            return "";
        case (weatherId >= 500 && weatherId < 600):
            return "";
        case (weatherId >= 600 && weatherId < 700):
            return "";
        case (weatherId >= 700 && weatherId < 800):
            return "";
        case (weatherId === 800):
            return "";
        case (weatherId >= 801 && weatherId < 810):
            return "";
        default:
            return "";
    }
}

function displayError(error) {
    const errDisplay = document.createElement("p");
    errDisplay.textContent = error;
    errDisplay.classList.add("error");

    weatherInfo.textContent = "";
    weatherInfo.style.display = "flex";
    weatherInfo.appendChild(errDisplay);
}