// Liste der bereits registrierten E-Mails (dies simuliert eine Server-Datenbank)
const registeredEmails = ["test@example.com", "muster@test.de", "info@domain.com"];

// Öffnen des Registrierungsmodals durch den Link im Login-Modal
document.getElementById("openRegisterModal").addEventListener("click", function() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("registerModal").style.display = "flex";  // Setze auf "flex" anstelle von "block"
});

// Schließen des Registrierungsmodals
document.getElementById("closeRegisterModal").addEventListener("click", function() {
    document.getElementById("registerModal").style.display = "none";
});

// Registrierungsformular validieren
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    const email = document.getElementById("registerEmail").value;
    const errorMessage = document.getElementById("error-message");

    // Überprüfen, ob die E-Mail bereits registriert ist
    if (registeredEmails.includes(email)) {
        errorMessage.textContent = "Diese E-Mail ist bereits registriert.";
    } else {
        errorMessage.textContent = ""; // Fehlernachricht zurücksetzen
        // Hier würdest du den Registrierungsprozess starten
        alert("Registrierung erfolgreich!");
        // Registriertes Modal schließen
        document.getElementById("registerModal").style.display = "none";
    }
});
