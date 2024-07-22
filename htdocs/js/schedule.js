document.addEventListener('DOMContentLoaded', function () {
  // const eventForm = document.getElementById('eventForm');
  const schedule = document.querySelector('.schedule');
  // Get the button element
  // const addEventBtn = document.querySelector('.add-event-btn');

  // Load events from localStorage
  loadEvents();

  // Event Listener for .schedule container +Add Event buttons
  schedule.addEventListener('click', (e) => {
    const target = e.target;

    // Check if the clicked button is an +Add Event button
    if (target.classList.contains('add-event-btn')) {
      // Get the day value
      const day = target.dataset.day;
      // Set popup reference from the target for the correct day
      const popup = document.getElementById(`eventPopup-${day}`);

      // This is for the +Add Event button to appear
      if (popup) {
        // Unhide the popup
        popup.style.display = 'block';
      }
    } else if (target.classList.contains('day-submit-button')) { // maybe even 'submit'
        e.preventDefault();

        // Get the form element associated with the clicked submit button
        const form = target.closest("form");
        // Extract the day from the form's ID (e.g., 'popupEventForm-Monday')
        const day = form.id.split("-")[1]; // Assuming the form ID is formatted as "popupEventForm-DAY"


        // Get the values from the form for specific day
        const hours = document.getElementById(`hours-${day}`).value;
        const minutes = document.getElementById(`minutes-${day}`).value;
        const ampm = document.getElementById(`ampm-${day}`).value;
        const description = document.getElementById(`description-${day}`).value.trim();

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
        form.closest(".popup").style.display = "none"; // Hide the correct popup
      }
  });

  function saveEvent(day) {
    e.preventDefault();

    // Get the values from the form for specific day
    const hours = document.getElementById(`hours-${day}`).value;
    const minutes = document.getElementById(`minutes-${day}`).value;
    const ampm = document.getElementById(`ampm-${day}`).value;
    const description = document.getElementById(`description-${day}`).value.trim();

    // Validation (add your logic here)
    if (!isValidTime(hours, minutes, ampm) || description === '') {
      alert('Please enter a valid time and description.');
      return;
    }

    const formattedTime = formatTime(hours, minutes, ampm);
    const event = { day, time: formattedTime, description, completed: false };

    addEvent(event);
    saveEvent(event);

    popup.style.display = 'none';
  }

    // Highlight the current day
    highlightCurrentDay();

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
