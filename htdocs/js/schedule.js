document.addEventListener('DOMContentLoaded', function() {
    const eventForm = document.getElementById('eventForm');
    const schedule = document.querySelector('.schedule');
    // Get the button element
    const addEventBtn = document.querySelector('.add-event-btn');

    // Load events from localStorage
    loadEvents();

    addEventBtn.addEventListener('click', () => {
      document.getElementById('eventPopup').style.display = 'block';
    });

    // Popup Form Submission Handler
    popupEventForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const day = document.getElementById('day').value;
      const hours = document.getElementById('hours').value;
      const minutes = document.getElementById('minutes').value;
      const ampm = document.getElementById('ampm').value;
      const description = document.getElementById('description').value.trim();

      // Validation (add your logic here)
      if (!isValidTime(hours, minutes, ampm) || description === '') {
          alert('Please enter a valid time and description.');
          return;
      }

      const formattedTime = formatTime(hours, minutes, ampm);
      const event = { day, time: formattedTime, description, completed: false };

      addEvent(event);
      saveEvent(event);

      // Close the popup (you might add a transition here for smoothness)
      eventPopup.style.display = 'none';
    });

    // // This will listen for the click event on the "Add Event" button
    // schedule.addEventListener('click', (e) => {
    //   if (e.target.classList.contains('add-event-btn')) {
    //     const day = e.target.dataset.day;
    //     showEventPopup(day);
    //   }
    // });
    // Highlight the current day
    highlightCurrentDay();

    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Capture values from the form
        const day = document.getElementById('day').value;
        const hours = document.getElementById('hours').value;
        const minutes = document.getElementById('minutes').value;
        const ampm = document.getElementById('ampm').value;
        const description = document.getElementById('description').value.trim();

        // Validate time and description
        if (!isValidTime(hours, minutes, ampm) || description === '') {
            alert('Please enter a valid time and description.');
            return;
        }

        const formattedTime = formatTime(hours, minutes, ampm);
        const event = { day, time: formattedTime, description, completed: false };

        addEvent(event);
        saveEvent(event);

        eventForm.reset();
    });

    function highlightCurrentDay() {
        const days = document.querySelectorAll('.day');
        const currentDay = new Date().toLocaleString('en-US', { weekday: 'long' });

        days.forEach(day => {
            if (day.getAttribute('data-day') === currentDay) {
                day.classList.add('current-day');
            }
        });
    }

    function isValidTime(hours, minutes, ampm) {
        const hoursNum = parseInt(hours, 10);
        const minutesNum = parseInt(minutes, 10);
        return (
            !isNaN(hoursNum) &&
            hoursNum >= 1 &&
            hoursNum <= 12 &&
            !isNaN(minutesNum) &&
            minutesNum >= 0 &&
            minutesNum <= 59 &&
            (ampm === 'AM' || ampm === 'PM')
        );
    }

    function formatTime(hours, minutes, ampm) {
        hours = parseInt(hours, 10);
        minutes = minutes.padStart(2, '0');

        // Format hours to 12-hour format
        const formattedHours = (hours % 12) || 12;

        return `${formattedHours}:${minutes} ${ampm}`;
    }

    function addEvent(event) {
        const dayElement = document.querySelector(`.day[data-day="${event.day}"]`);

        if (dayElement) {
            const eventElement = document.createElement('div');
            eventElement.classList.add('event');
            if (event.completed) {
                eventElement.classList.add('completed');
            }
            eventElement.innerHTML = `
                <input type="checkbox" ${event.completed ? 'checked' : ''}>
                <p>${event.time} - ${event.description}</p>
                <button class="delete-btn">Delete</button>
            `;
            dayElement.appendChild(eventElement);

            const checkbox = eventElement.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', function() {
                event.completed = checkbox.checked;
                eventElement.classList.toggle('completed', event.completed);
                updateEvent(event);
            });

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
        if (!events) {
            events = [];
        } else {
            events = JSON.parse(events);
        }
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
    }

    function loadEvents() {
        const events = JSON.parse(localStorage.getItem('events'));
        if (events) {
            events.forEach(event => addEvent(event));
        }
    }

    function deleteEvent(eventToDelete) {
        let events = JSON.parse(localStorage.getItem('events'));
        events = events.filter(event => !(event.day === eventToDelete.day && event.time === eventToDelete.time && event.description === eventToDelete.description));
        localStorage.setItem('events', JSON.stringify(events));
    }

    function updateEvent(updatedEvent) {
        let events = JSON.parse(localStorage.getItem('events'));
        events = events.map(event => {
            if (event.day === updatedEvent.day && event.time === updatedEvent.time && event.description === updatedEvent.description) {
                return updatedEvent;
            }
            return event;
        });
        localStorage.setItem('events', JSON.stringify(events));
    }
});
