document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.selectable-image');
    const selectedImg = document.getElementById('selectedImg');
    const titleName = document.getElementById('titleName');
    const titleInput = document.getElementById('titleInput');

    images.forEach(img => img.addEventListener('click', function() {
        selectedImg.src = this.src;
        selectedImg.alt = this.alt;
        saveProfile();
        toggleGallery(); // Close the gallery after selecting an image
    }));

    loadProfile();

    function saveProfile() {
        const profileData = {
            name: titleName.textContent,
            imageUrl: selectedImg.src,
            experience: parseInt(document.getElementById('experienceBar').style.width),
            health: parseInt(document.querySelector('.health').style.width)
        };
        localStorage.setItem('profile', JSON.stringify(profileData));
    }

    function loadProfile() {
        const profileData = JSON.parse(localStorage.getItem('profile'));
        if (profileData) {
            titleName.textContent = profileData.name;
            selectedImg.src = profileData.imageUrl;
            updateExperience(profileData.experience);
            updateHealth(profileData.health);
        }
        updateExperience(localStorage.getItem('profileExperience') || 0);
    }

    function updateHealth(newHealth) {
        const healthBar = document.querySelector('.health');
        healthBar.style.width = newHealth + '%';
        healthBar.textContent = newHealth + '%';
    }

    function updateExperience(newExperience) {
        const experienceBar = document.getElementById('experienceBar');
        experienceBar.style.width = newExperience + '%';
        experienceBar.textContent = newExperience + '%';
    }

    function addExperience(points) {
        let currentExperience = parseInt(document.getElementById('experienceBar').style.width);
        currentExperience += points;
        if (currentExperience > 100) {
            currentExperience = 100; // Cap the experience at 100%
        }
        updateExperience(currentExperience);
        saveProfile();
    }

    window.completeQuest = function(points) {
        addExperience(points);
    }

    window.updateTitle = function() {
        titleName.textContent = titleInput.value;
        saveProfile();
    }

    window.updateName = function() {
        const nameInput = document.getElementById('nameInput');
        const profileName = document.getElementById('profileName');
        profileName.textContent = nameInput.value;
        saveProfile();
    }
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
