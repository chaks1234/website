const form = document.querySelector(".signup-form");

form.addEventListener("submit", () => {
  const button = form.querySelector("button");
  button.textContent = "Sending...";
  button.disabled = true;
});
