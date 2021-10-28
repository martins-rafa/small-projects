const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

// When someone clicks the hamburger menu
navToggle.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-visible");

  // if the menu is closed, open it
  if (visibility === "false") {
    nav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expended", true);
  }
  // if the menu is opened, close it
  else {
    nav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expended", false);
  }
});
