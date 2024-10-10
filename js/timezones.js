document.addEventListener('DOMContentLoaded', () => {
    const timezoneSelector = document.getElementById('timezone');

    // Liste aller Zeitzonen
    const timezones = [
        "UTC", "GMT", "Europe/London", "Europe/Berlin", "Europe/Paris",
        "Europe/Moscow", "Asia/Tokyo", "Asia/Shanghai", "Asia/Kolkata",
        "Australia/Sydney", "America/New_York", "America/Los_Angeles",
        "America/Chicago", "America/Denver", "Pacific/Auckland"
    ];

    // Funktion zum Hinzufügen der Zeitzonen zum Dropdown-Menü
    function populateTimezones() {
        timezones.forEach(timezone => {
            const option = document.createElement('option');
            option.value = timezone;
            option.textContent = timezone;
            timezoneSelector.appendChild(option);
        });
    }

    populateTimezones();
});
