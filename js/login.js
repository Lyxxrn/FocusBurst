document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginForm = document.getElementById('loginForm');
    const closeButton = document.querySelector('.close');

    loginButton.addEventListener('click', () => {
        loginForm.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        loginForm.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginForm) {
            loginForm.style.display = 'none';
        }
    });
});