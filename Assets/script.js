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
    var temperature = ""
    var humidity = ""
    var ultraViolet = ""
    var windSpeed = ""
    // api url broken into sections with the location element set as changing variable
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&units=imperial&appid=e52b27c3a12708b53090d96de3562d01';
    console.log("Event Listener is firing")
    console.log(searchInput.value)
    inputSectionElement.classList.add('hide')
    
    // grab the information from the API using the location provided by user
    // ????? HOW DO YOU SAVE DATA OBJECT TO VARIABLES I CAN ONLY GET IT TO CONSOLE LOG?????
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => console.log(data.main.temp_max));



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
    
    // var humidity = data.main.humidity
    // var ultraViolet = data.main.
    // var windSpeed = data.main
    var cityWeatherList = document.createElement("ul")
    cityWeatherList.classList.add("weatherList")
    var cityTemperature = document.createElement("li")
    cityWeatherList.appendChild(cityTemperature)
    var cityHumidity = document.createElement("li")
    cityWeatherList.appendChild(cityHumidity)
    var cityWind = document.createElement("li")
    cityWeatherList.appendChild(cityWind)
    var cityUv = document.createElement("li")
    cityWeatherList.appendChild(cityUv)
    weatherHolder.appendChild(cityWeatherList)
    console.log(weatherHolder)
    
    
    
    



    // function 2that puts the location they inputed into the middle of the API URL so we can get the specific information for that location

    // function 3 that creates the elements that display the results of function 2 ie the columns with temp humidity icon etc.


  });