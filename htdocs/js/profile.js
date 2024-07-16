//health bars
function updateHealth(newHealth) {
    const healthBar = document.querySelector('.health');
    healthBar.style.width = newHealth + '%';
    healthBar.textContent = newHealth + '%';
}

//experience bars
function updateExperience(newExpereince) {
    const healthBar = document.querySelector('.Experience');
    healthBar.style.width = newExpereince + '%';
    healthBar.textContent = newExpereince + '%';
}

//change profile pic functionality
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.selectable-image');
    const selectedImg = document.getElementById('selectedImg');

    images.forEach(img => img.addEventListener('click', function() {
        selectedImg.src = this.src;
        selectedImg.alt = this.alt;
        toggleGallery(); // Close the gallery after selecting an image
    }));
});

function toggleGallery() {
    const galleryContainer = document.getElementById('imageGalleryContainer');
    const overlay = document.getElementById('overlay');
    if (galleryContainer.style.display === 'none' || galleryContainer.style.display === '') {
        galleryContainer.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        galleryContainer.style.display = 'none';
        overlay.style.display = 'none';
    }
}

//update name
function updateName() {
    const nameInput = document.getElementById('nameInput');
    const profileName = document.getElementById('profileName');
    profileName.textContent = nameInput.value;
}

//update user title
function updateTitle() {
    const titleInput = document.getElementById('titleInput');
    const titleName = document.getElementById('titleName');
    titleName.textContent = titleInput.value;
}