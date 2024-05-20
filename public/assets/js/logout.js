// const logout = async () => {
//   // e.preventDefault()
//   const response = await fetch('/api/users/logout', { //unsure about the routing here.
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (response.ok) {
//     document.location.replace('/');
//   } else {
//     alert('Failed to log you out.');
//   }
// };

// // sessionStorage.setItem('activeSession', 'false');
// document.querySelector('#logout').addEventListener('click', logout);

function logout(){
  document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

window.location.href = "login.html";
}