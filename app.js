


const successCallback = (position) => {
    console.log(position);
}

const errorCallback = (position) => {
    console.log(position);
}

function init(){
    //starting both buttons and textInput as disabled at start 
    document.getElementById("locationBtn").disabled = true;
    document.getElementById("zipCodeInput").disabled = true; 
    document.getElementById("zipCodeButton").disabled = true; 
    document.getElementById("zipCodeInput").classList.add('noselect'); 

    //event listeners for both radio buttons 
    document.getElementById("locationRadio").addEventListener('click', enableLocationButton);
    document.getElementById("zipCodeRadio").addEventListener('click', enableZipCode);

    //event listeners for the buttons
    zipCodeButton.addEventListener('click',zipCodeClick)
    locationBtn.addEventListener('click', getLocation);
}



//this function will enable the location button once the radio button is pressed 
function enableLocationButton() {
    document.getElementById("locationBtn").disabled = false;
    document.getElementById("zipCodeInput").disabled = true; 
    document.getElementById("zipCodeButton").disabled = true; 
}

//this function will enable the zipcode textbox and button once the radio button is pressed 
function enableZipCode() {
    document.getElementById("zipCodeInput").disabled = false; 
    document.getElementById("locationBtn").disabled = true; 
    document.getElementById("zipCodeButton").disabled = false;
    document.getElementById("zipCodeInput").classList.remove('noselect'); 
}



function getLocation() {
    console.log("The location button has been detected.");
    geoFindMe();
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}


//user clicks the zip code button
function zipCodeClick() {
    document.getElementById("zipCodeError").classList.add("hidden");
    console.log(zipCodeInput.value);
    
    if(zipCodeInput.value.length < 5){
        document.getElementById("zipCodeError").classList.remove("hidden");
    }
    
    let userZipCode = zipCodeInput.value;

    geoFindMe2(userZipCode);

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


function geoFindMe2(String){

    const status = document.querySelector("#status");

    //request for lat and long using zip code
    const request = new XMLHttpRequest(); 
    
    //https://www.zipcodeapi.com/rest/DemoOnly00S9DXRS56eyOr2aU2ygCV2jKwXImAU8RvdwH8Bvmo9TfOHEaToMGxZ9/info.json/28601/degrees

    request.open('GET', "https://www.zipcodeapi.com/rest/lAPeqbYnxI6yHW2cJa5tzU6ygvmGSjGleCsHCDjnNh9sukMGR9uVxmGESCOpVxT3/info.json/" 
    + String + "/degrees");
    request.send(); 

    console.log("request with zip code " + String + " was sent");
    /*
    
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
        */
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
