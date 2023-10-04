// var APIkey = "564a8813e07cd98fd3186a2e159fcb41"
var APIkey = "8f0fa8364b82a56ff6b29b97a2963b6e"

document.getElementById("search-button").addEventListener("click", function(){
    var searchValue = document.getElementById("search-value").value
    geocode(searchValue)
});

function geocode(cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIkey}`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)
        currentWeather(data[0].lat,data[0].lon)
    })
};

function currentWeather(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=imperial`)
    .then(Response => Response.json())
    .then(data => {
        console.log(data)

        var divCard =  document.createElement("div")
        divCard.setAttribute("class", "currentcard")

        var name = document.createElement("h2")
        name.textContent = data.name

        var temp = document.createElement("h2")
        temp.textContent = "Temp: "+data.main.temp


        divCard.append(name, temp)
        document.getElementById("today").append(divCard)
    })
};



// geocode("Atlanta")














