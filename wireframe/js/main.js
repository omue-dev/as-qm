const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("nav--open");
    navToggle.classList.toggle("nav-toggle--open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
