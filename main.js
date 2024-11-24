const suggestionApiKey = "AIzaSyCSmXlBrbDs6apjS5GrDYaTdcxLT1BbbB0";
const suggestionApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=40.714728,-73.998672&radius=500&key=${suggestionApiKey}`;

console.log(suggestionApiUrl);

function autoSuggestion(inputTag) {
  const autoComplete = new google.maps.places.Autocomplete(inputTag);
}
autoSuggestion(destination);
