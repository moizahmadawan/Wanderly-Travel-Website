
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Prevent users from selecting a past travel date.
const travelDate = document.getElementById("travelDate");
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

travelDate.min = localToday;

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const destination = document.getElementById("destinationInput").value.trim();
  const date = travelDate.value;
  const travelers = document.getElementById("travelers").value;
  const feedback = document.getElementById("searchFeedback");

  if (!destination) {
    feedback.textContent = "Please enter a destination to explore.";
    document.getElementById("destinationInput").focus();
    return;
  }

  const dateMessage = date
    ? ` for ${new Date(`${date}T12:00:00`).toLocaleDateString()}`
    : "";

  feedback.textContent =
    `Your ${destination} trip${dateMessage} for ${travelers} traveler(s) is ready to explore.`;

  const matchingCard = [...document.querySelectorAll(".destination-card")]
    .find((card) => card.innerText.toLowerCase().includes(destination.toLowerCase()));

  if (matchingCard) {
    matchingCard.scrollIntoView({ behavior: "smooth", block: "center" });
  } else {
    document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
  }
});

// Front-end demo form: no email is actually sent.
document.getElementById("contactForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const feedback = document.getElementById("contactFeedback");

  feedback.textContent =
    `Thanks, ${name}! Your demo inquiry has been recorded on this page. No email was sent.`;

  event.target.reset();
});
