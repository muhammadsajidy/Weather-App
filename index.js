const input = document.getElementById("city-name");
const button = document.getElementById("get-weather");
const parentContainer = document.getElementById("info");
const childContainer1 = document.getElementById("info1");
const childContainer2 = document.getElementById("info2");
const childContainer3 = document.getElementById("info3");
const apiKey = "26030a14a9d8e57a19e9405e7fc014d4";

button.addEventListener("click", async (event) => {
    event.preventDefault();
    let city = input.value;
    if(city) {
        try {
            const weatherData = await getWeatherInfo(city);
            displayWeather(weatherData);
        }
        catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else {
        displayError("Please Enter a City")
    }
})

async function getWeatherInfo(city) {
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

    parentContainer.innerText = "";
    parentContainer.style.display = "flex";

    const cityDisplay = document.createElement("p");
    cityDisplay.innerText = city;
    childContainer1.appendChild(cityDisplay);
    cityDisplay.classList.add("city");

    const tempDisplay = document.createElement("h1");
    tempDisplay.textContent = `${temp-273.15} °C`;
    childContainer1.appendChild(tempDisplay);
    tempDisplay.classList.add("temperature");

    const latDisplay = document.createElement("p");
    latDisplay.innerText = lat;
    childContainer2.appendChild(latDisplay);
    latDisplay.classList.add("lat");

    const lonDisplay = document.createElement("p");
    lonDisplay.innerText = lon;
    childContainer2.appendChild(lonDisplay);
    lonDisplay.classList.add("lon");

    const humDisplay = document.createElement("p");
    humDisplay.innerText = humidity;
    childContainer3.appendChild(humDisplay);
    humDisplay.classList.add("humidity");

    const descDisplay = document.createElement("p");
    descDisplay.innerText = description;
    childContainer3.appendChild(descDisplay);
    descDisplay.classList.add("description");

    const emojiDisplay = document.createElement("span");
    emojiDisplay.innerText = weatherEmoji(id);
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
    const errorMsg = document.createElement("P");
    errorMsg.innerText = error;
    errorMsg.classList.add("error");
    parentContainer.innerText = "";
    parentContainer.style.display = "flex";
    parentContainer.appendChild(errorMsg);
}