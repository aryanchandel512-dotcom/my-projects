// const apiKey = "b66e92ab56c2b12cb790858bcf178273";

// function getWeather() {
//     const city = document.getElementById("cityInput").value.trim();

//     if (!city) {
//         alert("Please enter a city name");
//         return;
//     }

//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

//     fetch(url).then(response => {
//         response.json().then(data => {
//             console.log(data);
//             if (data.cod == 200) {
//                 document.getElementById("cityName").innerText = data.name;
//                 document.getElementById("temperature").innerText = "Temperature: " + data.main.temp + " °C";
//                 document.getElementById("description").innerText = "Condition: " + data.weather[0].description;
//                 document.getElementById("humidity").innerText = "Humidity: " + data.main.humidity + "%";
//                 document.getElementById("wind").innerText = "Wind Speed: " + data.wind.speed + " m/s";
//             } else {
//                 alert(data.message);
//             }
//         });
//     }).catch(error => {
//         console.error("Error fetching weather data:", error);
//         alert("Unable to fetch weather data. Please try again later.");
//     });
// }










const apiKey = "b66e92ab56c2b12cb790858bcf178273";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return alert("Please enter a city name");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.cod == 200) {
            document.getElementById("cityName").innerText = data.name;
            document.getElementById("temperature").innerText = `Temperature: ${data.main.temp} °C`;
            document.getElementById("description").innerText = `Condition: ${data.weather[0].description}`;
            document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").innerText = `Wind Speed: ${data.wind.speed} m/s`;
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Unable to fetch weather data. Please try again later.");
    }
}