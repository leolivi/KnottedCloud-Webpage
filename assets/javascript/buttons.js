// Scroll down button
const scrollDown = document.querySelector(".teaser");

scrollDown.addEventListener("click", () =>
  window.scrollTo({
    // how far to scroll:
    top: 950,
    behavior: "smooth",
  })
);

// Scroll to top button
let mybutton = document.getElementById("sttB");

window.onscroll = function () {
  scrollFunction();
};

// toggle button appearance
function scrollFunction() {
  mybutton.style.display =
    document.body.scrollTop > 300 || document.documentElement.scrollTop > 300
      ? "block"
      : "none";
}

// scroll to top function
mybutton.addEventListener("click", () =>
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
);

// Burger Icon
const menu = document.querySelector(".menu");
const navItems = document.querySelectorAll(".menu-item");
const hamburger = document.querySelector(".burger-icon");
const closeIcon = document.querySelector("#close-icon");
const menuIcon = document.querySelector("#menu-icon");

// const desktopNav = document.querySelector('.main-nav-items')

// toggle icons for mobile nav
function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
    // remove fixating element when scrolling
    document.body.style.position = "";
    // desktopNav.style.display ="none";
  } else {
    // display mobile menu
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
    // fixate element when scrolling
    document.body.style.position = "fixed";
    // desktopNav.style.display ="flex";
  }
}

hamburger.addEventListener("click", toggleMenu);
