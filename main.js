
let base = "RUB";
let convertTo = "USD";
let amount = 1;

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


const selections = document.querySelectorAll(".selection");
selections.forEach(element => {
    for (let i = 0; i < currrencyArray.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = currrencyArray[i];
        option.value = currrencyArray[i];
        element.append(option);
    }
})

////////////////////

async function initialRate() {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${base}&to=${convertTo}&amount=${amount}`);
    const data = await response.json();
    const output = document.querySelector("input[id='to']");
    output.value = data.result;
}
initialRate();
getRate();
////////////////////////// GETRATE func


async function getRate(event) {
    if (event != undefined) {
        if (event.currentTarget.classList.contains("currency-button-from")) {
            if (event.currentTarget.tagName === "SELECT") {
                base = event.currentTarget.value;
            } else {
                base = event.currentTarget.innerHTML;
            }  
        } 
    }

    // if (base === convertTo) {

    // }
    
    const response = await fetch(`https://api.exchangerate.host/convert?from=${base}&to=${convertTo}&amount=${amount}`);
    const data = await response.json();
    const output = document.querySelector("input[id='to']");

    // console.log(typeof data.result, data.result);
    output.value = data.result;
    //.toLocaleString("ru-RU").replace(',', '.') ;


    const baseRateResponse = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${convertTo}`);
    const rateData = await baseRateResponse.json();
    const rateFrom = document.querySelector("#rate-from");
    const rateTo = document.querySelector("#rate-to");


    rateFrom.innerHTML = `1 ${base} = ${rateData.rates[`${convertTo}`]} ${convertTo}`;
    rateTo.innerHTML = `1 ${convertTo} = ${1/+rateData.rates[`${convertTo}`]} ${base}`;


}



///////////////////// change color on left side buttons + add listeners

const currencyButtonsFrom = document.querySelectorAll(".currency-button-from");
currencyButtonsFrom.forEach(element => {
    element.addEventListener("click", changeStyleFrom);
    element.addEventListener("click", getRate);
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

////////////////////////// change color on right side buttons + add listeners

const currencyButtonsTo = document.querySelectorAll(".currency-button-to");
currencyButtonsTo.forEach(element => {
    element.addEventListener("click", changeStyleTo);
    element.addEventListener("click", setRate);
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

////////////// setRATE func
function setRate(event) {
    if (event.currentTarget.tagName === "SELECT") {
        convertTo = event.currentTarget.value;
    } else {
        convertTo = event.currentTarget.innerHTML;
    }
    getRate(event);
}

////////////// reacting on input

const inputFrom = document.querySelector("input");
inputFrom.addEventListener("keyup", setAmount);
function setAmount() {
    amount = inputFrom.value;
    getRate(); 
}

