const tagline = document.querySelector(".hero-tagline");
if (tagline) {
  const text = tagline.textContent || "";
  tagline.textContent = "";

  let charIndex = 0;
  for (const char of text) {
    if (char === " ") {
      tagline.append(document.createTextNode(" "));
      continue;
    }

    const span = document.createElement("span");
    span.className = "hero-tagline-char";
    span.style.setProperty("--char-index", String(charIndex));
    span.textContent = char;
    tagline.append(span);
    charIndex += 1;
  }
}

const form = document.querySelector(".signup-form");
if (form) {
  form.addEventListener("submit", () => {
    const button = form.querySelector("button");
    if (!button) {
      return;
    }
    button.textContent = "Sending...";
    button.disabled = true;
  });
}
