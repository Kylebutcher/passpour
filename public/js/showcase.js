const formSel = document.querySelector('.brickwall'); // Needs Attention
const resultTextEl = document.querySelector('#result-text'); // Needs Attention
const bottleCards = document.querySelector('#bottle-cards'); // Needs Attention
const formResults = document.querySelector('.form-results-title'); // Needs Attention


// The 18 image cards
const bottle0 = document.querySelector('.cubby-0');
const bottle1 = document.querySelector('.cubby-1');
const bottle2 = document.querySelector('.cubby-2');
const bottle3 = document.querySelector('.cubby-3');
const bottle4 = document.querySelector('.cubby-4');
const bottle5 = document.querySelector('.cubby-5');
const bottle6 = document.querySelector('.cubby-6');
const bottle7 = document.querySelector('.cubby-7');
const bottle8 = document.querySelector('.cubby-8');
const bottle9 = document.querySelector('.cubby-9');
const bottle10 = document.querySelector('.cubby-10');
const bottle11 = document.querySelector('.cubby-11');
const bottle12 = document.querySelector('.cubby-12');
const bottle13 = document.querySelector('.cubby-13');
const bottle14 = document.querySelector('.cubby-14');
const bottle15 = document.querySelector('.cubby-15');
const bottle16 = document.querySelector('.cubby-16');
const bottle17 = document.querySelector('.cubby-17');

//This one does not belong here yet
const cubbies = document.querySelector('.cubbies')


function getParams(){
  const bottleEl = localStorage.getItem('whiskey_name');
  const wTypeEl = localStorage.getItem('whiskey_type');
  const orderEl = localStorage.getItem('order');
  const tasteNotesEl = localStorage.getItem('taste_notes');
  
  searchApi(bottleEl, orderEl, tasteNotesEl, wTypeEl);
  // resultsFor(bottleEl, orderEl, tasteNotesEl, wTypeEl);
}


function searchApi(citySearch, postalSearch, typeSearch){
  const requestUrl = `https://api.openbrewerydb.org/v1/breweries?by_city=${citySearch}&by_postal=${postalSearch}&by_type=${typeSearch}&per_page=8`;
  fetch(requestUrl)
  .then(function (response){
    // if( !response.ok ) throw new Error("Bad Request");
    return response.json();
  })
  .then(function(data){
    printResults(data);
  })
  .catch(function(error){
    console.log(error)
    alert("You're Drunk Dumbass, Try Again");
  })
};

function printResults(data){
  data.forEach((bottleCard, i) => {
    printBottle(bottleCard, i);
    console.log("Print Results Function, line 55");
  });
}


function printBottle(bottleCard, i) {
  if (!bottleCard || !bottleCard.whiskey_name || !bottleCard.whiskey_type || !bottleCard.order || !bottleCard.taste_notes) {
    return;
  }

  const wnameEl = document.createElement('h3');
  wnameEl.textContent = bottleCard.name;
  wnameEl.setAttribute('style', 'font-size: 16px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')
  
  const wTypeEl = document.createElement('p');
  wTypeEl.textContent = bottleCard.whiskey_type;

  const orderEl = document.createElement('p');
  orderEl.textContent = bottleCard.order;

  const tasteNotesEl = document.createElement('p');
  tasteNotesEl.textContent = bottleCard.taste_notes;

  const card = document.createElement('div');
  card.setAttribute('style', 'line-height: .5rem; padding: 5px; text-shadow: black 0 0 .3rem;')
  card.appendChild(wnameEl) 
  card.appendChild(wTypeEl)
  card.appendChild(tasteNotesEl)
  card.appendChild(tasteNotesEl)

}


function formSubmit(event) {
  event.preventDefault();

  const citySearch = document.querySelector('#cname').value;
  const postalSearch = document.querySelector('#zipcode').value;
  const typeSearch = document.querySelector('#type').value;

  if (!typeSearch) {
    console.error('You need to select a type of brewery!');
    return;
  } document.location.assign('showcase.html');
    localStorage.setItem('Name', whiskey_name);
    localStorage.setItem('Type', whiskey_type);
    localStorage.setItem('Order', order);
    localStorage.setItem('Taste Notes', taste_notes);
};

formSel.addEventListener('submit', formSubmit);


getParams();


function getParams(){
  const bottleEl = localStorage.getItem('whiskey_name');
  const wTypeEl = localStorage.getItem('whiskey_type');
  const orderEl = localStorage.getItem('order');
  const tasteNotesEl = localStorage.getItem('taste_notes');