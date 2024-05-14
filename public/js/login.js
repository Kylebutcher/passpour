
// IF YOURE CHECKING THIS CODE OUT IGNORE IT LOL


document.getElementById('signUp').addEventListener('signUp', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const gender = document.getElementById('gender').value.trim();
    const region = document.getElementById('region').value.trim();
    
    if (firstName === '' || lastName === '' || email === ''|| password === ''|| gender === ''|| region === '') {
        alert('Please complete all fields in the form.');
        return; 
    };
    
    const signUp = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        gender: gender,
        region: region

    };
    saveData(signUp);
    
    document.getElementById('firtName').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('pasword').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('region').value = '';
    
    window.location.href= "homepage.html"
});