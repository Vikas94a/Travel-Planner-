const suggestionApiKey = "XYZ";
const suggestionApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=40.714728,-73.998672&radius=500&key=${suggestionApiKey}`;

console.log(suggestionApiUrl);

function autoSuggestion(inputTag) {
  const autoComplete = new google.maps.places.Autocomplete(inputTag);
}
autoSuggestion(destination);

async function currencyConverter(Nok) {
  const converterURL = `https://latest.currency-api.pages.dev/v1/currencies/nok.json`;
}

// flag api https://flagsapi.com/BE/flat/64.png
// currency api https://latest.currency-api.pages.dev/v1/currencies/nok.json

// https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json
