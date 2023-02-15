const countryDataApi = `https://restcountries.com/v2/all`;
const mainContainer = document.querySelector("#main-desplazation");
const countriesContainer = document.querySelector("#countries-container");
fetch(countryDataApi)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
    data.forEach((country) => {
      let currencies = [];

      try {
        country.currencies.forEach((c) => {
          currencies.push(c.name);
        });
      } catch (error) {
        console.log(error);
      }

      let languages = [];
      country.languages.forEach((l) => {
        languages.push(l.name);
      });
      const cards = document.createElement(`div`);
      cards.classList.add(
        "auto-row",
        "card",
        "col-xl-4",
        "col-md-6",
        "col-sm-12",
        "justify-content-between",
        "align-items-center"
      );
      cards.innerHTML = `
      <h3 class="card-title"> ${country.name} </h3>
      <button type="button" id="showdetails${country.name}" class="btn btn-outline-primary"> Details </button>
      <div class="hidden text-center justify-content-between align-items-center flex-column" id="detailsection${country.name}">
        <img src="${country.flag}" alt="${country.name} template" class="card-img-top img-fluid py-3"/>
        <h4 class="card-text"> Capital : ${country.capital} </h4>
        <em class="card-text"> Currency : ${currencies} </em>
        <p class="card-text"> Languages : ${languages} </p>
        <p class="card-text"> Region : ${country.region}, ${country.subregion} </p>
        <p class="card-text"> Calling code : +${country.callingCodes} </p>
      </div>
      `;
      countriesContainer.appendChild(cards);
      const countriesDetailButton = document.getElementById(
        `showdetails${country.name}`
      );
      countriesDetailButton.addEventListener("click", () => {
        let showCountryDetail = document.getElementById(
          `detailsection${country.name}`
        );
        showCountryDetail.classList.toggle("show");
      });
    });
  });
