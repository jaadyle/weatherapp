var fetchWeather = "/weather";

document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + "')";

const userInput = document.querySelector('userInput');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const API_KEY ='064b8ce6253b94fcb3c45ab5847904b4';

const weather = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const locationElement = document.querySelector('.place');

const dateElement = document.querySelector('.date');
const timezone = document.getElementById('time-zone');
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const daysofWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            


dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3)


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                 tempElement.textContent = "";
                 weatherCondition.textContent = "";
            } else{
                
                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();

            }
        })
    });
})


setInterval(() => {
    const time = new Date();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`



}, 1000);




getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=$064b8ce6253b94fcb3c45ab5847904b4`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

