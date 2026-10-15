const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 36);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("open", !isOpen);
});

navigation.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
