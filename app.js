


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

    console.log("ready 2");
    if(!navigator.geolocation){
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        status.textContent = "Locating..."; 
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
            for(var place in pages) {
                console.log(pages[place].title);
                console.log(pages[place].dist)
            }
        })
        .catch(function(error){console.log(error)})
    
    }



init(); 

// const geoFindMe2 = async (String) => {

    
//     const status = document.querySelector("#status");

//     /*
//     //request for lat and long using zip code
//     const request = new XMLHttpRequest(); 

//     var latitude, longitude; 
//     //var data;
    
//     //https://app.zipcodebase.com/api/v1/search?apikey=4aa76190-cbe5-11ec-b0cd-f9a8c45e670f&codes=10005%2C51503
   
//     request.addEventListener('readystatechange', () => {
//         //console.log(request, request.readyState)
//         if(request.readyState === 4){
//             data = JSON.parse(request.responseText)
//             console.log(data);
//             console.log(data.results[String][0].latitude);
//             latitude = data.results[String][0].latitude.toString();
//             longitude = data.results[String][0].longitude.toString(); 
//             console.log(latitude); 
//             console.log(longitude); 
            
//            };
//        });
   
//     let url2 = "https://app.zipcodebase.com/api/v1/search?apikey=4aa76190-cbe5-11ec-b0cd-f9a8c45e670f&codes="
//     request.open('GET', url2 + String + "&country=us");
//     request.send(); 
   
//     console.log("request with zip code " + String + " was sent");
//        */
    
//     console.log("ready 1")
    
//     coordinates = await zipCodeToCoordinate(String); 

//     // getCoordinates(String).then(data => {
//     //     console.log("ready 5"); 
//     //     //console.log(typeof coordinates.latitude); 
        
//     //     console.log(data.results[String][0].latitude);
//     //     coordinates = await 
//     // }).catch((err) => {
//     //     console.log("rejected:", err.message);
//     // }); 

//     console.log("ready 7");
//     console.log(coordinates); 

     
//     console.log(coordinates.latitude); 
//     console.log("ready 8"); 

//     console.log(coordinates.longitude); 
//     let latitude = coordinates[0]; 
//     let longitude = coordinates[1]; 
    
//     console.log("ready 9");
//     var url = "https://en.wikipedia.org/w/api.php"; 
    
    
//     console.log(latitude); 
//     console.log(longitude); 

//     var params = {
//         action: "query",
//         list: "geosearch", 
//         gscoord: latitude + "|" + longitude, 
//         gsradius: "10000",
//         gslimit: "10", 
//         format: "json"
//     };

    
//     console.log("ready 10");
//     url = url + "?origin=*"; 
//     Object.keys(params).forEach(function(key) {url += "&" + key + "=" + params[key];})

//     fetch(url)
//         .then(function(response){return response.json();})
//         .then(function(response) {
//             var pages = response.query.geosearch; 
//             for(var place in pages) {
//                 //console.log("ready3");
//                 console.log(pages[place].title);
//                 console.log(pages[place].dist)
//             }
//         })
//         .catch(function(error){console.log(error)})

//         /*
//         function error(){
//             status.textContent = "Unable to retrieve your location"; 
//         }
//         */


// }
    
// // function zipCodeToCoordinate(String) {

// //     console.log("ready 2"); 
    
    
//     //coordinates = new Array(2);
//     //let coordinates = new Object(); 

//     //var lat, long; 
    
    
//     const getCoordinates = () => {
    
//         return new Promise((resolve, reject) => {
//             const request = new XMLHttpRequest(); 
            
//             request.addEventListener('readystatechange', () => {
//                 //console.log(request, request.readyState)
//                 if(request.readyState === 4 && request.status == 200){
//                     console.log("ready 3");
//                     data = JSON.parse(request.responseText)
//                     console.log(data);
//                     console.log(data.results[String][0].latitude);
//                     let lat = data.results[String][0].latitude.toString();
//                     let long = data.results[String][0].longitude.toString(); 
//                     console.log(lat); 
//                     console.log(long); 
//                     console.log("ready 4"); 
//                     const coordinates = {latitude: lat, longitude: long};
//                     //return coordinates;
//                     resolve(coordinates);
//                 } else {
//                     reject("error");
//                 }
//             });    

                
//                 let url2 = "https://app.zipcodebase.com/api/v1/search?apikey=4aa76190-cbe5-11ec-b0cd-f9a8c45e670f&codes="
//                 request.open('GET', url2 + String + "&country=us");
//                 request.send(); 
          
//                 console.log("request with zip code " + String + " was sent");
       
//                 console.log("ready 6"); 

//        })}; 

//     // const getCoordinates = async (String) => {
        
//     //     console.log("ready moon");

//     //     let url2 = "https://app.zipcodebase.com/api/v1/search?apikey=4aa76190-cbe5-11ec-b0cd-f9a8c45e670f&codes=";

//     //     console.log(String);
        
//     //     const response = await fetch(url2 + String + "&country=us");

//     //     console.log("star"); 
//     //     if(response.status != 200){
//     //         throw new Error("cannot fetch data"); 
//     //     }

//     //     const data = await response.json(); 
//     //     console.log("earth");
//     //     return data; 
//     // }


//     getCoordinates(String).then(coordinates => {
//         console.log("ready 5"); 
//         console.log(typeof coordinates.latitude); 
//         return coordinates;
//     }).catch((err) => {
//         console.log("rejected:", err.message);
//     }); 

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
