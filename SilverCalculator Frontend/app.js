
//check img IDs 
//check eisenhower total weight
//add total melt value, total face value, total silver content
//move melt value and premium percent nav to right, leave logo on left
//fix nav bar fonts
//uniform titles on each page

const weightMap = {
  quarter: {country: 'america', faceValue: .25, weight: 6.25, silverContent: .90},
  dime: {country: 'america', faceValue: .10, weight: 2.5, silverContent: .90},
  nickel: {country: 'america', faceValue: .05, weight: 5, silverContent: .35},
  olympic: {country: 'mexico', faceValue: 0, weight: 22.5, silverContent: .72},
  franklin: {country: 'america', faceValue: .50, weight: 12.5, silverContent: .90 },
  morales: {country: 'mexico', faceValue: 0, weight: 16, silverContent: .10},
  kennedy40: {country: 'america', faceValue: .50, weight: 11.5, silverContent: .40},
  eisenhower: {country: 'america', faceValue: .50, weight: 24.59, silverContent: .40},
  peace: {country: 'america', faceValue: 1, weight: 26.73, silverContent: .90},
  morgan: {country: 'america', faceValue: 1, weight: 26.73, silverContent: .90},
  ase: {country: 'america', faceValue: 1, weight: 31.103, silverContent: .999},
  libertad: {country: 'mexico', faceValue: 0, weight: 31.1, silverContent: .999 }
};


const coinType = ['quarter', 'dime', 'nickel', 'olympic', 'franklin', 'morales', 'kennedy40', 'eisenhower', 'peace', 'morgan', 'ase', 'libertad']


function resetInputs(){
  
  coinType.forEach((coinType) => {
             
    usrInput = document.getElementById(`${coinType}Num`)
    usrValue = Number(usrInput.value)
     if(usrValue > 0){
       usrInput.value = 0
     }else{
      console.log("Something failed")
     }

     calculateSilverWeight() 
  });

}



function filterCoins() {

  const country = document.getElementById("country-selector").value;
  const coins = coinType
  
  console.log("Country selected: "+ country)
  console.log("Coins array: " + coins)

  for (let i = 0; i < coins.length; i++) {
    //loop through and select different coin from coinType array
    const coin = coins[i];
    console.log("Loop coin: " + coin)
    //once coin is selected, now use it to target its weightMap
    const coinCountry = weightMap[coin].country
    console.log("Coin country: " + coinCountry)
    div = document.getElementById(`${coin}`)
    console.log("Div = " + div)

      
    if (coinCountry === country || country === "all") {
      div.style.display = "block";
    } else {
      div.style.display = "none";
    }
  }
}


function calculatePremium(){


const totalWeight = document.getElementById('totalCoinWeight').value
const coinPrice = document.getElementById('totalCoinCost').value
const spotPrice = document.getElementById('silverPrice').value
const purity = ((document.getElementById('totalCoinPurity').value) / 100)
const troyOunce = 31.1035

const actualSilverContent = totalWeight * purity
const silverContentValue = (actualSilverContent * spotPrice ) / troyOunce 
const premiumPaid = coinPrice - silverContentValue

const premiumPercent = (premiumPaid / silverContentValue) * 100

document.getElementById('premiumPercent').innerHTML= premiumPercent.toFixed(2) + "%"
  
}

function calculateSilverWeight() {       

  var totalMeltValue = 0 
  var totalFaceValue = 0
  var totalSilverContent = 0

        coinType.forEach((coinType) => {
            console.log(coinType)
            const spotPrice = document.getElementById(`silverPrice`).value
            const coinInput = document.getElementById(`${coinType}Num`)
            const numCoins = Number(coinInput.value)
            const weight = numCoins * weightMap[coinType].weight
            const silverGrams = weight * weightMap[coinType].silverContent
            const troyOunces = (silverGrams / 31.1035) 
            const meltValue = ((silverGrams * spotPrice) / 31.1035)
            const faceValue = (numCoins * weightMap[coinType].faceValue)
            console.log(faceValue)

            totalMeltValue += meltValue
            totalFaceValue += faceValue
            totalSilverContent += troyOunces

            if(numCoins > 0){
            document.getElementById(`${coinType}TotalWeight`).innerHTML = weight.toFixed(2);
            document.getElementById(`${coinType}TotalSilver`).innerHTML = silverGrams.toFixed(2);
            document.getElementById(`${coinType}TroyOunces`).innerHTML = troyOunces.toFixed(3);
            document.getElementById(`${coinType}MeltValue`).innerHTML = meltValue.toFixed(2);
            document.getElementById(`${coinType}FaceValue`).innerHTML = faceValue.toFixed(2);
            } else if(numCoins === 0){
            document.getElementById(`${coinType}TotalWeight`).innerHTML = 0;
            document.getElementById(`${coinType}TotalSilver`).innerHTML = 0;
            document.getElementById(`${coinType}TroyOunces`).innerHTML = 0;
            document.getElementById(`${coinType}MeltValue`).innerHTML = 0;
            document.getElementById(`${coinType}FaceValue`).innerHTML = 0;
            }
            //else{
            //   alert("You entered an invalid number.")
            // }    

            document.getElementById(`totalMeltValue`).innerHTML = totalMeltValue.toFixed(2);
            document.getElementById(`totalFaceValue`).innerHTML = totalFaceValue.toFixed(2);
            document.getElementById(`totalSilverContent`).innerHTML = totalSilverContent.toFixed(2);
         });

  
   
}