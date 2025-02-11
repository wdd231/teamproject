document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".navbar_toggleBtn");
    const menu = document.querySelector(".navbar_menu");
    const icons = document.querySelector(".navbar_icons");

    toggleBtn.addEventListener("click", function () {
        menu.classList.toggle("active");
        icons.classList.toggle("active");
    });

    // dropdown menu (for mobile)
    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = document.querySelector(".dropdown_menu");

    dropdown.addEventListener("click", function (event) {
        event.preventDefault();
        dropdownMenu.classList.toggle("active");
    });
});
