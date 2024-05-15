const bottleName = document.getElementById("bottleName");
const bottleDesc = document.getElementById("bottleDesc");
const submit = document.getElementById("submit");
const form = document.getElementById("form");
const formContent = (localStorage.getItem('formContent'));
const post = JSON.parse(formContent) || []

function submitForm(event) {
  event.preventDefault();
  const formContent = {
    bottleName: bottleName.value,
    bottleDesc: bottleDesc.value.trim(),
  }
  post.push(formContent);
  localStorage.setItem('formContent', JSON.stringify(post));
  document.location.href = "bucketList.html";
}

form.addEventListener('submit', submitForm);

const myList = document.getElementById("myList")

function readPost() {

  for (let i = 0; i < post.length; i++) {
    const div = document.createElement("div")
    div.classList.add("post")
    let html = `
  <h2>${post[i].bottleName}</h2>
  <p>${post[i].bottleDesc}</p>
  `
    div.innerHTML = html
    myList.appendChild(div)
  }
};

readPost();