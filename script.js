function openDrawer() {
  document.getElementById('leftDrawer').classList.add('open');
  document.getElementById('overlay').classList.add('open');
}
function closeDrawer() {
  document.getElementById('leftDrawer').classList.remove('open');
  document.getElementById('overlay').classList.remove('open');
}


let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1500);
}

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    showToast(tab.textContent.trim());
  });
});

// Follow button toggle
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


document.querySelectorAll('.meta-left .meta-icon').forEach(el => {
  el.addEventListener('click', e => {
    e.stopPropagation();
    el.classList.toggle('active');
    const text = el.textContent;
    if (el.classList.contains('star')) {
      showToast(el.classList.contains('active') ? 'Highlighted' : 'Removed highlight');
    } else if (text.includes('\u{1F400}') || text.includes('\u{1F44F}') || text.includes('👏')) {
      showToast(el.classList.contains('active') ? 'Clapped' : 'Clap removed');
    } else if (text.includes('\u{1F4AC}') || text.includes('💬')) {
      showToast('View comments');
    } else if (text.includes('\u{1F501}') || text.includes('🔁')) {
      showToast(el.classList.contains('active') ? 'Reposted' : 'Repost removed');
    } else {
      // fallback: use the data-index to figure out position
      const siblings = Array.from(el.parentElement.children);
      const idx = siblings.indexOf(el);
      const labels = ['Highlighted', 'Clapped', 'View comments', 'Reposted'];
      showToast(labels[idx] || 'Done');
    }
  });
});


document.querySelectorAll('.meta-actions .icon-btn').forEach(el => {
  el.addEventListener('click', e => {
    e.stopPropagation();
    const text = el.textContent.trim();
    // Match by codepoint value
    const cp = text.codePointAt(0);
    if (cp === 0x1F44E) { // 👎
      el.classList.toggle('active');
      el.classList.toggle('dislike');
      showToast(el.classList.contains('active') ? 'Not interested' : 'Removed');
    } else if (cp === 0x1F516) { // 🔖
      el.classList.toggle('active');
      showToast(el.classList.contains('active') ? 'Saved to reading list' : 'Removed from reading list');
    } else { // ⋯ more
      showToast('More options');
    }
  });
});


document.querySelectorAll('.see-full-list, .see-more-topics, .see-suggestions').forEach(el => {
  el.addEventListener('click', () => showToast(el.textContent.trim()));
});


document.querySelectorAll('.topic-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    chip.classList.toggle('active');
    const name = chip.textContent.replace('+', '').replace('✓', '').trim();
    if (chip.classList.contains('active')) {
      chip.textContent = '✓ ' + name;
      chip.style.background = '#e8e8e8';
      showToast('Following ' + name);
    } else {
      chip.textContent = '+ ' + name;
      chip.style.background = '';
      showToast('Unfollowed ' + name);
    }
  });
});


document.querySelectorAll('.staff-pick-title').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => showToast('Opening article'));
});


document.querySelectorAll('.article-title').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => showToast('Opening article'));
});


document.querySelectorAll('.article-thumb').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => showToast('Opening article'));
});
