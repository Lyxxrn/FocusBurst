// Profil-Update
document.querySelector('.profile-info form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const response = await fetch('/update-profile', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Profil wurde erfolgreich aktualisiert.');
        } else {
            alert('Fehler beim Aktualisieren des Profils. Bitte versuchen Sie es später erneut.');
        }
    } catch (error) {
        console.error('Fehler:', error);
        alert('Es gab ein Problem bei der Verbindung zum Server.');
    }
});

// Passwort-Änderung
document.querySelector('.change-password form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    // Daten validieren (z.B. ob das neue Passwort und die Bestätigung übereinstimmen)
    const newPassword = formData.get('new-password');
    const confirmPassword = formData.get('confirm-password');

    if (newPassword !== confirmPassword) {
        alert('Die neuen Passwörter stimmen nicht überein.');
        return;
    }

    try {
        const response = await fetch('/change-password', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Passwort wurde erfolgreich geändert.');
        } else {
            alert('Fehler beim Ändern des Passworts. Bitte versuchen Sie es später erneut.');
        }
    } catch (error) {
        console.error('Fehler:', error);
        alert('Es gab ein Problem bei der Verbindung zum Server.');
    }
});

// Einstellungen speichern
document.querySelector('.settings form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const response = await fetch('/update-settings', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Einstellungen wurden erfolgreich aktualisiert.');
        } else {
            alert('Fehler beim Aktualisieren der Einstellungen. Bitte versuchen Sie es später erneut.');
        }
    } catch (error) {
        console.error('Fehler:', error);
        alert('Es gab ein Problem bei der Verbindung zum Server.');
    }
});
