const signInForm = document.querySelector("#signIn")
const signUpForm = document.querySelector('#signUp')


async function signUpHandler(e) {
  e.preventDefault()

  const first_name = document.querySelector('#firstName').value
  const last_name = document.querySelector('#lastName').value
  const email = document.querySelector('#email').value
  const password = document.querySelector('#password').value
  const region = document.querySelector('#region').value

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ first_name, last_name, email, password, region }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (response.ok) {
    document.location.replace('/profile')
  }
}

async function signInHandler(e) {
  e.preventDefault()

  const email = document.querySelector('#userEmail').value
  const password = document.querySelector('#userPassword').value

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
console.log(response)
  if (response.ok) {
    document.location.replace('/profile')
  } else {
    alert('error')
  }
}

signUpForm.addEventListener('submit', signUpHandler)

signInForm.addEventListener('submit', signInHandler)