
"use strict";

// Mobile navigation
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );

    navigation.classList.toggle("open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("open");
    });
  });
}

// Command search and category filters
const tabs = document.querySelectorAll(".command-tab");
const commands = document.querySelectorAll(".command-row");
const searchInput = document.querySelector("#command-search");
const emptyMessage = document.querySelector("#command-empty");

let selectedCategory = "all";

function filterCommands() {
  const searchTerm = searchInput
    ? searchInput.value.trim().toLowerCase()
    : "";

  let visibleCount = 0;

  commands.forEach((command) => {
    const categoryMatches =
      selectedCategory === "all" ||
      command.dataset.category === selectedCategory;

    const textMatches = command.textContent
      .toLowerCase()
      .includes(searchTerm);

    const visible = categoryMatches && textMatches;

    command.hidden = !visible;

    if (visible) {
      visibleCount++;
    }
  });

  if (emptyMessage) {
    emptyMessage.hidden = visibleCount !== 0;
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    selectedCategory = tab.dataset.category || "all";

    tabs.forEach((item) => {
      const selected = item === tab;

      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
    });

    filterCommands();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", filterCommands);
}

// Initialise command filtering
filterCommands();

// Footer copyright year
const year = document.querySelector("#current-year");

if (year) {
  year.textContent = new Date().getFullYear();
}

// Swal's official Discord invite link
const inviteLink = document.querySelector("[data-invite-link]");
const inviteUrl =
  "https://discord.com/oauth2/authorize?client_id=1565065471064150137";

if (inviteLink) {
  inviteLink.href = inviteUrl;
  inviteLink.target = "_blank";
  inviteLink.rel = "noopener noreferrer";

  const hint = document.querySelector(".invite-hint");

  if (hint) {
    hint.textContent = "You'll be taken to Discord to choose your server.";
  }
}
// Render Lucide icons
if (window.lucide) {
    window.lucide.createIcons();
  }
