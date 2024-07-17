// const progressBar = document.getElementsByClassName('progress-bar')[0]
// setInterval(() => {
//     const computedStyle = getComputedStyle(progressBar)
//     const width = parseFloat(computedStlye.getPropertyValue('--width')) || 0
//     progressBar.computedStyleMap.setProperty('--width', width + .1)
// }, 5)

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
];

function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').innerText = quotes[randomIndex];
}

// Display a random quote when the page loads
window.onload = displayRandomQuote;



// New code for quest progress
document.addEventListener('DOMContentLoaded', function() {
    const questSections = document.querySelectorAll('.quest-section');

    questSections.forEach((section, index) => {
        const icon = section.querySelector('.quest-icons');
        const progressBar = section.querySelector('.progress-bar');
        const resetButton = section.querySelector('.reset-button');
        
        let progress = parseInt(localStorage.getItem(`quest${index}Progress`)) || 0;
        updateProgressBar(progressBar, progress);

        icon.addEventListener('click', () => {
            if (progress < 100) {
                const oldProgress = progress;
                progress = 100; // Set progress to 100%
                const xpGained = 100 - oldProgress; // Calculate XP gained
                animateProgress(progressBar, oldProgress, progress, 1000, () => {
                    showXPAnimation(progressBar, xpGained); // Show XP animation after progress bar is full
                });
                localStorage.setItem(`quest${index}Progress`, progress);
            }
        });

        if (resetButton) {
            resetButton.addEventListener('click', () => {
                progress = 0;
                updateProgressBar(progressBar, progress);
                localStorage.setItem(`quest${index}Progress`, progress);
            });
        }
    });
});

function updateProgressBar(progressBar, value) {
    value = Math.min(100, Math.max(0, value));
    progressBar.style.setProperty('--width', value);
    progressBar.setAttribute('data-label', `${Math.round(value)}%`);
    
    if (value > 50) {
        progressBar.style.color = 'white';
    } else {
        progressBar.style.color = 'black';
    }
}

function animateProgress(progressBar, start, end, duration, callback) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentProgress = start + progress * (end - start);
        updateProgressBar(progressBar, currentProgress);
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
