const formSel = document.querySelector('.brickwall'); // Needs Attention
const resultTextEl = document.querySelector('#result-text'); // Needs Attention
const bottleCards = document.querySelector('#bottle-cards'); // Needs Attention
const formResults = document.querySelector('.form-results-title'); // Needs Attention


const cubbies = document.querySelector('.cubbies')






function getParams(){
  const bottleEl = localStorage.getItem('whiskey_name');
  const wTypeEl = localStorage.getItem('whiskey_type');
  const orderEl = localStorage.getItem('order');
  const tasteNotesEl = localStorage.getItem('taste_notes');
  
  searchApi(bottleEl, orderEl, tasteNotesEl, wTypeEl);
  // resultsFor(bottleEl, orderEl, tasteNotesEl, wTypeEl);
}


function searchApi(){
  const api = '/api/favorites';
  fetch(api)
  .then(function (response){
    // if( !response.ok ) throw new Error("Bad Request");
    return response.json();
  })
  .then(function(data){
    printResults(data);
  })
  .catch(function(error){
    console.log(error)
    alert("You missed your shot, at taking a shot");
  })
};

function printResults(data){
  data.forEach((bottleCard, i) => {
    printBottle(bottleCard, i);
    console.log("Print Results Function, line 55");
  });
}

printBottle("printbottle call line 48", 2);

function printBottle(bottleCard, i) {
  // if (!bottleCard || !bottleCard.whiskey_name || !bottleCard.whiskey_type || !bottleCard.order || !bottleCard.taste_notes) {
  //   return;
  // }
  for (let i = 0; i < cubbies.length; i++) {
    console.log(cubbies[i]);
  
  
    const wnameEl = document.createElement('h3');
    wnameEl.textContent = bottleCard.name;
    // wnameEl.setAttribute('style', 'font-size: 16px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')
    
    // const wTypeEl = document.createElement('p');
    // wTypeEl.textContent = bottleCard.whiskey_type;
    
    // const orderEl = document.createElement('p');
    // orderEl.textContent = bottleCard.order;
    
    // const tasteNotesEl = document.createElement('p');
    // tasteNotesEl.textContent = bottleCard.taste_notes;
    
    const card = document.createElement('div');
    card.classList.add('col-3')
    // card.setAttribute('style', 'line-height: .5rem; padding: 5px; text-shadow: black 0 0 .3rem;')
    card.appendChild(wnameEl) 
    // card.appendChild(wTypeEl)
    // card.appendChild(orderEl)
    // card.textContent = 'hello';
    // card.appendChild(tasteNotesEl)
  
    cubbies.appendChild(card)
    
    // console.log(cubbies[0]);
  }
}


// function formSubmit(event) {
//   event.preventDefault();

//   const wnameForm = document.querySelector('#cname').value;
//   const postalSearch = document.querySelector('#zipcode').value;
//   const typeSearch = document.querySelector('#type').value;

//   if (!typeSearch) {
//     console.error('You need to select a type of Whiskey!');
//     return;
//   } document.location.assign('showcase.html');
//     localStorage.setItem('Name', whiskey_name);
//     localStorage.setItem('Type', whiskey_type);
//     localStorage.setItem('Order', order);
//     localStorage.setItem('Taste Notes', taste_notes);
// };

// formSel.addEventListener('submit', formSubmit);


// getParams();
