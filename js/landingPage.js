// JavaScript für sanftes Scrollen
document.getElementById('scrollToMain').addEventListener('click', function() {
    document.getElementById('header').scrollIntoView({
        behavior: 'smooth'
    });
});
