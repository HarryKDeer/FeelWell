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
