
const successCallback = (position) => {
    console.log(position);
}

const errorCallback = (position) => {
    console.log(position);
}

function init(){
    //starting both buttons and textInput as disabled at start 
    document.getElementById("useLocationBtn").disabled = true;
    document.getElementById("useZipCode").disabled = true; 
    document.getElementById("useZipCodeButton").disabled = true; 
    document.getElementById("useZipCode").classList.add('noselect'); 

    //event listeners for both radio buttons 
    document.getElementById("useLocationRadBtn").addEventListener('click', enableLocationButton);
    document.getElementById("useZipCodeRadBtn").addEventListener('click', enableZipCode);

    //event listeners for the buttons
    useZipCodeButton.addEventListener('click',updateValue)
    useLocationBtn.addEventListener('click', getLocation);
}



//this function will enable the location button once the radio button is pressed 
function enableLocationButton() {
    document.getElementById("useLocationBtn").disabled = false;
    document.getElementById("useZipCode").disabled = true; 
    document.getElementById("useZipCodeButton").disabled = true; 
}

//this function will enable the zipcode textbox and button once the radio button is pressed 
function enableZipCode() {
    document.getElementById("useZipCode").disabled = false; 
    document.getElementById("useLocationBtn").disabled = true; 
    document.getElementById("useZipCodeButton").disabled = false;
    document.getElementById("useZipCode").classList.remove('noselect'); 
}



function getLocation() {
    console.log("The location button has been detected.");
    geoFindMe();
    //navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function updateValue() {
    document.getElementById("zipCodeError").classList.add("hidden");
    console.log(useZipCode.value);
    
    if(useZipCode.value.length < 5){
        document.getElementById("zipCodeError").classList.remove("hidden"); 
    }
    
}
function geoFindMe(){

    const status = document.querySelector("#status");

    function success(position){
        const latitude = position.coords.latitude.toString(); 
        const longitude = position.coords.longitude.toString(); 
        status.textContent = ""; 
        
        

    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        list: "geosearch", 
        gscoord: latitude + "|" + longitude, 
        gsradius: "10000",
        gslimit: "10", 
        format: "json"
    };

    url = url + "?origin=*"; 
    Object.keys(params).forEach(function(key) {url += "&" + key + "=" + params[key];})

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.geosearch; 
            for(var place in pages) {
                console.log(pages[place].title);
                console.log(pages[place].dist)
            }
        })
        .catch(function(error){console.log(error)})
    }

    function error(){
        status.textContent = "Unable to retrieve your location"; 
    }

    if(!navigator.geolocation){
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        status.textContent = "Locating..."; 
        navigator.geolocation.getCurrentPosition(success, error); 
    }
}

init(); 

/*
function getPages(){


    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "query",
        list: "geosearch", 
        gscoord: latitude + " | " + longitude, 
        gsradius: "10000",
        gslimit: "10", 
        format: "json"
    };

    url = url + "?origin=*"; 
    Object.keys(params).forEach(function(key) {url += "&" + key + "=" + params[key];})

    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.geosearch; 
            for(var place in pages) {
                console.log(pages[place].title);
            }
        })
        .catch(function(error){console.log(error)})
}

//spinner.classList.remove('hidden'); 
*/
