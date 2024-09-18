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
