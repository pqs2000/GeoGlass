
let myTable = document.querySelector('#table'); 

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
    clearDataButton.addEventListener('click', clearData);
}

function clearData(){
    document.getElementById("locationBtn").disabled = true;
    document.getElementById("zipCodeInput").disabled = true; 
    document.getElementById("zipCodeButton").disabled = true; 
    document.getElementById("zipCodeInput").classList.add('noselect'); 

    document.getElementById("locationRadio").checked = false; 
    document.getElementById("zipCodeRadio").checked = false; 

    document.getElementById("zipCodeInput").value = ""; 

    myTable.removeChild(myTable.firstChild);
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
    //console.log(zipCodeInput.value);
    
    if(zipCodeInput.value.length < 5){
        document.getElementById("zipCodeError").classList.remove("hidden");
    }
    
    let userZipCode = zipCodeInput.value;

    zipCodeToCoordinates(userZipCode);
}


function geoFindMe(){


    const status = document.querySelector("#status");

    function success(position){
        console.log("ready 4"); 
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

    console.log("ready 1");
    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.geosearch; 
            console.log(pages);
            
            var listingArray = []; 

            let headers = ['Name', 'Distance'];
            
            for(var place in pages) {
                //console.log(pages[place].title);
                //console.log(pages[place].dist)
                var listings = {};
                listings.name = pages[place].title;
                //console.log(listings.name); 
                listings.distance = pages[place].dist + "m";
                //console.log(listings.distance); 
                listingArray.push(listings);
            }

            console.log(listingArray);

            let table = document.createElement('table');
            let headerRow = document.createElement('tr');

            headers.forEach(headerText => {
                let header = document.createElement('th');
                let textNode = document.createTextNode(headerText); 
                header.appendChild(textNode); 
                headerRow.appendChild(header); 
            });

            table.appendChild(headerRow); 

            listingArray.forEach(lis => {
                let row = document.createElement('tr'); 

                Object.values(lis).forEach(text => {
                    let cell = document.createElement('td'); 
                    let textNode = document.createTextNode(text);
                    cell.appendChild(textNode); 
                    row.appendChild(cell);
                })

                table.appendChild(row);
            })

            myTable.appendChild(table)

        })
        .catch(function(error){console.log(error)})
    
    }
    

    function error(){
        status.textContent = "Unable to retrieve your location"; 
    }

    console.log("ready 2");
    if(!navigator.geolocation){
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        //status.textContent = "Locating..."; 
        navigator.geolocation.getCurrentPosition(success, error); 
    }
}





    
function zipCodeToCoordinates(String){

    var latitude, longitude;

    url2 = "https://app.zipcodebase.com/api/v1/search?apikey=4aa76190-cbe5-11ec-b0cd-f9a8c45e670f&codes=";

    fetch(url2 + String + "&country=us")
        .then(function(response){return response.json();})
        .then(function(response) {
            console.log(response);
            latitude = response.results[String][0].latitude.toString();
            longitude = response.results[String][0].longitude.toString();
            console.log(latitude);
            geoFindMe2(latitude, longitude);
        })
        .catch(function(error){console.log(error)});


}


function geoFindMe2(latitude, longitude){

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

    console.log("ready 1");
    fetch(url)
        .then(function(response){return response.json();})
        .then(function(response) {
            var pages = response.query.geosearch; 
            console.log(pages);
            
            var listingArray = []; 

            let headers = ['Name', 'Distance'];
            
            for(var place in pages) {
                //console.log(pages[place].title);
                //console.log(pages[place].dist)
                var listings = {};
                listings.name = pages[place].title;
                //console.log(listings.name); 
                listings.distance = pages[place].dist + "m";
                //console.log(listings.distance); 
                listingArray.push(listings);
            }

            console.log(listingArray);

            let table = document.createElement('table');
            let headerRow = document.createElement('tr');

            headers.forEach(headerText => {
                let header = document.createElement('th');
                let textNode = document.createTextNode(headerText); 
                header.appendChild(textNode); 
                headerRow.appendChild(header); 
            });

            table.appendChild(headerRow); 

            listingArray.forEach(lis => {
                let row = document.createElement('tr'); 

                Object.values(lis).forEach(text => {
                    let cell = document.createElement('td'); 
                    let textNode = document.createTextNode(text);
                    cell.appendChild(textNode); 
                    row.appendChild(cell);
                })

                table.appendChild(row);
            })

            myTable.appendChild(table)
        })
        .catch(function(error){console.log(error)})
    
    }



init(); 

