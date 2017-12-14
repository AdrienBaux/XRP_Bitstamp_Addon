var bitstampUrl = "https://www.bitstamp.net/api/v2/ticker/xrpusd/";
var bitstampUrlEur = "https://www.bitstamp.net/api/v2/ticker/xrpeur/";

var isFirefox = /firefox/i.test(navigator.userAgent);

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); //synchronous request
    xmlHttp.send(null);
    if(xmlHttp.status == "200")
      return JSON.parse(xmlHttp.responseText).last;
    return false;
}

/*
  Bouton Listener
*/
document.getElementById("refeshBtnXRP").addEventListener("click", btnclicked);
function btnclicked() {
  price = httpGet(bitstampUrl);
  priceEur = httpGet(bitstampUrlEur);
  if(price != false && priceEur != false) {
    document.getElementById("curXrpPrice").innerHTML = price;
    document.getElementById("curXrpPriceEur").innerHTML = priceEur;
    saveOptions(price, priceEur);
  }
}


/*
  Local var
*/

document.addEventListener("DOMContentLoaded", restoreOptions);
function restoreOptions() {

  function setCurrentChoice(result) {
    drawResult(result);
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  if(!isFirefox)
    {
      chrome.storage.local.get(['price', 'priceEur'], function(result) { drawResult(result); });
    }
    else
    {
    var getting = browser.storage.local.get();
    getting.then(setCurrentChoice, onError);
  }
}
function saveOptions(price, priceEur) {
  if(!isFirefox)
  {
    chrome.storage.local.set({
      price: price,
      priceEur: priceEur
      });
  }
  else
  {
    browser.storage.local.set({
      price: price,
      priceEur: priceEur
      });
  }
}

function drawResult(result)
{
  if(result.price != undefined)
    document.getElementById("curXrpPrice").innerHTML = result.price;
  if(result.priceEur != undefined )
    document.getElementById("curXrpPriceEur").innerHTML = result.priceEur;
}