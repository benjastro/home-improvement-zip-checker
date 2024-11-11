let jsonUrl = "https://script.google.com/macros/s/AKfycbwRtQfNdpUt2wFNQQ1dLXUGuLoLaPF3ymdqEy4hhOJE4_BVdL_b-MND5jV6EWE4QLGA/exec";

let jsonData = {};

resultElement = document.getElementById('result');

function errorDisplay(text, error) {
    console.error(error);
    resultElement.textContent = text;
    resultElement.style.color = "red";
}

function finishLoading() {
    document.getElementById('form').style.display = "block";
    resultElement.style.color = "black";
    resultElement.textContent = "";
}

function check(){
    let is_zip_exists = false;
    inputtedZip = document.getElementById('zip').value.trim().toUpperCase();

    resultElement.textContent = "Loading...";
    resultElement.style.color = "black";

    if (!jsonData) {
        errorDisplay("An error has occured!\n Please retry!", error);
        return;
    }

    Object.entries(jsonData).forEach(([key, value]) => {

        let hasZip = value.find(element => element.zip == inputtedZip);
        
        if (hasZip) {
            if (!is_zip_exists) {
                is_zip_exists = true;
                resultElement.textContent = inputtedZip + " ZIP IS ACCEPTED FOR";
            }

            resultElement.textContent += " (" + key + ")";
            resultElement.style.color = "green";
        }
    })

    if (!is_zip_exists) {
        resultElement.textContent = inputtedZip + " ZIP IS NOT ACCEPTED FOR ALL";
        resultElement.style.color = "red";
    } 
    
}

fetch(jsonUrl)
    .then(response => response.json()
        .then((data) => {
            jsonData = data;
            finishLoading();
        })
    )
    .catch(error => errorDisplay("An error has occured!\n Please retry!", error));


resultElement.textContent = "Loading...";
resultElement.style.color = "black";