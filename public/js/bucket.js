document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('bucketForm');
  const postContainer = document.getElementById('postContainer');

  function getRandomColor() {
    // Generate a random color in hexadecimal format
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  function displayPost(postContent) {
    const postIt = document.createElement('div');
    postIt.classList.add('post-it');
    postIt.style.backgroundColor = getRandomColor(); // Set background color dynamically
    postIt.innerHTML = `
      <p>Bottle Name: ${postContent.bottleName}</p>
      <p>Bottle Description: ${postContent.bottleDesc}</p>
      <button class="delete-btn" data-id="${postContent.id}">Delete</button>
    `;

    const deleteButton = postIt.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
      deletePost(postContent.id);
      postIt.remove(); // Remove the post-it note from the DOM
    });

    postContainer.appendChild(postIt);
  }

  function deletePost(id) {
    let post = JSON.parse(localStorage.getItem('post') || '[]');
    post = post.filter(postContent => postContent.id !== id);
    localStorage.setItem('post', JSON.stringify(post));
  }

  function renderPosts() {
    postContainer.innerHTML = '';
    const post = JSON.parse(localStorage.getItem('post') || '[]');
    post.forEach(displayPost);
  }

  function submitForm(event) {
    event.preventDefault();
    const bottleName = document.getElementById('bottleName').value;
    const bottleDesc = document.getElementById('bottleDesc').value.trim();

    const formContent = {
      id: Date.now(),
      bottleName: bottleName,
      bottleDesc: bottleDesc,
    };

    let post = JSON.parse(localStorage.getItem('post') || '[]');
    post.push(formContent);
    localStorage.setItem('post', JSON.stringify(post));

    document.getElementById('bottleName').value = '';
    document.getElementById('bottleDesc').value = '';

    displayPost(formContent);
  }

  if (form) {
    form.addEventListener('submit', submitForm);
  } else {
    console.error("Form element not found.");
  }

  renderPosts();
});


