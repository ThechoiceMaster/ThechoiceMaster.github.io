const hamburger = document.querySelector(
  ".header .nav-bar .nav-list .hamburger"
);
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(
  ".header .nav-bar .nav-list ul li a"
);
const header = document.querySelector(".header.container");

//!-------------------Header--------------------!//

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = "#29323c";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});

//!-------------------bubbles--------------------!//
function createBubble() {
  const section = document.querySelector("section");
  const createElement = document.createElement(".span");
  var size = Math.random() * 60;

  createElement.style.width = 20 + size + "px";
  createElement.style.height = 20 + size + "px";
  createElement.style.left = Math.random() * innerWidth + "px";
  section.appendChild(createElement);

  setTimeout(() => {
    createElement.remove();
  }, 4000);
}

setInterval(createBubble,50)