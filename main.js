
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

////////////////////////// GETRATE func


async function getRate(event) {
    if (event.currentTarget.classList.contains("currency-button-from")) {
        if (event.currentTarget.tagName === "SELECT") {
            base = event.currentTarget.value;
        } else {
            base = event.currentTarget.innerHTML;
        }  
    } 
    const response = await fetch(`https://api.exchangerate.host/convert?from=${base}&to=${convertTo}&amount=${amount}`);
    const data = await response.json();
    const output = document.querySelector("input[id='to']");
    output.value = data.result;

    const baseRateResponse = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${currrencyArray} `);
    const rateData = await baseRateResponse.json();
    const rateFrom = document.querySelector("#rate-from");
    rateFrom.innerHTML = `1 ${base} = ${rateData.rates[`${convertTo}`]} ${convertTo}`
    /////// fetch with first url version to get rates for base - need to add buttons' currency values to array or smth else

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

const input = document.querySelector("input");
input.addEventListener("keyup", setAmount);
function setAmount() {
    amount = input.value;
    // getRate();
}

