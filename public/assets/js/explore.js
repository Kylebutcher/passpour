// const cubbies = document.querySelectorAll('.cubbies')


// ===== These are now in the modal
// function getParams(){
//   const bottleEl = localStorage.getItem('whiskey_name');
//   const wTypeEl = localStorage.getItem('whiskey_type');
//   const orderEl = localStorage.getItem('order');
//   const tasteNotesEl = localStorage.getItem('taste_notes');
  
//   searchApi(bottleEl, orderEl, tasteNotesEl, wTypeEl);
//   // resultsFor(bottleEl, orderEl, tasteNotesEl, wTypeEl);
// }


// function searchApi(){
//   const api = '/api/explore';
//   fetch(api)
//   .then(function (response){
//     // if( !response.ok ) throw new Error("Bad Request");
//     return response.json();
//   })
//   .then(function(data){
//     printResults(data);
//   })
//   .catch(function(error){
//     console.log(error)
//     alert("You missed your shot, at taking a shot");
//   })
// };

// console.log("right above the printResults fucntion")




// function printResults(data){
//   data.forEach((bottleCard, i) => {
//     printBottle(bottleCard, i);
//     console.log("Print Results Function, line 38");
//   });
// }



// ===== Has been moved into Handle Bars, this area was used for testing below: 

// function printBottle() {
//   console.log("the print bottle function line 46")

//   for (let i = 0; i < cubbies.length; i++) {
//     console.log(cubbies[i]);
    
//     const wnameEl = document.createElement('h3');
//     wnameEl.textContent = bottleCard.name;
    
//     // The Styleing of the wnameEl only
//     wnameEl.setAttribute('style', 'font-size: 16px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')
    
    
//     const wTypeEl = document.createElement('p');
//     wTypeEl.textContent = bottleCard.whiskey_type;
    
//     const orderEl = document.createElement('p');
//     // orderEl.textContent = bottleCard.order;
    
//     const tasteNotesEl = document.createElement('p');
//     // tasteNotesEl.textContent = bottleCard.taste_notes;
    


//     // The Styleing of the wType, orderEl, tasteNotesEl only
//     orderEl.setAttribute('style', 'font-size: 12px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')

//     wTypeEl.setAttribute('style', 'font-size: 12px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')

//     tasteNotesEl.setAttribute('style', 'font-size: 12px; font-weight: bold; text-shadow: black 0 0 .3rem; color: var(--whiskey-orange)')

    
    
//     const card = document.createElement('div');
//     card.classList.add('col-3')
    
//     // Styleing for the Card container
//     card.setAttribute('style', 'line-height: .5rem; padding: 5px; text-shadow: black 0 0 .3rem;')
    
//     card.appendChild(wnameEl) 
//     card.appendChild(wTypeEl)
//     // card.appendChild(orderEl)
//     // card.textContent = 'hello';
//     // card.appendChild(tasteNotesEl)
    
//     cubbies.appendChild(card)
    
//     console.log(cubbies[0]);
//     console.log("after the print bottle function line 95. ")
//   }
//   printBottle();
//   console.log("after the print bottle function line 98. just in side the function ")

// }

// console.log("after the print bottle function line 99")
// getParams();




// Modal Script
const submitBtn = $('#submitBtn');
const closeMdl = $('#formModal');

// Event listener for submitting bottle notes to showcase / FavoriteBottle model
submitBtn.on('click', function(){
  $(closeMdl).modal('toggle');
})

const addNotes = document.querySelector('.add-notes');
const dontAddNotes = document.querySelector('.add-as-is');
// const bottleName = document.querySelectorAll('h2')
const showcase = document.querySelectorAll('.showcase');
let bottle_id; 

for (let i = 0; i < showcase.length; i++) {
  showcase[i].addEventListener('click', function (e) {
    bottle_id = e.target.getAttribute('id')
    console.log('This is the bottle id', bottle_id)

    // return bottle_id;


    // noNotes(bottle_id) {
    //   const response = await fetch('/api/explore', {
    //     method: 'POST',
    //     body: JSON.stringify({ bottle_id }),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   })
    // };
  })
}

// function noNotes (bottle_id) {
  // console.log("This is being called in line 131 in showcase for-loop", bottle_id)
// }



dontAddNotes.addEventListener('click', async function(e) {
  const response = await fetch('/api/showcase', {
  method: 'POST',
  body: JSON.stringify({ bottle_id }),
  headers: {
      'Content-Type': 'application/json'
    } 
  });

  if (response.ok) {
    document.querySelector(".confirmation").textContent = "Thank you, your bottle has been added to your Showcase!"
  } else {
    document.querySelector(".confirmation").textContent = "Sorry there was an error, please try again in a few minutes."
  }

  // console.log('is it working?', bottle_id)
})


addNotes.addEventListener('click', async function(e) {
  e.preventDefault();

  const order = document.querySelector(".order-form");
  const value = order.value;
  const text = order.options[order.selectedIndex].text;
  const taste = document.getElementById('tasteNotes').value;

  // console.log('text from the order selector', text);
  // console.log('text from the Taste notes', taste);

  const response = await fetch('/api/showcase', {
  method: 'POST',
  body: JSON.stringify({ taste, text, bottle_id }),
  headers: {
      'Content-Type': 'application/json'
    } 
  });

  if (response.ok) {
    document.querySelector(".confirmation").textContent = "Thank you, your bottle has been added to your Showcase!"
    // console.log(response)
  } else {
    document.querySelector(".confirmation").textContent = "Sorry there was an error, please try again in a few minutes."
    // console.log(response)
  }

  // console.log('is it working?', bottle_id)
})



