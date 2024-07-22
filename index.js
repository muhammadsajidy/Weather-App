const input = document.getElementById("city-name");
const button = document.getElementById("get-weather");
const parentContainer = document.getElementById("info");
const apiKey = "26030a14a9d8e57a19e9405e7fc014d4";

if (!input) console.error("Input element not found");
if (!button) console.error("Button element not found");
if (!parentContainer) console.error("Parent container not found");

button.addEventListener("click", async (event) => {
    event.preventDefault();
    let city = input.value;
    if(city) {
        try {
            const weatherData = await getWeatherInfo(city);
            displayWeather(weatherData);
        }
        catch (error) {
            displayError(error.message);
        }
    }
    else {
        displayError("Please Enter a City");
    }
});

async function getWeatherInfo(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    let response = await fetch(api);

    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
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

    clearContainer(parentContainer);
    parentContainer.style.display = "flex";
    parentContainer.style.flexDirection = "column";
    parentContainer.style.alignItems = "center";
    parentContainer.style.padding = "20px";
    
    appendToContainer(parentContainer, [
        {tag: "h2", text: city, class: "city"},
        {tag: "p", text: `${(temp-273.15).toFixed(2)} °C`, class: "temperature"},
        {tag: "p", text: `Latitude: ${lat}`, class: "lat"},
        {tag: "p", text: `Longitude: ${lon}`, class: "lon"},
        {tag: "p", text: `Humidity: ${humidity}%`, class: "humidity"},
        {tag: "p", text: `${description}`, class: "description"},
        {tag: "span", text: weatherEmoji(id), class: "emoji"}
    ]);
}

function appendToContainer(container, elements) {
    if (container) {
        elements.forEach(el => {
            const element = document.createElement(el.tag);
            element.textContent = el.text;
            element.classList.add(el.class);
            element.style.margin = "5px 0";
            container.appendChild(element);
        });
    } else {
        console.error("Container not found");
    }
}

function clearContainer(container) {
    if (container) {
        container.innerHTML = "";
    } else {
        console.error("Container not found");
    }
}

function weatherEmoji(weatherId) {
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌦️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🌡️";
    }
}

function displayError(error) {
    console.error("Displaying error:", error);
    clearContainer(parentContainer);
    if (parentContainer) {
        parentContainer.style.display = "flex";
        const errorMsg = document.createElement("p");
        errorMsg.textContent = error;
        errorMsg.classList.add("error");
        parentContainer.appendChild(errorMsg);
    } else {
        console.error("Parent container not found");
    }
}