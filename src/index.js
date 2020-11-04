const searchAlgoliaPlaces = (event) => {
    // we need to find the input
    const input = event.currentTarget;
    // we need to find the value inside the input
    const searchedCity = input.value;
    // we need to build a json to send data
    // why is the key query? (rethorical question)
    const sendData = { query: searchedCity };
    // Problem is: we can't send the whole object. 
    // We need to transform it into a string
    // const sendDataAsString = sendData.to_s
    const sendDataAsString = JSON.stringify(sendData)

    const url = "https://places-dsn.algolia.net/1/places/query";
    const options = {
        method: "POST",
        body: sendDataAsString
    }

    fetch(url, options)
      .then(response => response.json())
      .then((data) => {
        const cities = data.hits; // Look at local_names.default
        const ul = document.querySelector('ul#results');
        ul.innerHTML = '';

        cities.forEach((city) => {
            const cityName = city.locale_names.default[0];
            ul.insertAdjacentHTML('beforeend', `<li>${cityName}</li>`)
        });
      });
};
  
const input = document.querySelector("#search");
input.addEventListener("keyup", searchAlgoliaPlaces);