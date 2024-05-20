
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

console.log("right above the printResults fucntion")

function printResults(data){
  data.forEach((bottleCard, i) => {
    printBottle(bottleCard, i);
    console.log("Print Results Function, line 38");
  });
}

console.log("right outside of printResults function line 44", cubbies[0])


function printBottle(bottleCard, i) {
  console.log("the print bottle function line 46")

  for (let j = 0; j < cubbies.length; j++) {
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
    
    console.log(cubbies[0]);
    console.log("after the print bottle function line 95. ")
  }
  // printBottle("printbottle call line 88", 2);
  console.log("after the print bottle function line 98. just in side the function ")

}

console.log("after the print bottle function line 99")



// Modal Script
const submitBtn = $('#submitBtn');
const closeMdl = $('#formModal');

// Event listener for submitting task
submitBtn.on('click', function(){
  $(closeMdl).modal('toggle');
})






// getParams();
