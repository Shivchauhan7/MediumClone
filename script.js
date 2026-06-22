
  // ===== Drawer =====
  function openDrawer() {
    document.getElementById('leftDrawer').classList.add('open');
    document.getElementById('overlay').classList.add('open');
  }
  function closeDrawer() {
    document.getElementById('leftDrawer').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
  }

  // ===== Toast =====
  let toastTimer;
  function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1500);
  }

  // ===== Tab switching =====
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showToast(tab.textContent.trim());
    });
  });

  // ===== Follow button toggle =====
  function toggleFollow(btn) {
    if (btn.classList.contains('following')) {
      btn.classList.remove('following');
      btn.textContent = 'Follow';
      showToast('Unfollowed');
    } else {
      btn.classList.add('following');
      btn.textContent = 'Following';
      showToast('Following');
    }
  }

  // ===== Article meta-left icons (star/clap/comment/repost) =====
  document.querySelectorAll('.meta-left .meta-icon').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = el.textContent.trim();
      if (text.startsWith('\u270A') || text.includes('K') || /^\u270A?\s*\d/.test(text)) {
        // generic toggle highlight
      }
      el.classList.toggle('active');
      if (el.textContent.includes('\u{1F441}') || el.textContent.match(/[\u{1F441}]/u)) {
        showToast('Clapped');
      } else if (el.textContent.match(/[\u{1F4AC}]/u)) {
        showToast('Comments');
      } else if (el.textContent.match(/[\u{1F501}]/u)) {
        showToast('Reposted');
      } else {
        showToast('Highlighted');
      }
    });
  });

  // ===== Article action icons: dislike, bookmark, more menu =====
  document.querySelectorAll('.meta-actions .icon-btn').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const symbol = el.textContent.trim();
      if (symbol === '\u{1F44E}') {
        el.classList.toggle('active');
        el.classList.toggle('dislike');
        showToast(el.classList.contains('active') ? 'Marked as not interested' : 'Removed');
      } else if (symbol === '\u{1F516}') {
        el.classList.toggle('active');
        showToast(el.classList.contains('active') ? 'Saved to reading list' : 'Removed from reading list');
      } else if (symbol === '\u22EF') {
        showToast('More options');
      }
    });
  });

  // ===== Sidebar: See full list / See more topics / See more suggestions =====
  document.querySelectorAll('.see-full-list, .see-more-topics, .see-suggestions').forEach(el => {
    el.addEventListener('click', () => showToast(el.textContent.trim()));
  });

  // ===== Sidebar: topic chips =====
  document.querySelectorAll('.topic-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      if (chip.classList.contains('active')) {
        chip.style.background = '#e8e8e8';
        showToast('Following ' + chip.textContent.replace('+', '').trim());
      } else {
        chip.style.background = '';
        showToast('Unfollowed ' + chip.textContent.replace('+', '').trim());
      }
    });
  });

  // ===== Staff picks click =====
  document.querySelectorAll('.staff-pick-title').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => showToast('Opening article'));
  });

  // ===== Article titles click =====
  document.querySelectorAll('.article-title').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => showToast('Opening article'));
  });

  // ===== Article thumbnails click =====
  document.querySelectorAll('.article-thumb').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => showToast('Opening article'));
  });
  // Select all bookmark buttons
const bookmarkButtons = document.querySelectorAll(".bookmark-btn");
const readingList = document.getElementById("reading-list");

// Store saved articles
let savedArticles = [];

// Add bookmark functionality
bookmarkButtons.forEach((button) => {
    button.addEventListener("click", function () {

        // Get article title
        const articleCard = this.closest(".article-card");
        const articleTitle =
            articleCard.querySelector("h2").textContent;

        const icon = this.querySelector("i");

        // Check if article already saved
        const index = savedArticles.indexOf(articleTitle);

        if (index === -1) {
            // Save article
            savedArticles.push(articleTitle);

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            this.classList.add("active");
        } else {
            // Remove article
            savedArticles.splice(index, 1);

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            this.classList.remove("active");
        }

        updateReadingList();
    });
});

// Update reading list
function updateReadingList() {

    readingList.innerHTML = "";

    if (savedArticles.length === 0) {
        readingList.innerHTML =
            "<li>No saved articles yet.</li>";
        return;
    }

    savedArticles.forEach((title) => {

        const li = document.createElement("li");
        li.textContent = title;

        readingList.appendChild(li);
    });
}

// Initialize reading list
updateReadingList();


// Follow button functionality
const followButtons =
    document.querySelectorAll(".follow-user button");

followButtons.forEach((button) => {

    button.addEventListener("click", function () {

        if (this.textContent === "Follow") {

            this.textContent = "Following";
            this.style.backgroundColor = "#242424";
            this.style.color = "#ffffff";

        } else {

            this.textContent = "Follow";
            this.style.backgroundColor = "transparent";
            this.style.color = "#242424";
        }
    });
});


// Category tabs functionality
const tabs = document.querySelectorAll(".tabs span");

tabs.forEach((tab) => {

    tab.addEventListener("click", function () {

        tabs.forEach((item) => {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});


// Search functionality
const searchInput =
    document.querySelector(".search-box input");

const articles =
    document.querySelectorAll(".article-card");

searchInput.addEventListener("keyup", function () {

    const searchValue =
        this.value.toLowerCase();

    articles.forEach((article) => {

        const title =
            article.querySelector("h2")
            .textContent
            .toLowerCase();

        const description =
            article.querySelector("p")
            .textContent
            .toLowerCase();

        if (
            title.includes(searchValue) ||
            description.includes(searchValue)
        ) {
            article.style.display = "flex";
        } else {
            article.style.display = "none";
        }
    });
});


// Navbar shadow on scroll
window.addEventListener("scroll", function () {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 10) {

        navbar.style.boxShadow =
            "0 2px 10px rgba(0, 0, 0, 0.1)";

    } else {

        navbar.style.boxShadow = "none";
    }
});
