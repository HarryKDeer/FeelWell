import { getUserJson, changeUserContent } from "./database.js";

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
    checkHealth();

    function saveProfile() {
        const profileData = {
            name: titleName.textContent,
            imageUrl: selectedImg.src,
            experience: parseInt(document.getElementById('experienceBar').style.width),
            health: parseInt(document.querySelector('.health').style.width),
            lastOnline: new Date().toISOString() // Save the current time
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
            localStorage.setItem('lastOnline', profileData.lastOnline || new Date().toISOString()); // Load lastOnline
        }

        //Replace stuff with database stuff
        prom = getUserJson(localStorage.getItem("user"));
        (prom && prom.then(userJson =>{  
            updateExperience(userJson.score || 0);
            titleName.textContent = userJson.name;
        }))
    }

    function updateHealth(newHealth) {
        const healthBar = document.querySelector('.health');
        healthBar.style.width = newHealth + '%';
        healthBar.textContent = newHealth + '%';
    }

    function updateExperience(newExperience) {
        const experienceBar = document.getElementById('experienceBar');
        experienceBar.style.width = newExperience + '%';
        experienceBar.textContent = newExperience + 'XP';
    }

    function addExperience(points) {
        let currentExperience = parseInt(localStorage.getItem('profileExperience')) || 0;
        let currentSkillLevel = parseInt(skillLevelElement.textContent) || 1;
        currentExperience += points;

        // Update skill level if experience exceeds 100
        if (currentExperience >= 100) {
            currentSkillLevel += Math.floor(currentExperience / 100);
            currentExperience = currentExperience % 100;
            skillLevelElement.textContent = currentSkillLevel;
            localStorage.setItem('profileSkillLevel', currentSkillLevel); // Save the skill level
        }

        updateExperience(currentExperience);
        localStorage.setItem('profileExperience', currentExperience);
        saveProfile();

        // Update the experience in the database
        updateExperienceInDatabase(currentExperience);
    }

    async function updateExperienceInDatabase(experience) {
        const user = document.getElementById("user").value; // Get the user ID from the hidden input
        try {
            await changeUserContent(user, experience, "score");
        } catch (error) {
            console.error('Failed to update experience in database:', error);
        }
    }

    function checkHealth() {
        const profileData = JSON.parse(localStorage.getItem('profile'));
        if (!profileData) return;

        const lastOnline = new Date(profileData.lastOnline);
        const now = new Date();
        const diffDays = Math.floor((now - lastOnline) / (1000 * 60 * 60 * 24)); // Difference in days

        if (diffDays >= 1) {
            let newHealth = parseInt(document.querySelector('.health').style.width);
            newHealth -= diffDays * 5; // Decrement 5 HP for each day
            if (newHealth < 0) newHealth = 0; // Health can't be less than 0
            updateHealth(newHealth);

            profileData.health = newHealth;
            profileData.lastOnline = now.toISOString();
            localStorage.setItem('profile', JSON.stringify(profileData));
            saveProfile();
        }
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

document.addEventListener('DOMContentLoaded', function() {
    // Load the current profile experience from localStorage
    let currentExperience = parseInt(localStorage.getItem('profileExperience')) || 0;
    updateExperienceBar(currentExperience);

    function updateExperienceBar(experience) {
        const experienceBar = document.getElementById('experienceBar');
        experienceBar.style.width = experience + '%';
        experienceBar.textContent = experience + 'XP';
    }

    window.updateProfileExperience = function(xpGained) {
        let currentExperience = parseInt(localStorage.getItem('profileExperience')) || 0;
        currentExperience += xpGained;
        if (currentExperience > 100) currentExperience = 100; // Cap at 100%
        localStorage.setItem('profileExperience', currentExperience);
        updateExperienceBar(currentExperience);
    };

    window.decreaseProfileExperience = function(xpLost) {
        let currentExperience = parseInt(localStorage.getItem('profileExperience')) || 0;
        currentExperience -= xpLost;
        if (currentExperience < 0) currentExperience = 0; // Cap at 0%
        localStorage.setItem('profileExperience', currentExperience);
        updateExperienceBar(currentExperience);
    };
});