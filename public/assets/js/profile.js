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
