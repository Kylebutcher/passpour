document.addEventListener('DOMContentLoaded', () => {
    const addPicBtn = document.getElementById('add-pic-btn');
    const fileInput = document.getElementById('file-input');
    const profilePic = document.getElementById('profile-pic');
    const deleteBtn = document.getElementById('delete-btn');

    // Load profile picture from local storage if available
    const storedPic = localStorage.getItem('profilePic');
    if (storedPic) {
        profilePic.src = storedPic;
        profilePic.style.display = 'block';
        deleteBtn.style.display = 'block';
        addPicBtn.style.display = 'none';
    }

    addPicBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePic.src = e.target.result;
                profilePic.style.display = 'block';
                deleteBtn.style.display = 'block';
                addPicBtn.style.display = 'none';
                localStorage.setItem('profilePic', e.target.result);
                fileInput.value = ''; 
            };
            reader.readAsDataURL(file);
        }
    });

    deleteBtn.addEventListener('click', () => {
        profilePic.src = '';
        profilePic.style.display = 'none';
        deleteBtn.style.display = 'none';
        addPicBtn.style.display = 'block';
        localStorage.removeItem('profilePic');
    });
});
function displayPost() {
    let post = JSON.parse(localStorage.getItem('post')) || [];
    const divContainerElement = $('<div class="bucket-container" style="display: flex; flex-wrap: wrap;">');

    // Define an array of colors
    const colors = ['#D07725', '#F0ba34', '#451e05', '#ff8d26', '#d5dbe9'];

    // Limit the number of items to display to 5
    const limit = 5;

    for (let i = 0; i < post.length && i < limit; i++) {
        const item = post[i];
        const color = colors[i % colors.length];
        
        const itemContainer = $(`<div class="bucket-item" style="border: 2px solid black; padding:10px; margin-bottom: 10px; background-color: ${color};">`);
        const rowDivElement = $('<div class="row text-left border">');
        const firstRowDivElement = $('<div class="row">');
        const titleDivElement = $(`<div class="col-12 mb-3" style="font-size: 20px; font-weight:bold">Bottle Name: ${item.bottleName}</div>`);
        
        firstRowDivElement.append(titleDivElement);
        rowDivElement.append(firstRowDivElement);
        itemContainer.append(rowDivElement);
        divContainerElement.append(itemContainer); 
    }

    // Append the container to the specific '.bucket-container' div
    $('.bucket-container').append(divContainerElement);
}

// Ensure jQuery is loaded before calling the function
$(document).ready(displayPost);


