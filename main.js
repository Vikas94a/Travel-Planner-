const suggestionApiKey = "XYZ";
const suggestionApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=40.714728,-73.998672&radius=500&key=${suggestionApiKey}`;

// Google Api for autofill
function autoSuggestion(inputTag) {
  const autoComplete = new google.maps.places.Autocomplete(inputTag);
}
autoSuggestion(destination);

// auto currencyConverter api
async function currencyConverter(targetCurrency, amount, currenciesContainer) {
  const baseCurrency = "nok";
  const converterURL = `https://latest.currency-api.pages.dev/v1/currencies/${baseCurrency}.json`;
  try {
    const response = await fetch(converterURL);
    const data = await response.json();

    // Access the target currency rate
    const conversionRate = data[baseCurrency][targetCurrency];
    if (data[baseCurrency] && conversionRate) {
      const convertedAmount = amount * conversionRate;
      const currencyConversionResult = document.createElement("p");
      currencyConversionResult.textContent = `Total cost:-${convertedAmount.toFixed()} ${targetCurrency.toUpperCase()}`;
      currenciesContainer.append(currencyConversionResult);
    }
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
}
