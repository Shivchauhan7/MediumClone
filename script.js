
  
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  
  function toggleFollow(btn) {
    if (btn.classList.contains('following')) {
      btn.classList.remove('following');
      btn.textContent = 'Follow';
    } else {
      btn.classList.add('following');
      btn.textContent = 'Following';
    }
  }

  
  document.querySelectorAll('.article-meta .icon-btn, .meta-icon').forEach(el => {
    el.addEventListener('click', () => {
      el.style.opacity = el.style.opacity === '0.4' ? '1' : '0.4';
    });
  });
