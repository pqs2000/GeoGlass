
const successCallback = (position) => {
    console.log(position);
}

const errorCallback = (position) => {
    console.log(position);
}

document.getElementById("useLocationBtn").disabled = true;
document.getElementById("useZipCode").disabled = true; 


document.getElementById("useLocationRadBtn").addEventListener('click', enableLocationButton);
document.getElementById("useZipCodeRadBtn").addEventListener('click', enableZipCode);


function enableLocationButton() {
    document.getElementById("useLocationBtn").disabled = false;
    document.getElementById("useZipCode").disabled = true; 
}

function enableZipCode() {
    document.getElementById("useZipCode").disabled = false; 
    document.getElementById("useLocationBtn").disabled = true; 
}

useZipCode.addEventListener('input',updateValue)
useLocationBtn.addEventListener('click', getLocation);

function getLocation() {
    console.log("The location button has been detected.");
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function updateValue(e) {
    log.textContent = e.target.value; 
}



async function getQuote() {

    spinner.classList.remove('hidden'); 

    try {
        const response = await fetch(endpoint)
        if (!response.ok){
            throw Error(response.statusText)
        }

        const json = await response.json(); 
        displayQuote(json.message); 
    } catch (err) {
        console.log(err)
        alert('Failed to fetch new quote')
    } finally {
        newQuoteButton.disabled = false; 
        spinner.classList.add('hidden'); 
    }

}

function displayQuote(quote){
    const quoteText = document.querySelector('#js-quote-text');
    quoteText.textContent = quote; 
}

