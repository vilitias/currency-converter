///////////// filling the select options

const currrencyArray = [ 
    "CHF",
    "NOK",
    "CAD",
    "GBP",
    "MXN",
    "CNY",
    "ISK",
    "KRW",
    "HKD",
    "CZK",
    "BGN",
    "BRL",
    "IDR",
    "SGD",
    "PHP",
    "RON",
    "HUF",
    "ILS",
    "THB",
    "SEK",
    "NZD",
    "AUD",
    "DKK",
    "HRK",
    "PLN",
    "TRY",
    "INR",
    "MYR",
    "ZAR",
    "JPY" 
]

let base = "RUB";
let convertTo = "USD";

const selections = document.querySelectorAll(".selection");
selections.forEach(element => {
    for (let i = 0; i < currrencyArray.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = currrencyArray[i];
        option.value = currrencyArray[i];
        element.append(option);
    }
})

//////////////////////////

const url = 'https://api.exchangerate.host/latest';

async function getRates() {
    const response = await fetch('https://api.exchangerate.host/latest');
    const data = await response.json();
    console.log(data);
}

getRates();


///////////////////// change color on left side buttons

const currencyButtonsFrom = document.querySelectorAll(".currency-button-from");
currencyButtonsFrom.forEach(element => {
    element.addEventListener("click", changeStyleFrom);
})

function changeStyleFrom(event) {
    currencyButtonsFrom.forEach(element => {
        element.classList.remove("clicked");
    })
    event.currentTarget.classList.toggle("clicked");
    if (event.currentTarget.tagName === "SELECT") {
        const options = document.querySelectorAll("option");
        options.forEach((element,index) => {
            if (index > 0) {
                element.style.backgroundColor = "white";
                element.style.color = "#c6c6c6";
            }
        })
    }
}

////////////////////////// change color on right side buttons

const currencyButtonsTo = document.querySelectorAll(".currency-button-to");
currencyButtonsTo.forEach(element => {
    element.addEventListener("click", changeStyleTo);
})

function changeStyleTo(event) {
    currencyButtonsTo.forEach(element => {
        element.classList.remove("clicked");
    })
    event.currentTarget.classList.toggle("clicked");
    if (event.currentTarget.tagName === "SELECT") {
        const options = document.querySelectorAll("option");
        options.forEach((element,index) => {
            if (index > 0) {
                element.style.backgroundColor = "white";
                element.style.color = "#c6c6c6";
            }
        })
    }
}

//////////////