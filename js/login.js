// Hol dir die Button- und Modal-Elemente
const openModalButton = document.getElementById('openModalButton');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

// EventListener für das Öffnen des Modals
openModalButton.addEventListener('click', () => {
    loginModal.style.display = 'flex'; // Zeigt das Modal mittig an
});

// EventListener für das Schließen des Modals
closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none'; // Versteckt das Modal wieder
});

// Optional: Schließen des Modals, wenn außerhalb geklickt wird
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        loginModal.style.display = 'none'; // Versteckt das Modal
    }
});

// EventListener für das Anmeldeformular
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Verhindert das Standard-Formularverhalten

    // Hier kannst du die Logik für die Anmeldung einfügen
    // Beispiel: E-Mail und Passwort validieren
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Dummy-Validierung (ersetze dies durch deine eigene Logik)
    if (email === "1@1.com" && password === "password") {
        // Erfolgreicher Login - weiter zur Homepage
        window.location.href = 'index.html'; // Ändere dies zu deiner tatsächlichen Homepage
    } else {
        alert("Ungültige Anmeldedaten. Bitte versuchen Sie es erneut.");
    }
});
