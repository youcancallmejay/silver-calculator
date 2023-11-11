

const coinMap = {
  quarter: {country: 'america', faceValue: .25, weight: 6.25, silverContent: .90},
  dime: {country: 'america', faceValue: .10, weight: 2.5, silverContent: .90},
  nickel: {country: 'america', faceValue: .05, weight: 5, silverContent: .35},
  franklin: {country: 'america', faceValue: .50, weight: 12.5, silverContent: .90 },
  kennedy40: {country: 'america', faceValue: .50, weight: 11.5, silverContent: .40},
  eisenhower: {country: 'america', faceValue: .50, weight: 24.59, silverContent: .40},
  peace: {country: 'america', faceValue: 1, weight: 26.73, silverContent: .90},
  morgan: {country: 'america', faceValue: 1, weight: 26.73, silverContent: .90},
  ase: {country: 'america', faceValue: 1, weight: 31.103, silverContent: .999},
};

let coinTotals = {}

function updateCoinValues(number){
  num = parseInt(number.value);
  if(isNaN(num)){
    num = 0;
  }
  coin_name = number.getAttribute("data-type");
  total_weight = document.getElementById(`${coin_name}TotalWeight`);
  silver_value = document.getElementById(`${coin_name}TotalSilver`);
  troy_value = document.getElementById(`${coin_name}TroyOunces`)
  melt_value = document.getElementById(`${coin_name}MeltValue`);
  face_value = document.getElementById(`${coin_name}FaceValue`);
  
  coinDict = coinMap[coin_name];
  spot_price = document.getElementById('silverPrice').value;

  actual_weight = (coinDict.weight * num);
  actual_silver = (coinDict.silverContent * actual_weight);  
  troy_ounces = (actual_silver/ 31.1035); //31.1035 represents 1 troy ounce in grams
  melt_dollar = (troy_ounces * spot_price); 
  fiat_value = coinDict.faceValue * num;

  // Update coinTotals for the specific coin type
  coinTotals[coin_name] =
  {
    totalWeight: actual_weight.toFixed(2), 
    troyWeight: troy_ounces.toFixed(4), 
    meltValue: melt_dollar.toFixed(2), 
    faceValue: fiat_value.toFixed(2)
  }

  
  total_weight.innerHTML = actual_weight.toFixed(2);
  silver_value.innerHTML = actual_silver.toFixed(2);
  troy_value.innerHTML = troy_ounces.toFixed(4);
  melt_value.innerHTML = melt_dollar.toFixed(2);
  face_value.innerHTML = fiat_value.toFixed(2);


  getTotals();
}

function getTotals(){
  let all_coins_melt_value = 0;
  let all_coins_face_value = 0;
  let all_coins_troy_ounces = 0;

  for (coinName in coinTotals){
    if(coinTotals.hasOwnProperty(coinName)){
      let coin = coinTotals[coinName];
      all_coins_melt_value += parseFloat(coin.meltValue);
      all_coins_face_value += parseFloat(coin.faceValue);
      all_coins_troy_ounces += parseFloat(coin.troyWeight);
    }
    final_melt_value = document.getElementById('totalMeltValue');
    final_melt_value.innerHTML = all_coins_melt_value.toFixed(2);

    final_face_value = document.getElementById('totalFaceValue');
    final_face_value.innerHTML = all_coins_face_value.toFixed(2);

    final_troy_oz = document.getElementById('totalTroyOz');
    final_troy_oz.innerHTML = all_coins_troy_ounces.toFixed(3);
  }


}


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
