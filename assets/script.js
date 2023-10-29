var APIkey = "564a8813e07cd98fd3186a2e159fcb41"

document.getElementById("search-button").addEventListener("click", function(){
    var searchValue = document.getElementById("search-value").value
    geocode(searchValue)
});

function geocode(cityName) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
        currentWeather(data[0].lat,data[0].lon)
        futureWeather(data[0].lat,data[0].lon)
    })
};

console.log(moment())

function currentWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)

        var divCard =  document.createElement("div")
        divCard.setAttribute("class", "currentcard")

        var date = document.createElement("h3")
        date.textContent = moment.unix(data.dt).format("MMM DD, YYYY")

        var name = document.createElement("h1")
        name.textContent = data.name

        var temp = document.createElement("h2")
        temp.textContent = "Temp: "+data.main.temp+"°F"

        var wind = document.createElement("h4")
        wind.textContent = "Wind: "+data.wind.speed+" mph"

        var humidity = document.createElement("h4")
        humidity.textContent = "Humidity: "+data.main.humidity+"%"

        var badge = document.createElement("img")
        badge.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` 

        divCard.append(date, name, temp, wind, humidity, badge)
        document.getElementById("today").append(divCard)
    })
};

function futureWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)

    for (var i = 4; i < data.list.length; i = i+8) {
        console.log(data.list[i])

var divCard =  document.createElement("div")
        divCard.setAttribute("class", "futurecard")

        // var name = document.createElement("h2")
        // name.textContent = data.name

        var date = document.createElement("h3")
        date.textContent = moment.unix(data.list[i].dt).format("MMM DD, YYYY")

        var temp = document.createElement("h2")
        temp.textContent = "Temp: "+data.list[i].main.temp+"°F"

        var wind = document.createElement("h4")
        wind.textContent = "Wind: "+data.list[i].wind.speed+" mph"

        var humidity = document.createElement("h4")
        humidity.textContent = "Humidity: "+data.list[i].main.humidity+"%"
        
        var badge = document.createElement("img")
        badge.src = `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`

        divCard.append(date, temp, wind, humidity, badge)
        document.getElementById("future").append(divCard)

    }
    })
};



