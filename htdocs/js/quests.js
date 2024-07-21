import { changeUserContent, getUserJson, website } from "./database.js";

const quotes = [


    '"It does not matter how slowly you go as long as you do not stop."\n- Confucius',
    "\"Everything you've ever wanted is on the other side of fear.\"\n- George Addair",
    "\"Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.\" \n- Jamie Paolinetti",
    "\"Believe you can and you're halfway there.\" \n- Theodore Roosevelt",
    "\"The most difficult thing is the decision to act, the rest is merely tenacity.\" \n- Amelia Earhart",
    "\"Every strike brings me closer to the next home run.\" \n- Babe Ruth",
    "\"The mind is everything. What you think you become.\" \n- Buddha",
    "\"The only person you are destined to become is the person you decide to be.\" \n- Ralph Waldo Emerson",
    "\"Go confidently in the direction of your dreams. Live the life you have imagined.\" \n- Henry David Thoreau",
    "\"Whatever the mind of man can conceive and believe, it can achieve.\" \n- Napoleon Hill",


    "\"Our greatest glory is not in never failing, but in rising every time we fall.\" \n- Nelson Mandela",
    "\"The way to get started is to quit talking and begin doing.\" \n- Walt Disney",
    "\"Your time is limited, so don't waste it living someone else's life.\" \n- Steve Jobs",


    "\"If life were predictable it would cease to be life, and be without flavor.\" \n- Eleanor Roosevelt",

    "\"If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.\" \n- James Cameron",


    "\"Life is what happens to you while you're busy making plans.\" \n- John Lennon",

    "\"If you don’t take risks, you can’t create a future.\”\n- Monkey D. Luffy",
    "\"Push through the pain. Giving up hurts more.\”\n- Vegeta",
    "\"The future belongs to those who believe in the beauty of their dreams.\”\n- Shoyo Hinata",
];

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').innerText = quotes[randomIndex];
}

// Display a random quote when the page loads
window.onload = displayRandomQuote;


const QUEST_XP = {
    0: 25, // Gym 5 times in week
    1: 10, // Complete a workout 
    2: 5,  // Read for 30 minutes
    3: 15, // Learn a new skill
    4: 10, // Clean the house 
    5: 5,  // Go for a walk 
    6: 10, // Try cooking a new healthy recipe 
    7: 20, // Spend a day without checking social media 
    8: 15  // Go some place new 
};

document.addEventListener('DOMContentLoaded', function() {
    const questSections = document.querySelectorAll('.quest-section');

    questSections.forEach((section, index) => {
        const icon = section.querySelector('.quest-icons');
        const progressBar = section.querySelector('.progress-bar');
        const resetButton = section.querySelector('.reset-button');
        
        const questXP = QUEST_XP[index] || 10;
        
        let progress = parseInt(localStorage.getItem(`quest${index}Progress`)) || 0;
        updateProgressBar(progressBar, progress, questXP);

        icon.addEventListener('click', () => {
            if (progress < 100) {
                const oldProgress = progress;
                progress = 100; 
                animateProgress(progressBar, oldProgress, progress, 1000, questXP, () => {
                    showXPAnimation(progressBar, questXP);
                    updateProfileExperience(questXP); // Update profile experience
                });
                localStorage.setItem(`quest${index}Progress`, progress);
            }
            updateDB(questXP);
        });

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                progress = 0;
                updateProgressBar(progressBar, progress, questXP);
                localStorage.setItem(`quest${index}Progress`, progress);
                decreaseProfileExperience(questXP); // Decrease profile experience
            });
            updateDB(-questXP);
        }
    });
});

function updateDB(changeBy){
    const user = localStorage.getItem("user");
    const prom = getUserJson(user);

    (prom && prom.then(userJson =>{
        let newScore = userJson.score + changeBy;
        changeUserContent(user, newScore, "score");
    }))
}

function updateProgressBar(progressBar, value, maxXP) {
    value = Math.min(100, Math.max(0, value));
    progressBar.style.setProperty('--width', value);
    const currentXP = Math.round(value * maxXP / 100);
    progressBar.setAttribute('data-label', `${currentXP}/${maxXP} XP`);
    
    if (value > 50) {
        progressBar.style.color = 'white';
    } else {
        progressBar.style.color = 'black';
    }
}

function animateProgress(progressBar, start, end, duration, maxXP, callback) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentProgress = start + progress * (end - start);
        updateProgressBar(progressBar, currentProgress, maxXP);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else if (callback) {
            callback();
        }
    };
    window.requestAnimationFrame(step);
}

function showXPAnimation(progressBar, xpAmount) {
    const xpElement = document.createElement('div');
    xpElement.textContent = `+${xpAmount} XP`;
    xpElement.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: gold;
        color: black;
        padding: 5px 10px;
        border-radius: 5px;
        font-weight: bold;
        opacity: 0;
        transition: opacity 0.5s;
        z-index: 10;
        font-size: 16px;
    `;
    progressBar.style.position = 'relative';
    progressBar.appendChild(xpElement);

    // Fade in
    setTimeout(() => {
        xpElement.style.opacity = '1';
    }, 0);

    // Fade out and remove
    setTimeout(() => {
        xpElement.style.opacity = '0';
        setTimeout(() => xpElement.remove(), 500);
    }, 1000);
}

function updateProfileExperience(xpGained) {
    let currentExperience = parseInt(localStorage.getItem('profileExperience')) || 0;
    currentExperience += xpGained;
    if (currentExperience > 100) currentExperience = 100; // Cap at 100%
    localStorage.setItem('profileExperience', currentExperience);

    // Notify the profile page to update the experience bar
    const profileExperienceBar = window.parent.document.getElementById('experienceBar');
    if (profileExperienceBar) {
        profileExperienceBar.style.width = currentExperience + '%';
        profileExperienceBar.textContent = currentExperience + '%';
    }
}
function decreaseProfileExperience(xpLost) {
    let currentExperience = parseInt(localStorage.getItem('profileExperience')) || 0;
    currentExperience -= xpLost;
    if (currentExperience < 0) currentExperience = 0; // Cap at 0%
    localStorage.setItem('profileExperience', currentExperience);

    // Notify the profile page to update the experience bar
    const profileExperienceBar = window.parent.document.getElementById('experienceBar');
    if (profileExperienceBar) {
        profileExperienceBar.style.width = currentExperience + '%';
        profileExperienceBar.textContent = currentExperience + '%';
    }
}