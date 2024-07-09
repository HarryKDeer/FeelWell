
document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');
    const schedule = document.querySelector('.schedule');

    // Load events from localStorage
    loadEvents();

    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        //set our constant values 
        const day = document.getElementById('day').value;
        const time = document.getElementById('time').value;
        const ampm = document.getElementById('ampm').value;
        const description = document.getElementById('description').value;

        const formattedTime = formatTime(time, ampm);
        const event = { day, time: formattedTime, description };

        addEvent(event);
        saveEvent(event);

        eventForm.reset();
    });

    function formatTime(time, ampm) {
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours);

        // Adjust hours based on AM/PM
        if (ampm === 'PM' && hours < 12) {
            hours += 12;
        } else if (ampm === 'AM' && hours === 12) {
            hours = 0;
        }

        // Format hours to 12-hour format
        const formattedHours = (hours % 12) || 12;
        const formattedMinutes = minutes.padStart(2, '0');

        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }

    function addEvent(event) {
        const dayElement = document.querySelector(`.day[data-day="${event.day}"]`);
        
        if (dayElement) {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');
            eventElement.innerHTML = `<p>${event.time} - ${event.description}</p><button class="delete-btn">Delete</button>`;
            dayElement.appendChild(eventElement);

            // Add event listener to the delete button
            eventElement.querySelector('.delete-btn').addEventListener('click', function() {
                eventElement.remove();
                deleteEvent(event);
            });
        } else {
            console.error(`Day element for ${event.day} not found`);
        }
    }

    function saveEvent(event) {
        let events = localStorage.getItem('events');
        // if event not null then parse the JSON string into a JS array
        if (!events) {
            events = [];
        } else {
            events = JSON.parse(events);
        }
        events.push(event);
        //convert the JS array back into the JSON and store it to the localStorage 
        localStorage.setItem('events', JSON.stringify(events));
    }

    function loadEvents() {
        //parses through the local storage and grabs the events then parses the JSON string into JS array
        const events = JSON.parse(localStorage.getItem('events'));
        if (events) {
            //for each event, the function will add the event
            events.forEach(event => addEvent(event));
        }
    }

    function deleteEvent(eventToDelete) {
        let events = JSON.parse(localStorage.getItem('events'));
        //helps filter our the events saved vs the ones that will be deleted (checks if values match up to the ones set to be deleted)
        events = events.filter(event => !(event.day === eventToDelete.day && event.time === eventToDelete.time && event.description === eventToDelete.description));
        localStorage.setItem('events', JSON.stringify(events));
    }
});
