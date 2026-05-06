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

const tagFilter = document.querySelector("#tag-filter");
const blogCards = Array.from(document.querySelectorAll(".blog-card"));
if (tagFilter && blogCards.length > 0) {
  const prevButton = document.querySelector("#blog-prev");
  const nextButton = document.querySelector("#blog-next");
  const pageInfo = document.querySelector("#blog-page-info");
  const pageSize = 9;
  let currentPage = 1;
  let filteredCards = blogCards;
  const searchParams = new URLSearchParams(window.location.search);
  const initialTag = searchParams.get("tag");

  const applyTagFilter = () => {
    const selectedTag = tagFilter.value;
    filteredCards = blogCards.filter((card) => {
      const tags = (card.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
      return selectedTag === "all" || tags.includes(selectedTag);
    });
  };

  const renderPagination = () => {
    const totalPages = Math.max(1, Math.ceil(filteredCards.length / pageSize));
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    for (const card of blogCards) {
      card.hidden = true;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const pageCards = filteredCards.slice(startIndex, startIndex + pageSize);
    for (const card of pageCards) {
      card.hidden = false;
    }

    if (pageInfo) {
      pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
    }
    if (prevButton) {
      prevButton.disabled = currentPage <= 1;
    }
    if (nextButton) {
      nextButton.disabled = currentPage >= totalPages;
    }
  };

  tagFilter.addEventListener("change", () => {
    currentPage = 1;
    applyTagFilter();
    renderPagination();
  });

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage -= 1;
        renderPagination();
      }
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      const totalPages = Math.max(1, Math.ceil(filteredCards.length / pageSize));
      if (currentPage < totalPages) {
        currentPage += 1;
        renderPagination();
      }
    });
  }

  if (initialTag) {
    const matchingOption = Array.from(tagFilter.options).find((option) => option.value === initialTag);
    if (matchingOption) {
      tagFilter.value = initialTag;
    }
  }

  applyTagFilter();
  renderPagination();
}
