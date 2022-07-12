'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${new Intl.NumberFormat(
        'en-US'
      ).format(data.population)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>>${data.currencies[0].name}</p>
    </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
};

// const getCountry = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);
//     const html = `
// <article class="country">
// <img class="country__img" src="${data.flag}" />
// <div class="country__data">
//   <h3 class="country__name">${data.name}</h3>
//   <h4 class="country__region">${data.region}</h4>
//   <p class="country__row"><span>👫</span>${data.population}</p>
//   <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//   <p class="country__row"><span>💰</span>>${data.currencies[0].name}</p>
// </div>
// </article>
// `;

//     countriesContainer.insertAdjacentHTML('beforeend', html);

//     countriesContainer.style.opacity = '1';
//   });
// };

// getCountry('portugal');
// getCountry('france');
// getCountry('usa');

// ---------------------------------------------------------------------------------------

// const renderCountry = function (data, className = '') {
//   const html = `
//   <article class="country ${className}">
//   <img class="country__img" src="${data.flag}" />
//   <div class="country__data">
//     <h3 class="country__name">${data.name}</h3>
//     <h4 class="country__region">${data.region}</h4>
//     <p class="country__row"><span>👫</span>${new Intl.NumberFormat(
//       'en-US'
//     ).format(data.population)} people</p>
//     <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//     <p class="country__row"><span>💰</span>>${data.currencies[0].name}</p>
//   </div>
//   </article>
//   `;

//   countriesContainer.insertAdjacentHTML('beforeend', html);

//   countriesContainer.style.opacity = '1';
// };
// // AJAX CALL COUNTRY 1
// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/${country}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // RENDER COUNTRY 1
//     renderCountry(data);
//     const [neighbour] = data.borders;

//     if (!neighbour) return;

//     // GET NEIGHBOUR COUNTRY
//     const request2 = new XMLHttpRequest();
//     request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
//     request2.send();

//     request2.addEventListener('load', function () {
//       const dataNeighbour = JSON.parse(this.responseText);
//       console.log(dataNeighbour);
//       renderCountry(dataNeighbour, 'neighbour');
//     });
//   });
// };

// getCountryAndNeighbour('portugal');

// --------------------- FETCH ----------------

// const request = fetch('https://restcountries.com/v2/name/portugal');
// console.log(request);

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => renderError(`Oops something went wrong ${err.message}.`))
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', () => {
  getCountryData('holland');
  getCountryData('SDFGHJ');
});
