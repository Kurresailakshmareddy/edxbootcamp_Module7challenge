document.addEventListener("DOMContentLoaded", function() {
    // Display the current day
    var currentDate = dayjs().format("MMMM D, YYYY");
    document.getElementById("currentDay").textContent = currentDate;

    // Generate time blocks for standard business hours
    for (var hour = 12; hour <= 24; hour++) {
        var timeBlock = document.createElement("div");
        timeBlock.classList.add("time-block");
        
        var time = document.createElement("div");
        time.textContent = dayjs().format("hh A");
        time.classList.add("row");
        timeBlock.appendChild(time);
        // time.classList.add("hour");

       
        var eventInput = document.createElement("textarea");
        eventInput.type = "textarea";
        eventInput.classList.add("textarea");
        timeBlock.appendChild(eventInput);

        var saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.classList.add("saveBtn");
        timeBlock.appendChild(saveBtn);

        // Color-code the time blocks based on past, present, or future
        var currentHour = dayjs().hour();
        if (hour > currentHour) {
            timeBlock.classList.add("past");
            time.classList.add("description");
        } else if (hour == currentHour) {
            timeBlock.classList.add("present");
            time.classList.add("description");
        } else {
            timeBlock.classList.add("future");
            time.classList.add("description");
        }

        // Load events from local storage
        var savedEvent = localStorage.getItem(time.textContent);
        if (savedEvent) {
            eventInput.value = savedEvent;
        }

        // Save event to local storage when the "Save" button is clicked
        saveBtn.addEventListener("click", function() {
            var eventText = eventInput.value;
            localStorage.setItem(time.textContent, eventText);
        });

        document.querySelector(".container").appendChild(timeBlock);
    }
});
