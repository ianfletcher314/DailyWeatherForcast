// on load function  that gets moment time 
window.onload = function startPage() {
    var dayAndTime = moment().format('LL');
    console.log(dayAndTime)
}


// event listener for Primary search button that that takes the location and gives you the weather
document.getElementById("locationButton").addEventListener("click", function (event) {
    event.preventDefault()
    // variables section for click function
    var searchInput = document.getElementById("textArea");
    var location = searchInput.value.trim()
    getWeatherForCity(location)

    // sets searches in local strange, retrieves them and creates buttons to search for that location's weather again
    var nameFromLocal = []
    if (localStorage.getItem('names')) {
        nameFromLocal = JSON.parse(localStorage.getItem('names'))
    }
    nameFromLocal.push(location)
    console.log(nameFromLocal)
    localStorage.setItem('names', JSON.stringify(nameFromLocal))
    var searchHolder = document.getElementById("searchDiv")
    var searchContainer = document.createElement("div")
    searchHolder.appendChild(searchContainer)

    for (let i = 0; i < nameFromLocal.length; i++) {
        var pastSearchesElement = document.createElement("button")
        pastSearchesElement.classList.add('btn-success')
        pastSearchesElement.classList.add('btn')
        pastSearchesElement.classList.add('grab')

        pastSearchesElement.innerHTML = nameFromLocal[i]
        searchHolder.appendChild(pastSearchesElement)
    }
    // here I need a looping function that takes the array of selected elements and makes an event listener for each individual
    // element  it that when clickedc alls the getWeatherForCity function using the innerHTML of the element as the parameter
    var buttonElements = document.querySelectorAll(".grab")
    for (let i = 0; i < buttonElements.length; i++) {
        console.log(buttonElements[i])
        // WHY DOENT THIS ONLY WORK ON CLICK???? IT RUNS EVERY TIME THE PAGE LOADS
        buttonElements[i].addEventListener("click", () => getWeatherForCity(buttonElements[i].innerHTML))

    }


});


// Function tha gives you the weather when called by event listener
function getWeatherForCity(city) {

    var inputSectionElement = document.getElementById("container")
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=e52b27c3a12708b53090d96de3562d01';
    console.log("Event Listener is firing")
    // console.log(searchInput.value)
    inputSectionElement.classList.add('hide')

    // grab the information from the API using the location provided by user
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data)
            var temperature = data.main.temp_max
            var humidity = data.main.humidity
            var windSpeed = data.wind.speed
            var weatherIcon = data.weather[0].icon
            var cityLatitude = data.coord.lat
            var cityLongitude = data.coord.lon
            var weatherIconPhoto = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
            console.log(temperature, "Degrees is the Temperature")
            console.log(humidity, "% Humidity")
            console.log(windSpeed, "mph Wind Speed")
            console.log(cityLatitude)
            console.log(cityLongitude)




            // create new element that house the data we are trying to pull from the API. weatherHolder will be the main container
            var weatherHolder = document.getElementById("weatherDiv")
            var weatherContainer = document.createElement("div")
            weatherHolder.appendChild(weatherContainer)
            console.log(weatherHolder)

            // create element that will hold city's name
            var cityHeader = document.createElement("div")
            cityHeader.classList.add("cityHeader")
            cityHeader.textContent = city
            weatherHolder.appendChild(cityHeader)
            console.log(cityHeader)
            console.log(weatherHolder)

            // create element that holds list of city's weather

            // THIS IS WHERE MIM AND I WERE WORKING!!! THIS SHOULD EMPY THE THE LIST ELEMENT BUT REMOVE AND INNERHTML ARENT WORKING
            var listElement = document.querySelector(".weatherList")
            if (listElement) {
                listElement.remove()
                var listElement2 = document.querySelector(".weatherList")
                listElement2.remove()
                var listElement3 = document.querySelector(".timeRemover")
                listElement3.remove()
                var listElement4 = document.querySelector(".cityHeader")
                listElement4.remove()
                var listElement5 = document.querySelector(".iconRemover")
                listElement5.remove()
            }
            console.log(listElement, "this is not working ahhaa ")
            var cityWeatherList = document.createElement("ul")
            cityWeatherList.classList.add("weatherList")
            var cityTemperature = document.createElement("li")
            cityTemperature.textContent = `${temperature} Degrees Farenheit`
            console.log(cityTemperature)
            cityWeatherList.appendChild(cityTemperature)
            var cityHumidity = document.createElement("li")
            cityHumidity.textContent = `${humidity} Percent Humidity`
            console.log(cityHumidity)
            cityWeatherList.appendChild(cityHumidity)
            var cityWind = document.createElement("li")
            cityWind.textContent = `${windSpeed} MPH Wind Speed`
            console.log(cityWind)
            cityWeatherList.appendChild(cityWind)
            var cityTime = document.createElement("h1")
            cityTime.classList.add("timeRemover")
            cityTime.textContent = moment().format('ll');
            console.log(cityTime)
            weatherHolder.appendChild(cityTime)
            var cityWeatherIcon = document.createElement("img")
            cityWeatherIcon.classList.add("iconRemover")
            cityWeatherIcon.src = weatherIconPhoto
            console.log(cityWeatherIcon)
            weatherHolder.appendChild(cityWeatherIcon)
            // function that takes lat and lon and gets UV from the other API
            var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&units=imperial&appid=e52b27c3a12708b53090d96de3562d01"
            fetch(oneCallUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    var cityUv = document.createElement("li")
                    cityUv.textContent = data.current.uvi
                    // change the text color to the UVI index color to indicate severity 
                    if (cityUv.textContent < 3) {
                        cityUv.classList.add("green")
                    }
                    else if (3 < cityUv.textContent < 6) {
                        cityUv.classList.add("yellow")
                    }
                    else if (6 < cityUv.textContent < 8) {
                        cityUv.classList.add("orange")
                    }
                    else if (8 < cityUv.textContent < 11) {
                        cityUv.classList.add("red")
                    }
                    else if (11 < cityUv.textContent) {
                        cityUv.classList.add("violet")
                    }
                    cityWeatherList.appendChild(cityUv)
                    weatherHolder.appendChild(cityWeatherList)
                    console.log(weatherHolder)

                    var loopWeatherList = document.createElement("ul")
                    loopWeatherList.classList.add("weatherList")
                    // create elements for future 5 days 
                    for (let i = 0; i < data.daily.length - 2; i++) {
                        var loopCityTime = document.createElement("h1")
                        loopCityTime.textContent = moment().add(i + 1, 'days').calendar();
                        console.log(loopCityTime)
                        loopWeatherList.appendChild(loopCityTime)

                        var loopIconElement = document.createElement("img")
                        var loopIconId = data.daily[i].weather[0].icon
                        var loopIconPhoto = "http://openweathermap.org/img/wn/" + loopIconId + "@2x.png"
                        loopIconElement.src = loopIconPhoto
                        loopWeatherList.appendChild(loopIconElement)

                        var loopTempElement = document.createElement("li")
                        var loopTemp = data.daily[i].temp.day
                        loopTempElement.textContent = `${loopTemp} Degrees Farenheit`
                        loopWeatherList.appendChild(loopTempElement)

                        var loopHumidElement = document.createElement("li")
                        var loopHumid = data.daily[i].humidity
                        loopHumidElement.textContent = `${loopHumid} % Humidity`
                        loopWeatherList.appendChild(loopHumidElement)

                    }
                    weatherHolder.appendChild(loopWeatherList)

                })



        })
}