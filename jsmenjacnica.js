currencyOneElement=document.getElementById('currency-one')
currencyTwoElement=document.getElementById('currency-Two')
amountOne=document.getElementById('amountOne')
amountTwo=document.getElementById('amountTwo')
rates={
    'USD':1,
    'EUR':0.95,
    'rsd':111.66
}
calculate()
function calculate(){
    currencyOne=currencyOneElement.value
    currencyTwo=currencyTwoElement.value
    rate=rates[currencyTwo]/rates[currencyOne]
    amountTwo.value=(amountOne.value*rate).toFixed(2)
}
currencyOneElement.addEventListener('change',calculate)
amountOne.addEventListener('input',calculate)

currencyTwoElement.addEventListener('change',calculate)
amountTwo.addEventListener('input',calculate)