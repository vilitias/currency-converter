
let base = "RUB";
let convertTo = "USD";
let amount = 1;

const selections = document.querySelectorAll(".selection");
const rateFrom = document.querySelector("#rate-from");
const rateTo = document.querySelector("#rate-to");
const output = document.querySelector("input[id='to']");
const inputFrom = document.querySelector("input");
const loadingBlock = document.querySelector(".loading-block");
const reverseArrow = document.querySelector("#convert-arrows");

///////////// filling the select options

const currrencyArray = [ 
    "CHF",
    "NOK",
    "CAD",
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



selections.forEach(element => {
    for (let i = 0; i < currrencyArray.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = currrencyArray[i];
        option.value = currrencyArray[i];
        element.append(option);
    }
})


//////////// REVERSE ARROW 


reverseArrow.addEventListener("click", swapCurrencies);

function swapCurrencies() {
    // свопнули  сами значения base и convertTo
    let intermediary = base;
    base = convertTo;
    convertTo = intermediary;
    
    currencyButtonsFrom.forEach(element => {
        // снять выделения с выбора валют
        element.classList.remove("clicked");
        // выделить нужную кнопку
        if (element.innerHTML === base) {
            element.click(); 
        }
        // выделить нужный селект?
        if (element.tagName === "SELECT") {
            // console.log(element);
            // element.classList.add("clicked");
            const options = element.children;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === base) {
                    // options[i].click();
                    options[i].parentElement.value = options[i].value;
                    options[i].parentElement.click();
                }
            }
        }
    })

    currencyButtonsTo.forEach(element => {
        element.classList.remove("clicked");
        if (element.innerHTML === convertTo) {
            element.click(); 
        }
        if (element.tagName === "SELECT") {
            // console.log(element);
            // element.classList.add("clicked");
            const options = element.children;
            for (let i = 0; i < options.length; i++) {
                if (options[i].value === convertTo) {
                    options[i].parentElement.value = options[i].value;
                    options[i].parentElement.click();
                }
            }
        }
    })

    
    getRate();
}

///////////  INITIAL STATE

async function initialRate() {

    const timer = setTimeout(() => {
        loadingBlock.style.display = "flex";
    }, 500);
    const response = await fetch(`https://api.exchangerate.host/convert?from=${base}&to=${convertTo}&amount=${amount}`);
    const data = await response.json();

    const output = document.querySelector("input[id='to']");
    output.value = data.result;

    clearTimeout(timer);
    loadingBlock.style.display = "none";

    
}
initialRate();
getRate().catch(err => console.log(err));


////////////////////////// GETRATE func



async function getRate(event) {

    
    if (event != undefined) {
        if (event.currentTarget.classList.contains("currency-button-from")) {
            if (event.currentTarget.tagName === "SELECT") {// !
                // const options = event.currentTarget.children;
                // for (let i = 0; i < options.length; i++) {
                //     base = options[i].value;
                // }
                base = event.currentTarget.value;
            } else {
                base = event.currentTarget.innerHTML;
            }  
        } 
    }
    

    if (base === convertTo) {
        rateFrom.innerHTML = `1 ${base} = 1 ${base}`;
        rateTo.innerHTML = `1 ${base} = 1 ${base}`;
        output.value = inputFrom.value;

    } else {
        try {
            const timer = setTimeout(() => {
                loadingBlock.style.display = "flex";
            }, 500);

            const response = await fetch(`https://api.exchangerate.host/convert?from=${base}&to=${convertTo}&amount=${amount}`);
            const data = await response.json();

            output.value = +data.result.toFixed(4);
    
            const baseRateResponse = await fetch(`https://api.exchangerate.host/latest?base=${base}&symbols=${convertTo}`);
            const rateData = await baseRateResponse.json();

            rateFrom.innerHTML = `1 ${base} = ${rateData.rates[`${convertTo}`].toFixed(4)} ${convertTo}`;
            const reverseRate = 1/+rateData.rates[convertTo];
            rateTo.innerHTML = `1 ${convertTo} = ${reverseRate.toFixed(4)} ${base}`;

            clearTimeout(timer);
            loadingBlock.style.display = "none";
        } catch (error){
            throw Error(error);
        }
        
        
    }
    

}



///////////////////// change color on left side buttons + add listeners

const currencyButtonsFrom = document.querySelectorAll(".currency-button-from");
currencyButtonsFrom.forEach((element, index) => {

    element.addEventListener("click", changeStyleFrom);
    element.addEventListener("click", getRate);
})

function changeStyleFrom(event) {
    currencyButtonsFrom.forEach(element => {
        element.classList.remove("clicked");
    })
    event.currentTarget.classList.toggle("clicked");
    if (event.currentTarget.tagName === "SELECT") {

        const options = event.currentTarget.children;
        for (let i = 0; i < options.length; i++) {
            options[i].style.backgroundColor = "white";
            options[i].style.color = "#c6c6c6";
        }
        // const options = document.querySelectorAll("option"); // берет вообще все опшены, нехорошо? надо брать только детей
        // options.forEach((element,index) => {
        //     if (index > 0) {
        //         element.style.backgroundColor = "white";
        //         element.style.color = "#c6c6c6";
        //     }
        // })
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

        const options = event.currentTarget.children;
        for (let i = 0; i < options.length; i++) {
            options[i].style.backgroundColor = "white";
            options[i].style.color = "#c6c6c6";
        }
        // const options = document.querySelectorAll("option"); // берет вообще все опшены, нехорошо? надо брать только детей
        // options.forEach((element,index) => {
        //     if (index > 0) {
        //         element.style.backgroundColor = "white";
        //         element.style.color = "#c6c6c6";
        //     }
        // })
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


inputFrom.addEventListener("keyup", setAmount);
function setAmount() {
    amount = inputFrom.value;
    getRate(); 
}

