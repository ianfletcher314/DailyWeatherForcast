// on load function 1 that gets moment time 
window.onload = function startPage(){
    var dayAndTime = moment().format('LL'); 
    console.log(dayAndTime)
}




// event listenerfor button that that inputs location. function it calls below
document.getElementById("locationButton").addEventListener("click", function(event){
    event.preventDefault()
    // variables section for click function
    var searchInput = document.getElementById("textArea");
    var location = searchInput.value.trim()
    var inputSectionElement = document.getElementById("container")
    // var temperature = ""
    // var humidity = ""
    // var windSpeed = ""
    // var ultraViolet = ""
    // api url broken into sections with the location element set as changing variable
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=e52b27c3a12708b53090d96de3562d01';
    console.log("Event Listener is firing")
    console.log(searchInput.value)
    inputSectionElement.classList.add('hide')
    
    // grab the information from the API using the location provided by user
    // ????? HOW DO YOU SAVE DATA OBJECT TO VARIABLES I CAN ONLY GET IT TO CONSOLE LOG?????
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
        var weatherIconPhoto = "http://openweathermap.org/img/wn/" + weatherIcon +"@2x.png"
        console.log(temperature,"Degrees is the Temperature")
        console.log(humidity, "% Humidity")
        console.log(windSpeed,"mph Wind Speed")
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
        cityHeader.textContent = location
        weatherHolder.appendChild(cityHeader)
        console.log(cityHeader)
        console.log(weatherHolder)

        // create element that holds list of city's weather
        var cityWeatherList = document.createElement("ul")
        cityWeatherList.classList.add("weatherList")
        var cityTemperature = document.createElement("li")
        cityTemperature.textContent = temperature
        console.log(cityTemperature)
        cityWeatherList.appendChild(cityTemperature)
        var cityHumidity = document.createElement("li")
        cityHumidity.textContent = humidity
        console.log(cityHumidity)
        cityWeatherList.appendChild(cityHumidity)
        var cityWind = document.createElement("li")
        cityWind.textContent = windSpeed
        console.log(cityWind)
        cityWeatherList.appendChild(cityWind)
        var cityTime = document.createElement("h1")
        cityTime.textContent = moment().format('ll');  
        console.log(cityTime)
        weatherHolder.appendChild(cityTime)
        var cityWeatherIcon= document.createElement("img")
        cityWeatherIcon.src = weatherIconPhoto
        console.log(cityWeatherIcon)
        weatherHolder.appendChild(cityWeatherIcon)
         // function that takes lat and lon and gets UV from the other API
        var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat="+cityLatitude+"&lon="+cityLongitude+"&units=imperial&appid=e52b27c3a12708b53090d96de3562d01"
        fetch(oneCallUrl)
        .then(response => response.json())
        .then(data => {
        console.log(data)
        var cityUv = document.createElement("li")
        cityUv.textContent = data.current.uvi
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
            var loopIconPhoto = "http://openweathermap.org/img/wn/" + loopIconId +"@2x.png"
            loopIconElement.src = loopIconPhoto
            loopWeatherList.appendChild(loopIconElement)

            var loopTempElement = document.createElement("li")
            var loopTemp = data.daily[i].temp.day
            loopTempElement.textContent= loopTemp 
            loopWeatherList.appendChild(loopTempElement)

            var loopHumidElement = document.createElement("li")
            var loopHumid = data.daily[i].humidity
            loopHumidElement.textContent= loopHumid
            loopWeatherList.appendChild(loopHumidElement)


            
            
            
           
            
        }
        weatherHolder.appendChild(loopWeatherList)

        })

        
        
    })          
   
    



    // function 2that puts the location they inputed into the middle of the API URL so we can get the specific information for that location

    // function 3 that creates the elements that display the results of function 2 ie the columns with temp humidity icon etc.


  });