document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    // Toggle das Dropdown-Menü beim Klick auf das Burger-Menü
    burgerMenu.addEventListener('click', function() {
        dropdownMenu.classList.toggle('active');
    });
});
