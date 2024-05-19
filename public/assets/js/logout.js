const logout = async () => {
  const response = await fetch('/api/user/logout', { //unsure about the routing here.
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log you out.');
  }
};

sessionStorage.setItem('activeSession', 'false');

document.querySelector('#logout').addEventListener('click', logout);