
const bottleCards = document.querySelector('#bottle-cards'); // Needs Attention

const cubbies = document.querySelectorAll('.cubbies')



function getParams(){
  const bottleEl = localStorage.getItem('whiskey_name');
  const wTypeEl = localStorage.getItem('whiskey_type');
  const orderEl = localStorage.getItem('order');
  const tasteNotesEl = localStorage.getItem('taste_notes');
  
  searchApi(bottleEl, orderEl, tasteNotesEl, wTypeEl);
  // resultsFor(bottleEl, orderEl, tasteNotesEl, wTypeEl);
}


function searchApi(){
  const api = '/api/explore';
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




function printBottle(bottleCard, i) {
  
  for (let i = 0; i < cubbies.length; i++) {
    console.log(cubbies[i]);
    
    const wnameEl = document.createElement('h3');
    wnameEl.textContent = bottleCard.name;
    
    // The Styleing of the wnameEl only
    wnameEl.setAttribute('style', 'font-size: 16px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')
    
    
    const wTypeEl = document.createElement('p');
    wTypeEl.textContent = bottleCard.whiskey_type;
    
    const orderEl = document.createElement('p');
    // orderEl.textContent = bottleCard.order;
    
    const tasteNotesEl = document.createElement('p');
    // tasteNotesEl.textContent = bottleCard.taste_notes;
    


    // The Styleing of the wType, orderEl, tasteNotesEl only
    orderEl.setAttribute('style', 'font-size: 12px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')

    wTypeEl.setAttribute('style', 'font-size: 12px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')

    tasteNotesEl.setAttribute('style', 'font-size: 12px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')

    
    
    const card = document.createElement('div');
    card.classList.add('col-3')
    
    // Styleing for the Card container
    card.setAttribute('style', 'line-height: .5rem; padding: 5px; text-shadow: black 0 0 .3rem;')
    
    card.appendChild(wnameEl) 
    card.appendChild(wTypeEl)
    // card.appendChild(orderEl)
    // card.textContent = 'hello';
    // card.appendChild(tasteNotesEl)
    
    cubbies.appendChild(card)
    
    // console.log(cubbies[0]);
  }
  printBottle("printbottle call line 88", 2);
}




// Modal Script
const submitBtn = $('#submitBtn');
const closeMdl = $('#formModal');

// Event listener for submitting task
submitBtn.on('click', function(){
  $(closeMdl).modal('toggle');
})






// getParams();
