document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = document.querySelector(".dropdown_menu");

    dropdown.addEventListener("click", function (event) {
        event.preventDefault(); 
        dropdownMenu.classList.toggle("active"); 
    });

  
    document.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            dropdownMenu.classList.remove("active");
        }
    });
});
